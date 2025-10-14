'use client'

import * as React from 'react'
import { toast } from 'sonner'

import { IconShare } from '@/components/ui/icons'

import { setDesignSharePolicy } from '@/app/actions'
import { Design } from '@/lib/db-schema/designs'
import { cn } from '@/lib/utils'
import { SharePopover } from '../share/share-popover'
import { Button } from '../ui/button'
import { DeleteDesignButton } from './delete-design-button'

export interface DesignActionsProps {
  shownActions: Array<'share' | 'delete'>
  design: Design
}

export function DesignActions({ design, shownActions }: DesignActionsProps) {
  const [sharePopoverOpen, setSharePopoverOpen] = React.useState(false)

  const showShare = shownActions.includes('share')
  const showDelete = shownActions.includes('delete')

  return (
    <>
      <div
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {showShare && (
          <SharePopover
            onUpdateSharePolicy={async policy => {
              const result = await setDesignSharePolicy(design.designId, policy)

              if (result && 'error' in result) {
                toast.error(result.error)
                return
              }

              toast.success('Share policy updated')
            }}
            onOpenChange={setSharePopoverOpen}
            open={sharePopoverOpen}
            sharePolicy={design.sharePolicy}
          >
            <Button
              variant={'ghost'}
              title="Share design"
              className={cn(
                'flex w-full cursor-pointer items-center justify-start gap-2 rounded-sm p-4 px-3 text-sm hover:bg-gray-100',
                {
                  'bg-gray-100': sharePopoverOpen
                }
              )}
              onClick={() => {
                setSharePopoverOpen(true)
              }}
            >
              <IconShare className=" h-4 w-4" strokeWidth={1} />
              <span>Share</span>
            </Button>
          </SharePopover>
        )}
        {showDelete && <DeleteDesignButton design={design} />}
      </div>
    </>
  )
}
