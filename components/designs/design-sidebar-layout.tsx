import { ScreenListProvider } from '@/lib/hooks/use-screen-list'
import { Suspense } from 'react'
import { ScreenListSkeleton } from './screens-list-navigation'
import ScreensNavigation from './screens-navigation'

interface DesignSidebarLayoutProps {
  params: {
    designId: string
  }
  children: React.ReactNode
  isReadonly: boolean
}

export default function DesignSidebarLayout({
  params,
  children,
  isReadonly
}: DesignSidebarLayoutProps) {
  return (
    <div className="flex w-full bg-white p-4">
      <ScreenListProvider>
        <aside className="pr-4 ">
          <Suspense fallback={<ScreenListSkeleton />}>
            <ScreensNavigation
              designId={params.designId}
              forcedReadOnly={isReadonly}
            />
          </Suspense>
        </aside>
        <section className="w-full">{children}</section>
      </ScreenListProvider>
    </div>
  )
}
