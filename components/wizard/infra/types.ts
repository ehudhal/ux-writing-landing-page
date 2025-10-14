import { ComponentType } from 'react'

export type WizardStepStatus = 'not-started' | 'completed' | 'skipped'

// generic wizard config
export interface WizardConfig {
  id: string
  steps: WizardStepConfig[]
  onComplete: (state: WizardState) => void
  height?: string
  onClose?: () => void
  widthClassname?: string
}

export interface WizardState {
  currentStepIndex: number
  stepStatuses: Record<string, WizardStepStatus>
  isFinished: boolean
}

export interface WizardProgressStep {
  title: string
  isDone: boolean
  isCurrent: boolean
}

export interface WizardStepConfig {
  id: string
  title: string
  description?: string
  component: ComponentType<WizardStepProps>
}
export interface WizardStepProps {
  onComplete: () => void
  onSkip?: () => void
  onBack?: () => void
  onSkipAll: () => void
  progressSteps: WizardProgressStep[]
}

// specific wizards data
export type OnboardingWizardData = {
  onboarding: {
    isFinished: boolean
    userId: string
    completedAt: string
    stepStatuses: Record<string, WizardStepStatus>
  }
}
