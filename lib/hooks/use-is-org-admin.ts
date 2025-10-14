import { useOrganization } from '@clerk/nextjs'

export function useIsOrgAdmin() {
  const { membership } = useOrganization()
  return membership?.role === 'org:admin'
}
