import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle
} from '@/components/ui/dialog'
import { UseFormReturn } from 'react-hook-form'
import { FeedbackOption } from './artifact-feedback-options'
import { FeedbackDetailsForm } from './feedback-details-form'
import { FeedbackOptionButton } from './feedback-option-button'
import { FeedbackFormValues } from './schema'

interface FeedbackDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  feedbackOptions: FeedbackOption[]
  form: UseFormReturn<FeedbackFormValues>
  onSubmit: () => void
  onClose: () => void
  pending: boolean
  handleFeedbackSelection: (option: string) => void
}

export const FeedbackDialog = ({
  isOpen,
  onOpenChange,
  feedbackOptions,
  form,
  onSubmit,
  onClose,
  pending,
  handleFeedbackSelection
}: FeedbackDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle>What&apos;s wrong with this response?</DialogTitle>
        <DialogDescription className="sr-only">
          Please select the issue with this review:
        </DialogDescription>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              {feedbackOptions.map(option => (
                <FeedbackOptionButton
                  key={option.label}
                  option={option}
                  isSelected={
                    form.watch('selectedFeedbackOption') === option.label
                  }
                  onSelect={handleFeedbackSelection}
                />
              ))}
            </div>

            <FeedbackDetailsForm
              isVisible={Boolean(form.watch('selectedFeedbackOption'))}
              feedbackDetails={form.watch('feedbackDetails') || ''}
              onFeedbackChange={value =>
                form.setValue('feedbackDetails', value)
              }
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={pending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!form.watch('selectedFeedbackOption') || pending}
            >
              {pending ? 'Sharing...' : 'Share feedback'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
