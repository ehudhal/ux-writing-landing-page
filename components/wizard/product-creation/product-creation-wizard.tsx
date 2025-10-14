'use client'

import { WizardConfig } from '../infra/types'
import { Wizard } from '../infra/wizard'
import { ProductCreationProvider } from './context/product-creation-context'
import { ProductCompletionStep } from './steps/product-completion-step'
import { ProductDetailsStep } from './steps/product-details-step'
import { ProductUrlStep } from './steps/product-url-step'
export function ProductCreationWizard({
  showWizard,
  onWizardClose
}: {
  showWizard: boolean
  onWizardClose: () => void
}) {
  if (!showWizard) return null

  const handleComplete = async () => {
    onWizardClose()
  }

  const wizardConfig: WizardConfig = {
    id: 'product-creation',
    height: '720px',
    steps: [
      {
        id: 'product-url',
        title: 'Product URL',
        component: ProductUrlStep
      },
      {
        id: 'product-details',
        title: 'Product Details',
        component: ProductDetailsStep
      },
      {
        id: 'product-confirmation',
        title: 'Completion',
        component: ProductCompletionStep
      }
    ],
    onComplete: handleComplete,
    onClose: onWizardClose,
    widthClassname: 'max-w-[70%]  lg:max-w-[60%] xl:max-w-[50%] 2xl:max-w-[45%]'
  }

  return (
    <ProductCreationProvider>
      <Wizard config={wizardConfig} />
    </ProductCreationProvider>
  )
}
