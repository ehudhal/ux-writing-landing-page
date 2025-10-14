import { getDesign, getScreen } from '@/app/actions'
import { hasDesignPermission } from '@/lib/backend-util/permission-checks'
import { notFound } from 'next/navigation'
import Design from './design'

interface DesignPageProps {
  designId: string
  screenId: string
  historicalScreenInstanceId?: string
}

export default async function DesignPage({
  designId,
  screenId,
  historicalScreenInstanceId
}: DesignPageProps) {
  const design = await getDesign(designId)

  if (!design || 'error' in design) {
    notFound()
  }
  const permissions = await hasDesignPermission(designId)

  const screen = await getScreen(screenId)

  if ('error' in screen) {
    notFound()
  }

  return (
    <Design
      designId={designId}
      screen={screen}
      historicalScreenInstanceId={historicalScreenInstanceId}
      readOnly={!permissions.write}
    />
  )
}
