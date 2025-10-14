import { z } from 'zod'

export const feedbackFormSchema = z.object({
  selectedFeedbackOption: z.string().nullable(),
  feedbackDetails: z.string().optional()
})

export type FeedbackFormValues = z.infer<typeof feedbackFormSchema>
