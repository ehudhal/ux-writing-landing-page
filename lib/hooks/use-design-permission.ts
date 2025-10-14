import { useAuth } from '@clerk/nextjs'
import { Design } from '../db-schema/designs'
import {
  getDesignPermission,
  PermissionNone
} from '../permissions/design-permissions'

export const useDesignPermission = (design: Design) => {
  const { userId, orgId } = useAuth()

  if (!userId || !orgId) {
    return {
      ...PermissionNone,
      userId: undefined,
      orgId: undefined
    }
  }

  const permission = getDesignPermission({ design, userId, orgId })

  return permission
}
