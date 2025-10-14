'use server'

import { ERROR_CONSTANTS } from '@/lib/constants/error-constants'
import { OrgSubscription } from '@/lib/db-schema/org-subscriptions'
import * as organizationService from '@/lib/services/organization-service'
import { errorResponse } from '@/lib/utils/error-utils'
import { User, currentUser } from '@clerk/nextjs/server'

async function checkPermissions(user: User | null) {
  if (!user || !user.privateMetadata || !user.privateMetadata.chordioAdmin)
    return false

  return true
}

export async function getOrganizationSubscription(organizationId: string) {
  const user = await currentUser()
  if (!checkPermissions(user)) {
    console.error('Unauthorized access to backoffice route')
    return errorResponse(ERROR_CONSTANTS.UNAUTHORIZED, {
      organizationId,
      userId: user?.id
    })
  }

  const result = await organizationService.getOrgSubscription(organizationId)

  if (!result) {
    return null
  }

  return result
}

export async function setOrganizationSubscription(
  organizationId: string,
  organization: Omit<Partial<OrgSubscription>, 'organizationId'>
) {
  const user = await currentUser()

  if (!checkPermissions(user)) {
    console.error('Unauthorized access to backoffice route')
    return errorResponse(ERROR_CONSTANTS.UNAUTHORIZED)
  }

  const result = await organizationService.updateOrgSubscription(
    organizationId,
    organization
  )

  return result
}
