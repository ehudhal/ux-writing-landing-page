import { IconCheck } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { WizardProgressStep } from '../types'

export interface WizardStepsProgressBarProps {
  steps: WizardProgressStep[]
}

export function WizardStepsProgressBar({ steps }: WizardStepsProgressBarProps) {
  return (
    <div className="w-full flex items-center justify-between">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="flex-1 flex items-center relative mr-2 last:mr-0"
        >
          <div className="flex items-center gap-1 w-full">
            <div className="text-sm font-medium flex items-center gap-1 w-full">
              <div className="flex items-center whitespace-nowrap overflow-hidden">
                {step.isDone && (
                  <IconCheck className="w-4 mr-1 h-4 flex-shrink-0 hidden lg:inline-block" />
                )}
                <span
                  className={cn('text-sm truncate', {
                    'text-black font-semibold': step.isCurrent,
                    'text-black': step.isDone,
                    'text-gray-300': !step.isDone && !step.isCurrent
                  })}
                >
                  {step.title}
                </span>
              </div>
            </div>
          </div>

          <div
            className={cn(
              'absolute left-0 right-0 -bottom-2 h-0.5 rounded-full',
              step.isDone || step.isCurrent ? 'bg-gray-800' : 'bg-gray-200'
            )}
          />
        </div>
      ))}
    </div>
  )
}
