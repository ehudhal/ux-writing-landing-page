import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { MobileHomeSidebar } from './mobile-home-sidebar'

export function HomePageSkeleton() {
  const items = Array.from({ length: 5 }).map((_, index) => ({
    productId: index,
    title: `Product Model ${index}`
  }))

  return (
    <div className="flex w-full flex-col gap-4 pb-4">
      <div className="flex h-min w-full flex-row items-center justify-between gap-8 border-b border-b-slate-100 px-4 py-2">
        <div className="relative flex w-full items-center justify-start gap-2 md:w-auto">
          <MobileHomeSidebar />
          <Skeleton className="h-6 w-24" />
        </div>
        <div>
          <Button className="w-24 md:w-48" />
        </div>
      </div>
      <div className="flex flex-col items-start gap-2">
        <div
          className={cn('flex w-full  grow overflow-y-auto ', {
            'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 auto-rows-min px-4':
              items.length > 0
          })}
        >
          {items.map(item => (
            <Skeleton key={item.productId} className="h-[150px] w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
