'use client'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface DefaultWizardButtonsProps {
  onComplete: () => void
  onSkip?: () => void
  isPending: boolean
  onBack?: () => void
  primaryButtonConfig?: {
    text?: string
    variant?: 'default' | 'primary' | 'outline'
    pendingText?: string
  }
}

export function DefaultWizardButtons({
  onComplete,
  onSkip,
  isPending,
  onBack,
  primaryButtonConfig = {}
}: DefaultWizardButtonsProps) {
  const {
    text = 'Next',
    variant = 'primary',
    pendingText = 'Saving...'
  } = primaryButtonConfig

  return (
    <div className="flex justify-between p-8">
      <div>
        {onBack && (
          <Button
            variant="outline"
            onClick={onBack}
            disabled={isPending}
            className="px-8"
          >
            Back
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        {onSkip && (
          <Button
            variant="ghost"
            onClick={onSkip}
            disabled={isPending}
            className="px-8"
          >
            Skip
          </Button>
        )}
        <Button
          onClick={onComplete}
          disabled={isPending}
          className={`px-8 ${
            variant === 'primary'
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-[#4A4A4A] hover:bg-[#3A3A3A]'
          }`}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : undefined}
          {isPending ? pendingText : text}
        </Button>
      </div>
    </div>
  )
}
