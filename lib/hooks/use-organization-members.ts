import { useOrganization } from '@clerk/nextjs'
import { useEffect } from 'react'

export default function useOrganizationMembers() {
  const { memberships } = useOrganization({
    memberships: { infinite: true }
  })

  useEffect(() => {
    if (!memberships) {
      return
    }
    while (memberships?.hasNextPage) {
      memberships.fetchNext()
    }
  }, [memberships])

  return memberships?.data
}
