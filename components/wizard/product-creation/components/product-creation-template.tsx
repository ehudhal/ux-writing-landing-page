'use client'
import { DefaultWizardButtons } from '../../infra/components/default-wizard-buttons'
import { WizardStepsProgressBar } from '../../infra/components/wizard-steps-progress-bar'
import { WizardProgressStep, WizardStepProps } from '../../infra/types'

interface ProductCreationTemplateProps extends WizardStepProps {
  children: React.ReactNode
  progressSteps: WizardProgressStep[]
  isPending: boolean
  primaryButtonConfig?: {
    text?: string
    variant?: 'default' | 'primary' | 'outline'
    pendingText?: string
  }
}

export function ProductCreationTemplate({
  children,
  progressSteps,
  onComplete,
  onSkip,
  isPending,
  onBack,
  primaryButtonConfig
}: ProductCreationTemplateProps) {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col h-full">
          <div className="flex-none py-8 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <WizardStepsProgressBar steps={progressSteps} />
          </div>
          <div className="flex-1 px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 overflow-y-auto">
            {children}
          </div>
          <div className="flex-none">
            <DefaultWizardButtons
              onComplete={onComplete}
              onSkip={onSkip}
              isPending={isPending}
              onBack={onBack}
              primaryButtonConfig={primaryButtonConfig}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
