import { useMemo } from 'react'

interface ChatMessageAnimationProps {
  loading: boolean
  index: number
  messagesLength: number
}

export function useChatMessageAnimation({
  loading,
  index,
  messagesLength
}: ChatMessageAnimationProps) {
  const delay = useMemo(() => {
    if (loading) {
      return 0
    }
    return index === messagesLength - 1
      ? 0
      : Math.max(0, (messagesLength - index) * 0.1)
  }, [loading, index, messagesLength])

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.4,
      delay
    }
  }

  return animationProps
}
