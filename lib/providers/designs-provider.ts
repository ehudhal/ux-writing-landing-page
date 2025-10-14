import { auth } from '@clerk/nextjs/server'
import { ERROR_CONSTANTS } from '../constants/error-constants'
import { getDesignPermission } from '../permissions/design-permissions'
import { getDesign } from '../services/designs-service'
import { errorResponse } from '../utils/error-utils'

const { NOTFOUND, UNAUTHORIZED } = ERROR_CONSTANTS

export async function provideDesign(designId: string) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return errorResponse(UNAUTHORIZED, { designId })
  }

  const design = await getDesign(designId)
  if (!design) {
    return errorResponse(NOTFOUND, { designId })
  }

  const permission = getDesignPermission({
    design,
    userId,
    orgId
  })

  if (!permission.read) {
    return errorResponse(UNAUTHORIZED, { designId })
  }

  return design
}
