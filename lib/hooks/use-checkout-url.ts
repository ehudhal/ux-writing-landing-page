import { getCheckoutUrl } from '@/app/(app)/orgs/actions/org-actions'
import { useOrganization } from '@clerk/nextjs'
import { useState } from 'react'
import { toast } from 'sonner'

export function useCheckoutUrl() {
  const [loading, setLoading] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const { organization } = useOrganization()

  const fetchCheckoutUrl = async (seats: number, isAnnual: boolean) => {
    if (!organization?.id) return

    setLoading(true)
    try {
      const result = await getCheckoutUrl(seats, organization.id, isAnnual)

      if ('url' in result && result.url) {
        setCheckoutUrl(result.url)
      } else {
        console.error(result)
        toast.error('Failed to create checkout session')
      }
    } catch (error) {
      console.error(error)
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { checkoutUrl, loading, fetchCheckoutUrl }
}
