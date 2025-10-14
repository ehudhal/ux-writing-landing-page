import { getOrgMembersCount } from '@/app/(app)/orgs/actions/org-actions'
import { useState } from 'react'

export function useOrganizationMemberCount() {
  const [memberCount, setMemberCount] = useState(5)
  const [loading, setLoading] = useState(false)

  const fetchMemberCount = async () => {
    try {
      setLoading(true)
      const response = await getOrgMembersCount()

      if (typeof response === 'number') {
        setMemberCount(response)
        return response
      }
      return memberCount
    } catch (error) {
      console.error('Failed to fetch member count:', error)
      return memberCount
    } finally {
      setLoading(false)
    }
  }

  return { memberCount, loading, fetchMemberCount }
}
