import { motion } from 'framer-motion'
import { feedbackDetailsAnimation } from './animations'
interface FeedbackDetailsFormProps {
  isVisible: boolean
  feedbackDetails: string
  onFeedbackChange: (value: string) => void
}

export const FeedbackDetailsForm = ({
  isVisible,
  feedbackDetails,
  onFeedbackChange
}: FeedbackDetailsFormProps) => (
  <motion.div
    {...feedbackDetailsAnimation(isVisible)}
    className="flex flex-col gap-4 overflow-hidden"
  >
    <textarea
      value={feedbackDetails}
      onChange={e => onFeedbackChange(e.target.value)}
      placeholder="Please add any details to help us improve PRDKit (Optional) "
      className="w-full min-h-[100px] p-3 rounded-md border border-input bg-transparent text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
    />
  </motion.div>
)
