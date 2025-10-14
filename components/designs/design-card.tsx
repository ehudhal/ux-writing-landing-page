'use client'
import { differenceInDays, formatDistanceToNow } from 'date-fns'

import { useDesignPermission } from '@/lib/hooks/use-design-permission'
import { cn } from '@/lib/utils'
import { highlightText } from '@/lib/utils/highlight-text'
import { Ellipsis } from 'lucide-react'
import { IconFigmaColor, IconSlack } from '../ui/icons'
import { OrganizationUserAvatar } from '../user-avatar'
import DesignActionMenu from './design-action-menu'
import { DesignWithProductsAndPreview } from './designs-page'

type DesignCardProps = DesignWithProductsAndPreview & {
  currentSearch: string
  hideAvatar?: boolean
}

export default function DesignCard({
  currentSearch,
  hideAvatar,
  ...design
}: DesignCardProps) {
  const userPermissions = useDesignPermission(design)

  // if longer than 5 days ago, show the date, otherwise show the time
  const time = design.updatedAt ?? design.createdAt
  const isWithin5Days = differenceInDays(new Date(), time) <= 5
  const prettyTime = isWithin5Days
    ? formatDistanceToNow(time, { addSuffix: true })
    : new Intl.DateTimeFormat('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }).format(time)

  const isChat = !design.showAsDesign

  const isSlackChat = design.metadata?.source === 'SLACK'
  const isFigmaChat = design.metadata?.source === 'FIGMA'

  return (
    <div
      key={design.designId}
      className="group relative z-20 flex aspect-3/2 size-full cursor-pointer flex-col rounded-xl border border-transparent  bg-background-gray transition duration-300 ease-in-out hover:border-gray-200   hover:bg-background-gray/45 active:border-gray-200 active:bg-background-gray/30 "
    >
      {userPermissions.write && (
        <div>
          <DesignActionMenu
            shownActions={['share', 'delete']}
            design={design}
            variant="ghost"
            className="absolute right-4 top-4 z-10 "
            icon={<Ellipsis className="fill-black" strokeWidth={1} size={18} />}
          />
        </div>
      )}

      <section
        className={cn(
          ' overflow-hidden rounded-md bg-background-gray  pt-8 ease-in-out ',
          {
            'p-0': isChat
          }
        )}
      >
        {design.productTitle && (
          <div className="absolute left-2 top-2 z-30 h-auto w-min whitespace-nowrap rounded-full bg-offblack px-[.5rem] py-[.20rem] text-xs text-offwhite opacity-0 transition-opacity group-hover:opacity-100">
            {design.productTitle.length > 20
              ? design.productTitle.slice(0, 20) + '...'
              : design.productTitle}
          </div>
        )}
      </section>
      <section className="flex size-full flex-1 justify-between  border-[#F2F2F4] p-6">
        <div className="flex w-full flex-col justify-between">
          <h3 className="line-clamp-2 w-full max-w-[80%] text-base font-medium xl:line-clamp-3">
            {highlightText(design.title, currentSearch)}
          </h3>
          <div className="flex items-center gap-4">
            {isSlackChat && <IconSlack className="size-4" />}
            {isFigmaChat && <IconFigmaColor className="size-4" />}
            <time className="flex flex-wrap items-center gap-1 text-sm text-gray-500">
              <span className="whitespace-nowrap">Last edited</span>
              <span className="whitespace-nowrap">{prettyTime}</span>
            </time>
          </div>
        </div>
        {!hideAvatar && (
          <OrganizationUserAvatar
            userId={design.createdBy}
            className="size-8"
          />
        )}
      </section>
    </div>
  )
}
