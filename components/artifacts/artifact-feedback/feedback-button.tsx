import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { motion } from 'framer-motion'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { feedbackButtonAnimation } from './animations'

export interface FeedbackButtonProps {
  onClick: () => void
  isSelected: boolean
  isPending: boolean
  tooltipText: string
  icon: typeof ThumbsUp | typeof ThumbsDown
  activeColor: string
}

export const FeedbackButton = ({
  onClick,
  isSelected,
  isPending,
  tooltipText,
  icon: Icon,
  activeColor
}: FeedbackButtonProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <motion.button
        {...feedbackButtonAnimation}
        onClick={onClick}
        disabled={isPending}
        type="button"
        className={cn(
          'transition-all size-full px-3 hover:bg-muted rounded-md',
          {
            [activeColor]: isSelected,
            'opacity-50 cursor-not-allowed': isPending
          }
        )}
      >
        <Icon className={cn('size-3', { 'animate-pulse': isPending })} />
        <span className="sr-only">{tooltipText}</span>
      </motion.button>
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent className="bg-black text-white" side="top" align="center">
        {tooltipText}
      </TooltipContent>
    </TooltipPortal>
  </Tooltip>
)
