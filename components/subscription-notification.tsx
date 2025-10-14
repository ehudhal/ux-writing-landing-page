'use client'

import { useQueryString } from '@/lib/hooks/use-create-query-string'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from './ui/dialog'

const SubscriptionNotification = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const subscriptionNotification = searchParams.get('subscription')
  const { removeQueryString } = useQueryString()

  if (subscriptionNotification === 'success') {
    return (
      <Dialog
        defaultOpen
        onOpenChange={open => {
          if (!open) {
            router.replace(removeQueryString('subscription'))
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to PRDKit Plus!</DialogTitle>
            <DialogDescription>
              Your credits will be renewed monthly.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return null
}

export default SubscriptionNotification
