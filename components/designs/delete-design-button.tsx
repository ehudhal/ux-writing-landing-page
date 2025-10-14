'use client'

import * as React from 'react'
import { toast } from 'sonner'

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
import { IconSpinner } from '@/components/ui/icons'

import { removeDesign } from '@/app/actions'
import { Design } from '@/lib/db-schema/designs'
import { Trash2 } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { designsPageUrl } from '@/lib/app-routes'

type DeleteDesignButtonProps = {
  design: Design
}

export function DeleteDesignButton({ design }: DeleteDesignButtonProps) {
  const [isPending, startTransition] = useTransition()
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleDeleteDesign = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    startTransition(async () => {
      const result = await removeDesign({
        id: design.designId
      })

      if (result && 'error' in result) {
        toast.error(result.error)
        return
      }

      setDeleteDialogOpen(false)
      if (pathname !== designsPageUrl()) {
        router.push(designsPageUrl())
      } else {
        router.refresh()
      }
      toast.success('PRD deleted')
    })
  }

  const sourceIsSlack = design.metadata?.source === 'SLACK'

  if (sourceIsSlack) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span tabIndex={0}>
            <Button
              variant={'ghost'}
              className="flex w-full cursor-pointer items-center justify-start gap-2  space-x-0  space-y-0  rounded-sm   p-4 px-3 text-sm hover:bg-gray-100"
              disabled={true}
            >
              <Trash2 strokeWidth={1} size={16} />
              <span>Delete</span>
            </Button>
          </span>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>This PRD cannot be deleted as it is synced with Slack.</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <>
      <Button
        variant={'ghost'}
        className="flex w-full cursor-pointer items-center justify-start gap-2  space-x-0  space-y-0  rounded-sm   p-4 px-3 text-sm hover:bg-gray-100"
        disabled={isPending}
        onClick={() => {
          setDeleteDialogOpen(true)
        }}
      >
        <Trash2 strokeWidth={1} size={16} />
        <span>Delete</span>
      </Button>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete PRD?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your PRD and all associated
              artifacts.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={handleDeleteDesign}
            >
              {isPending && <IconSpinner className="mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
