'use client'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import {
  OrgSubscription,
  orgSubscriptionSchema
} from '@/lib/db-schema/org-subscriptions'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const activeSchema = orgSubscriptionSchema
  .pick({ seats: true })
  .extend({ status: z.literal('ACTIVE') })

const inactiveSchema = z.object({
  status: z.literal('INACTIVE')
})

const formSchema = z.discriminatedUnion('status', [
  activeSchema,
  inactiveSchema
])

export default function SubscriptionForm({
  subscription,
  organization,
  updateOrganization
}: {
  subscription: OrgSubscription
  organization: { name: string }
  updateOrganization: (
    organizationId: string,
    subscription: Omit<Partial<OrgSubscription>, 'organizationId'>
  ) => void
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: subscription.status,
      seats: subscription.seats || undefined
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateOrganization(subscription.organizationId, values)
    toast.success('Subscription saved!')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{organization.name}</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <select
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'block w-[240px] appearance-none font-normal'
                      )}
                      onSelect={field.onChange}
                      {...field}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INACTIVE">Inactive</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    Subscription status - active (paid), or inactive (canceled)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch('status') === 'ACTIVE' && (
              <>
                <FormField
                  control={form.control}
                  name="seats"
                  render={() => (
                    <FormItem>
                      <FormLabel>Seats</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Number of seats"
                          type="number"
                          {...form.register('seats', {
                            valueAsNumber: true
                          })}
                        />
                      </FormControl>
                      <FormDescription>
                        {
                          "Number of seats sold. This won't impact the user in any way, only for our internal records."
                        }
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" disabled={!form.formState.isValid}>
              Save
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
