export const feedbackButtonAnimation = {
  whileTap: { scale: 0.6 },
  whileHover: { scale: 1.1 },
  transition: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 5
  }
} as const

export const checkmarkAnimation = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 500,
      damping: 25,
      duration: 0.3
    }
  },
  exit: {
    scale: 0,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
} as const

export const feedbackDetailsAnimation = (open: boolean) => ({
  initial: { height: 0, opacity: 0 },
  animate: {
    height: open ? 'auto' : 0,
    opacity: open ? 1 : 0
  },
  exit: {
    height: 0,
    opacity: 0
  },
  transition: {
    duration: 0.2,
    type: 'spring' as const,
    stiffness: 200,
    damping: 20,
    ease: [0, 0, 0.2, 1] as const
  }
})
