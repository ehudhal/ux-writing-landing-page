'use client'

import { useQueryString } from '@/lib/hooks/use-create-query-string'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { IconSpinner, IconTrash } from '../ui/icons'
import { ServerActionResult } from '@/lib/actions/action-utils'

export default function DeleteScreenInstanceButton({
  screenInstanceId,
  deleteScreenInstance
}: {
  screenInstanceId: string
  deleteScreenInstance: (args: {
    screenInstanceId: string
  }) => ServerActionResult<void>
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { removeQueryString } = useQueryString()
  const [isRemovePending, startRemoveTransition] = useTransition()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>
        <IconTrash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this screen version.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isRemovePending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemovePending}
            onClick={event => {
              event.preventDefault()
              startRemoveTransition(async () => {
                const result = await deleteScreenInstance({
                  screenInstanceId
                })

                if (result && 'error' in result) {
                  toast.error(result.error)
                  return
                }

                setOpen(false)
                router.refresh()
                if (searchParams.get('vid') === screenInstanceId) {
                  router.replace(removeQueryString('vid'))
                }

                router.refresh()
                toast.success('Screen deleted')
              })
            }}
          >
            {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
