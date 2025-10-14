'use client'
import CreateDesignButton from '@/components/designs/create-design-button'
import DesignCard from '@/components/designs/design-card'

import { Design, Product } from '@/lib/db-schema/designs'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import Link from 'next/link'

import Loading from '@/app/(app)/(home)/prds/(self)/loading'
import { designPageUrl } from '@/lib/app-routes'
import { useHomePageMode } from '../home/hooks/use-home-page-mode'
import { useHomePageSearch } from '../home/hooks/use-home-page-search'
import { MobileHomeSidebar } from '../home/mobile-home-sidebar'
import { EmptyStateByHomePageMode } from './designs-page-empty-state'

const title = {
  shared: 'Shared with me',
  recent: 'Recently updated',
  'my-designs': 'PRDs'
} as const

export type DesignWithProductsAndPreview = Design & {
  previewUrl: string | null
} & {
  productTitle: string | null | undefined
}

interface DesignsPageProps {
  designs: DesignWithProductsAndPreview[]
  products: Product[]
}

export default function DesignsPage({ designs, products }: DesignsPageProps) {
  const { user } = useUser()
  const { searchValue } = useHomePageSearch()
  const { mode } = useHomePageMode()

  const [animationParent] = useAutoAnimate()

  const filteredDesigns = designs.filter(design => {
    const titleMatches = design.title
      .toLowerCase()
      .includes(searchValue.toLowerCase())
    const createdByMatches =
      mode === 'shared'
        ? design.createdBy !== user?.id
        : design.createdBy === user?.id
    const recentMatches =
      mode === 'recent'
        ? design.updatedAt > new Date(Date.now() - 1000 * 60 * 60 * 24)
        : true

    return titleMatches && createdByMatches && recentMatches
  })

  const emptyStateMode = (() => {
    if (searchValue) {
      return 'no-results'
    }
    if (products.length === 0) {
      if (mode === 'my-designs' || mode === 'recent') {
        return 'my-designs-without-products'
      }
    }
    return mode
  })()

  if (!user) {
    return <Loading />
  }

  return (
    <div className="relative flex h-dvh w-full flex-col gap-4 pb-4">
      <div className="relative top-0 z-50 flex min-h-16 w-full flex-row items-center justify-between gap-8 border-b border-b-slate-100 bg-white px-4 py-2">
        <div className="relative flex w-full items-center justify-start gap-2 md:w-auto">
          <MobileHomeSidebar />
          <h2 className="font-medium">{title[mode]}</h2>
        </div>
        <div>
          <CreateDesignButton />
        </div>
      </div>
      <div
        ref={animationParent}
        className={cn(
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 px-4 overflow-y-auto',
          {
            'flex grow': filteredDesigns.length === 0
          }
        )}
      >
        {filteredDesigns.length > 0 &&
          filteredDesigns.map(design => (
            <Link
              className="max-h-[150px]"
              key={design.designId}
              href={designPageUrl(design.designId)}
            >
              <DesignCard
                currentSearch={searchValue}
                hideAvatar={mode === 'my-designs'}
                {...design}
              />
            </Link>
          ))}

        {filteredDesigns.length === 0 && (
          <EmptyStateByHomePageMode mode={emptyStateMode} />
        )}
      </div>
    </div>
  )
}
