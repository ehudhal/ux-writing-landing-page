'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { Ellipsis, Pen, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

import { IconSpinner } from '@/components/ui/icons'

import { deleteScreen } from '@/app/(app)/(home)/prds/actions/delete-screen'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function ScreenListItemActions({
  entityId,
  designId,
  onEdit
}: {
  onEdit?: () => void
  entityId: string
  designId: string
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const [isRemovePending, startRemoveTransition] = React.useTransition()

  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const handleEdit = () => {
    setOpen(false)
    onEdit?.()
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setOpen(!open)}
            variant={'ghost'}
            className={cn('aspect-square size-6 rounded-sm p-0')}
          >
            <Ellipsis className="fill-black" strokeWidth={1} size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Button
            variant={'ghost'}
            className=" flex w-full cursor-pointer items-center justify-start  gap-2 space-x-0  space-y-0   rounded-sm p-2 text-sm hover:bg-gray-100"
            onClick={() => {
              setDeleteDialogOpen(true)
            }}
          >
            <Trash2 strokeWidth={1} size={16} />
            <span>Delete</span>
          </Button>
          {onEdit && (
            <Button
              variant={'ghost'}
              className=" flex w-full cursor-pointer  items-center justify-start gap-2  space-x-0 space-y-0  rounded-sm   p-2 text-sm hover:bg-gray-100"
              onClick={handleEdit}
            >
              <Pen strokeWidth={1} size={16} />
              <span>Edit</span>
            </Button>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete this screen.
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
                  const result = await deleteScreen({
                    screenId: entityId,
                    designId
                  })

                  if (result && 'error' in result) {
                    toast.error(result.error)
                    return
                  }

                  setDeleteDialogOpen(false)
                  toast.success(`Screen deleted`)

                  if (!pathname.endsWith(designId)) {
                    //this should support both removal from from design / and product flows, and not assume we are in specific path
                    const newPath = pathname.split('/').slice(0, -1).join('/')
                    router.push(newPath)
                  } else {
                    //this will handle the new navigation, where we have no subroutes below the designId
                    router.push(pathname)
                  }
                })
              }}
            >
              {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
