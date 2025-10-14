'use client'

import { shareFeedbackOnArtifact } from '@/lib/actions/artifact-actions'
import { ArtifactType } from '@/lib/db-schema/artifacts'
import { FeedbackType } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  FeedbackOption,
  feedbackOptionsByType
} from './artifact-feedback-options'
import { FeedbackButton } from './feedback-button'
import { FeedbackDialog } from './feedback-dialog'
import { feedbackFormSchema, FeedbackFormValues } from './schema'
import { useLocalArtifactFeedback } from './use-local-artifact-feedback'

export const ArtifactFeedbackByArtifactType = ({
  artifactType,
  artifactId
}: {
  artifactType: ArtifactType
  artifactId: string
}) => (
  <ArtifactFeedback
    feedbackOptions={feedbackOptionsByType[artifactType]}
    artifactId={artifactId}
  />
)

export const ArtifactFeedback = ({
  feedbackOptions,
  artifactId
}: {
  feedbackOptions: FeedbackOption[]
  artifactId: string
}) => {
  const [isUnhelpfulResponseDialogOpen, setIsUnhelpfulResponseDialogOpen] =
    useState(false)
  const [pending, startTransition] = useTransition()

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackFormSchema),
    defaultValues: {
      selectedFeedbackOption: null,
      feedbackDetails: ''
    }
  })

  const { checkIfHasSharedFeedback, getCurrentFeedback, onShareFeedback } =
    useLocalArtifactFeedback(artifactId)

  const handleFeedbackSelection = (option: string) => {
    form.setValue(
      'selectedFeedbackOption',
      form.getValues('selectedFeedbackOption') === option ? null : option
    )
  }

  const handleOpen = () => {
    if (getCurrentFeedback() === 'unhelpful') {
      toast.error('You have already shared feedback for this artifact.')
      return
    }

    setIsUnhelpfulResponseDialogOpen(true)
  }

  const handleClose = () => {
    setIsUnhelpfulResponseDialogOpen(false)
    form.reset()
  }

  const handleShareFeedback = async (type: FeedbackType) => {
    if (checkIfHasSharedFeedback(type)) {
      toast.error('You have already shared feedback for this artifact.')
      return
    }

    startTransition(async () => {
      await shareFeedbackOnArtifact({
        artifactId,
        feedbackType: type,
        feedbackReason: form.getValues('selectedFeedbackOption'),
        additionalFeedback: form.getValues('feedbackDetails')
      })
      toast.success('Thanks for your feedback!')
      handleClose()
    })
    onShareFeedback(type)
  }

  return (
    <div className="flex items-center gap-0 relative border bg-white rounded-lg p-0 overflow-hidden">
      <FeedbackButton
        onClick={() => handleShareFeedback('helpful')}
        isSelected={getCurrentFeedback() === 'helpful'}
        isPending={pending}
        tooltipText="Helpful"
        icon={ThumbsUp}
        activeColor="text-green-600"
      />
      <div className="h-4 w-[1px] bg-gray-200" />
      <FeedbackButton
        onClick={handleOpen}
        isSelected={getCurrentFeedback() === 'unhelpful'}
        isPending={pending}
        tooltipText="Unhelpful"
        icon={ThumbsDown}
        activeColor="text-red-700"
      />
      <FeedbackDialog
        isOpen={isUnhelpfulResponseDialogOpen}
        onOpenChange={setIsUnhelpfulResponseDialogOpen}
        feedbackOptions={feedbackOptions}
        form={form}
        onSubmit={() => handleShareFeedback('unhelpful')}
        onClose={handleClose}
        pending={pending}
        handleFeedbackSelection={handleFeedbackSelection}
      />
    </div>
  )
}
