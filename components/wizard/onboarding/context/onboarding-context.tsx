'use client'
import { useHasKnowledgeWriteAccess } from '@/lib/hooks/use-knowledge-write-access'
import { getOnboardingStatusKey } from '@/lib/query-keys'
import { useAuth } from '@clerk/nextjs'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  fetchOnboardingStatus,
  updateOnboardingStatusApi
} from './context-apis'
import {
  initialProductData,
  OnboardingContextType,
  OnboardingStatus
} from './onboarding-context-types'

export const OnboardingContext = createContext<OnboardingContextType>({
  // Product state
  productContext: {
    productData: initialProductData,
    setProductData: () => {}
  },

  // Onboarding status state
  onboardingStatus: {
    showOnboardingWizard: false,
    updateOnboardingStatus: async () => {}
  }
})

export function OnboardingProvider({ children }: { children: ReactNode }) {
  // Common state
  const [isMobile, setIsMobile] = useState(true)
  const { orgId } = useAuth()
  const queryClient = useQueryClient()
  const hasWriteAccess = useHasKnowledgeWriteAccess()

  // Product state
  const [productData, setProductData] = useState(initialProductData)

  // Mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  // Onboarding status queries and mutations
  const {
    data: onboardingStatus,
    isLoading: isLoadingOnboardingStatus,
    error: onboardingStatusError
  } = useQuery<OnboardingStatus>({
    queryKey: getOnboardingStatusKey(orgId),
    queryFn: () => fetchOnboardingStatus(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 15, // 15 min caching
    enabled: !!orgId && !isMobile
  })

  const updateOnboardingStatus = async (stepStatuses: Record<string, any>) => {
    try {
      await updateOnboardingStatusApi(stepStatuses)
      queryClient.invalidateQueries({
        queryKey: getOnboardingStatusKey(orgId)
      })
    } catch (error) {
      console.error('Failed to update onboarding status:', error)
      throw error
    }
  }

  // Computed state
  const showOnboardingWizard = Boolean(
    orgId &&
      !isLoadingOnboardingStatus &&
      !onboardingStatusError &&
      onboardingStatus?.showOnboarding &&
      hasWriteAccess &&
      !isMobile
  )

  const value: OnboardingContextType = {
    // Product state
    productContext: {
      productData,
      setProductData
    },

    // Onboarding status state
    onboardingStatus: {
      showOnboardingWizard,
      updateOnboardingStatus
    }
  }

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  )
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error(
      'useOnboardingContext must be used within an OnboardingProvider'
    )
  }
  return context
}
