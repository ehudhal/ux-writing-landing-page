'use client'
import { DesignBreadcrumbsSkeleton } from '@/components/designs/design-breadcrumbs'
import { Skeleton } from '@/components/ui/skeleton'

export function ScreenLayoutSkeleton() {
  return (
    <div className="h-[calc(100vh-(--spacing(24)))] w-full px-4 pb-4">
      <header>
        <DesignBreadcrumbsSkeleton />
      </header>
      <main className="flex size-full gap-0 md:gap-4">
        <aside className="hidden md:block">
          <Skeleton className="h-full w-64 border" />
        </aside>
        <section className="w-full">
          <Skeleton className="size-full border" />
        </section>
      </main>
    </div>
  )
}
