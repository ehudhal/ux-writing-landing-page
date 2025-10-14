import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { FeedbackType } from '@/lib/types'

export const useLocalArtifactFeedback = (artifactId: string) => {
  const [artifactFeedback, setArtifactFeedback] = useLocalStorage<{
    helpful: string | null
    unhelpful: string | null
  }>(`artifact-feedback-${artifactId}`, {
    helpful: null,
    unhelpful: null
  })

  const checkIfHasSharedFeedback = (type: FeedbackType) => {
    return artifactFeedback[type]
  }

  const setHasSharedFeedback = (type: FeedbackType) => {
    const newArtifactFeedback = {
      ...artifactFeedback,
      [type]: true
    }
    setArtifactFeedback(newArtifactFeedback)
  }

  const onShareFeedback = (type: FeedbackType) => {
    const now = new Date().toISOString()
    const newArtifactFeedback = {
      ...artifactFeedback,
      [type]: now
    }
    setArtifactFeedback(newArtifactFeedback)
  }

  const getCurrentFeedback = () => {
    const helpfulTimestamp = artifactFeedback.helpful
    const unhelpfulTimestamp = artifactFeedback.unhelpful

    if (!helpfulTimestamp && !unhelpfulTimestamp) {
      return null
    }

    if (!helpfulTimestamp) {
      return 'unhelpful'
    }

    if (!unhelpfulTimestamp) {
      return 'helpful'
    }

    // Compare timestamps to see which feedback was given most recently
    return helpfulTimestamp > unhelpfulTimestamp ? 'helpful' : 'unhelpful'
  }

  return {
    checkIfHasSharedFeedback,
    artifactFeedback,
    setHasSharedFeedback,
    onShareFeedback,
    getCurrentFeedback
  }
}
