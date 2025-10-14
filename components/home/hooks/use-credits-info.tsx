import { getUserLicenseKey } from '@/lib/query-keys'
import { useOrganization } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'

interface UserLicense {
  credits: number
  creditsUsage: number
  extraCredits: number
  isActive: boolean
  isOrgSubscriptionActive: boolean
  // Add any other fields that getLicense returns
}

async function fetchUserLicense(): Promise<UserLicense> {
  const response = await fetch('/api/subscriptions/user-license')
  if (!response.ok) {
    throw new Error('Failed to fetch user license')
  }
  return response.json()
}

export function useCreditsInfo() {
  const { organization } = useOrganization()
  return useQuery({
    queryKey: getUserLicenseKey(organization?.id || ''),
    queryFn: fetchUserLicense,
    enabled: !!organization?.id,
    staleTime: 1000 * 60 * 5 // Consider data fresh for 5 minutes
  })
}
