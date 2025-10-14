'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { usePostHog } from 'posthog-js/react'
import { useState } from 'react'
import { WizardConfig, WizardState, WizardStepStatus } from './types'

interface WizardProps {
  config: WizardConfig
}

export function Wizard({ config }: WizardProps) {
  const posthog = usePostHog()

  const [state, setState] = useState<WizardState>(() => ({
    currentStepIndex: 0,
    stepStatuses: Object.fromEntries(
      config.steps.map(step => [step.id, 'not-started' as WizardStepStatus])
    ),
    isFinished: false
  }))

  const currentStep = config.steps[state.currentStepIndex]
  const isLastStep = state.currentStepIndex === config.steps.length - 1

  const trackWizardStep = (action: string, isLastStep: boolean) => {
    if (currentStep) {
      posthog.capture('Wizard_Step_Interaction', {
        wizardId: config.id,
        stepId: currentStep.id,
        action,
        stepStatuses: state.stepStatuses,
        isFinished: isLastStep
      })
    }
  }

  const handleStepChange = (status: WizardStepStatus) => {
    setState(prev => {
      trackWizardStep(status, isLastStep)
      const newState = {
        ...prev,
        stepStatuses: {
          ...prev.stepStatuses,
          [currentStep.id]: status
        }
      }

      if (!isLastStep) {
        return {
          ...newState,
          currentStepIndex: prev.currentStepIndex + 1
        }
      }

      newState.isFinished = true

      config.onComplete(newState)

      return newState
    })
  }

  const handleStepComplete = () => {
    handleStepChange('completed')
  }

  const handleStepSkip = () => {
    handleStepChange('skipped')
  }

  const handleStepBack = () => {
    trackWizardStep('back', false)
    setState(prev => ({
      ...prev,
      currentStepIndex: Math.max(prev.currentStepIndex - 1, 0)
    }))
  }

  const handleSkipAll = () => {
    trackWizardStep('skip_all', true)

    const newState = {
      ...state,
      stepStatuses: Object.fromEntries(
        config.steps.map(step => [step.id, 'skipped' as WizardStepStatus])
      ),
      isFinished: true
    }

    config.onComplete(newState)

    setState(newState)
  }

  // Return null if all steps are completed
  if (state.isFinished || !currentStep) {
    return null
  }

  const CurrentStepComponent = currentStep.component

  // Create progress data
  const progressSteps = config.steps.map((step, index) => ({
    title: step.title,
    isCurrent: index === state.currentStepIndex,
    isDone: index <= state.currentStepIndex //TODO: this should  probably be based on the stepStatuses to accomdate for back navigation
  }))

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        config.onClose?.()
      }}
    >
      <DialogContent
        className={cn(
          'flex flex-col p-0 gap-4',
          config.widthClassname ??
            'max-w-[80%] md:max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] 2xl:max-w-[65%] 3xl:max-w-[50%]'
        )}
        hideClose={!config.onClose}
        style={config.height ? { height: config.height } : undefined}
      >
        <VisuallyHidden>
          <DialogTitle>{currentStep.title}</DialogTitle>
        </VisuallyHidden>
        <div className="h-full overflow-y-auto">
          <CurrentStepComponent
            onComplete={handleStepComplete}
            onSkip={isLastStep ? undefined : handleStepSkip}
            onBack={state.currentStepIndex > 0 ? handleStepBack : undefined}
            onSkipAll={handleSkipAll}
            progressSteps={progressSteps}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
