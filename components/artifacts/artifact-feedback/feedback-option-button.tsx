import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { checkmarkAnimation } from './animations'
import { FeedbackOption } from './artifact-feedback-options'

interface FeedbackOptionButtonProps {
  option: FeedbackOption
  isSelected: boolean
  onSelect: (label: string) => void
}
export const FeedbackOptionButton = ({
  option,
  isSelected,
  onSelect
}: FeedbackOptionButtonProps) => (
  <Button
    variant="outline"
    type="button"
    className={cn(
      'w-full justify-between text-left transition-colors duration-200',
      isSelected && 'border-primary'
    )}
    onClick={() => onSelect(option.label)}
  >
    <span>{option.label}</span>
    <AnimatePresence mode="wait">
      {isSelected && (
        <motion.div {...checkmarkAnimation}>
          <Check className="size-4 text-primary" />
        </motion.div>
      )}
    </AnimatePresence>
  </Button>
)
