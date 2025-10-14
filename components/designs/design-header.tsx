import { getDesign, getDesignScreens } from '@/app/actions'

import { SharePolicy } from '@/lib/db-schema/designs'
import { provideProductForDesign } from '@/lib/providers/products-provider'
import { auth } from '@clerk/nextjs/server'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PRDKitLogo from '../prdkit-logo'
import { SubscriptionStatusCard } from '../subscription/subscription-indicator'
import DesignActionMenu from './design-action-menu'
import DesignBreadcrumbs from './design-breadcrumbs'

type DesignHeaderProps = {
  designId: string
  isPublicPage: boolean
}

export default async function DesignHeader({
  designId,
  isPublicPage
}: DesignHeaderProps) {
  const { orgId, userId } = await auth()
  if (!orgId || !userId) {
    notFound()
  }

  const [design, screens, derivedFromProduct] = await Promise.all([
    getDesign(designId),
    getDesignScreens(designId),
    provideProductForDesign(orgId, designId)
  ])

  if (
    'error' in design ||
    'error' in screens ||
    (derivedFromProduct && 'error' in derivedFromProduct)
  ) {
    notFound()
  }

  const designWithScreens = {
    ...design,
    sharedWithMe: design.createdBy !== userId,
    screens
  }

  const viewOnly =
    design.sharePolicy !== SharePolicy.PRIVATE && userId !== design.createdBy

  const hideActionMenu = isPublicPage || viewOnly

  return (
    <div className="flex h-10 w-full items-center justify-between px-4">
      <Link href="/">
        <PRDKitLogo variant="symbol" className="h-6" />
      </Link>

      <DesignBreadcrumbs
        designWithScreens={designWithScreens}
        derivedFromProduct={derivedFromProduct}
        isPublicPage={isPublicPage}
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <SubscriptionStatusCard showOnlyNearCapacity />
        </div>
        {!hideActionMenu && (
          <div className="flex h-10 items-center gap-4">
            <DesignActionMenu
              side="left"
              design={design}
              icon={<Ellipsis size={18} strokeWidth={1} />}
              shownActions={['share', 'delete']}
              className="flex-col-reverse"
            />
          </div>
        )}
      </div>
    </div>
  )
}
