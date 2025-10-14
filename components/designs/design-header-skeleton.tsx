import Link from 'next/link'
import { IconPRDKit } from '../ui/icons'
import { DesignBreadcrumbsSkeleton } from './design-breadcrumbs'

export function DesignHeaderSkeleton() {
  return (
    <div className="flex w-full items-center justify-between px-4">
      <Link href="/">
        <div className="flex items-center gap-3 ">
          <IconPRDKit className="h-6 w-8" />
        </div>
      </Link>
      <DesignBreadcrumbsSkeleton />
      <div className="h-10" />
    </div>
  )
}
