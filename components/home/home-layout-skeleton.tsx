import { HomePageSkeleton } from './home-page-skeleton'
import { HomeSidebarSkeleton } from './home-sidebar'

export function HomePageLayoutSkeleton() {
  return (
    <main className="flex h-screen flex-1 flex-col">
      <div className="relative flex  h-full max-w-full justify-between overflow-hidden">
        <div>
          <HomeSidebarSkeleton />
        </div>
        <HomePageSkeleton />
      </div>
    </main>
  )
}
