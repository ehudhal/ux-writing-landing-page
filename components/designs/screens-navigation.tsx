import { getDesign, getDesignPermissions } from '@/app/actions'
import { provideProductScreens } from '@/lib/providers/products-provider'
import { notFound } from 'next/navigation'
import ScreenListNavigation from './screens-list-navigation'

export default async function ScreensNavigation({
  designId,
  forcedReadOnly = false
}: {
  designId: string
  forcedReadOnly?: boolean
}) {
  const [design, permissions, productScreens] = await Promise.all([
    getDesign(designId),
    getDesignPermissions(designId),
    provideProductScreens(designId)
  ])

  if ('error' in design || 'error' in permissions) {
    notFound()
  }

  const readOnly = forcedReadOnly || !permissions.write

  return (
    <div className="hidden h-full md:flex">
      <ScreenListNavigation
        capturedScreens={productScreens.capturedScreens}
        readonly={readOnly}
        designId={designId}
        isParent={design.isParent}
      />
    </div>
  )
}
