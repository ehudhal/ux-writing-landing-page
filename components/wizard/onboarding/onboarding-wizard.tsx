'use client'

import { WizardConfig, WizardState } from '../infra/types'
import { Wizard } from '../infra/wizard'
import {
  OnboardingProvider,
  useOnboardingContext
} from './context/onboarding-context'
import { ConfirmationStep } from './steps/confirmation-step'
import { ProductDetailsStep } from './steps/product-details-step'
import { WelcomeStep } from './steps/welcome-step'

// we need this separation to have the usage of the context below the provider
function OnboardingWizardContent() {
  const { onboardingStatus } = useOnboardingContext()
  const { showOnboardingWizard, updateOnboardingStatus } = onboardingStatus

  if (!showOnboardingWizard) return null

  const handleComplete = async (state: WizardState) => {
    try {
      await updateOnboardingStatus(state.stepStatuses)
    } catch (error) {
      console.error('Failed to update onboarding status:', error)
    }
  }

  const wizardConfig: WizardConfig = {
    id: 'onboarding',
    height: '720px',
    steps: [
      {
        id: 'welcome',
        title: 'Welcome',
        component: WelcomeStep
      },
      {
        id: 'product-details',
        title: 'Product Details',
        component: ProductDetailsStep
      },
      {
        id: 'confirmation',
        title: 'Completion',
        component: ConfirmationStep
      }
    ],
    onComplete: handleComplete
  }

  return <Wizard config={wizardConfig} />
}

// This component provides the context
export function OnboardingWizard() {
  return (
    <OnboardingProvider>
      <OnboardingWizardContent />
    </OnboardingProvider>
  )
}
