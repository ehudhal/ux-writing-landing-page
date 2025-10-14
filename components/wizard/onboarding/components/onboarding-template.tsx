'use client'
import { Button } from '@/components/ui/button'
import { IconPRDKit } from '@/components/ui/icons'
import { DefaultWizardButtons } from '../../infra/components/default-wizard-buttons'
import { WizardStepsProgressBar } from '../../infra/components/wizard-steps-progress-bar'
import { WizardProgressStep, WizardStepProps } from '../../infra/types'

interface OnboardingTemplateProps extends WizardStepProps {
  children: React.ReactNode
  progressSteps: WizardProgressStep[]
  isPending: boolean
  primaryButtonConfig?: {
    text?: string
    variant?: 'default' | 'primary' | 'outline'
    pendingText?: string
  }
}

export function OnboardingTemplate({
  children,
  progressSteps,
  onComplete,
  onSkip,
  isPending,
  onBack,
  onSkipAll,
  primaryButtonConfig
}: OnboardingTemplateProps) {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Navigation - Using Tailwind responsive classes:
          - Default width: 350px
          - Between md (768px) and xl (1280px): 250px
          - xl and above: back to 350px */}
      <div className="w-[250px] md:w-[250px] lg:w-[300px] 2xl:w-[350px] bg-[#2A2A2A] text-white p-8 flex flex-col justify-between rounded-l-lg">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <IconPRDKit className="w-8 h-8" />
            <h1 className="text-2xl font-serif">PRDKit</h1>
          </div>
          <div>
            <h2 className="text-2xl font-serif">Your UX Design Copilot</h2>
            <p className="mt-4 text-gray-300">
              PRDKit&apos;s context-aware AI goes beyond generic advice. It
              learns the nuances of your product, design system, and business
              goals.
            </p>
            <p className="mt-4 text-gray-300">
              This means every suggestion is fine-tuned to help you build
              on-brand experiences, guided by your best practices.
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={onSkipAll}
          className="mt-4 border-1 max-w-[150px]"
        >
          I&apos;ll do it later
        </Button>
      </div>

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
