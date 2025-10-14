'use client'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Screen } from '@/lib/db-schema/screens'
import { useScreenList } from '@/lib/hooks/use-screen-list'
import { useParams, usePathname } from 'next/navigation'

import { useState } from 'react'
import ScreensStoriesList from './screens-list'

interface ScreenListNavigationProps {
  designId: string
  capturedScreens: Screen[]
  isParent: boolean
  readonly?: boolean
}

export default function ScreenListNavigation({
  capturedScreens,
  designId,
  readonly = false
}: ScreenListNavigationProps) {
  const pathname = usePathname()
  const { screenId } = useParams<{
    designId?: string
    screenId?: string
  }>()

  const screens = capturedScreens
  const [optimisticScreenId, setOptimisticScreenId] = useState<string | null>(
    screenId ?? null
  )

  const { isSidebarOpen, toggleSidebar } = useScreenList()

  const createUrl = (entityId: string) => {
    if (screenId) {
      return pathname.replace(screenId, entityId)
    } else {
      return pathname
    }
  }

  const screensListItems = screens.map(screen => ({
    id: screen.screenId,
    title: screen.title!,
    link: createUrl(screen.screenId),
    isSelected: screen.screenId === optimisticScreenId
  }))

  const items = screensListItems

  const content = (
    <ScreensStoriesList
      key={items.map(i => i.id).join()}
      initialItems={items}
      designId={designId}
      selectedId={optimisticScreenId!}
      setOptimisticScreenId={setOptimisticScreenId}
      readOnly={readonly}
    />
  )

  return (
    <>
      <div className="hidden w-64 flex-col gap-2 overflow-y-auto rounded-xl bg-background-gray p-4 md:flex">
        {content}
      </div>
      <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
        <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col justify-between overflow-auto px-8 py-10">
          {content}
        </SheetContent>
      </Sheet>
    </>
  )
}

export const ScreenListSkeleton = () => (
  <Skeleton className="hidden h-full w-64 flex-col justify-end gap-6 rounded-xl p-4  md:flex "></Skeleton>
)
