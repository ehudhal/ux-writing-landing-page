import { InsightType, ProductInsights } from '@/lib/types/product-insights'

// Product related types
export interface ProductData {
  title: string
  productInsights: ProductInsights
  productId?: string
}

export const initialProductData: ProductData = {
  title: '',
  productInsights: {
    [InsightType.OVERVIEW]: { content: '' },
    [InsightType.USER_PERSONAS]: { content: '' },
    [InsightType.BUSINESS_ASPECTS]: { content: '' }
  }
}

// Onboarding status related types
export interface OnboardingStatus {
  showOnboarding: boolean
}

// Main context type with nested objects
export interface OnboardingContextType {
  productContext: {
    productData: ProductData
    setProductData: (data: ProductData) => void
  }
  onboardingStatus: {
    showOnboardingWizard: boolean
    updateOnboardingStatus: (stepStatuses: Record<string, any>) => Promise<void>
  }
}
