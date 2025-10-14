// Shared animation variants for onboarding steps

// Main container animation with staggered children
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// Standard item animation (for text, small components)
export const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0, 0, 0.2, 1] as const
    }
  }
}

// Card animation (for larger containers)
export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const
    }
  }
}

// Icon animation with spring physics
export const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20
    }
  }
}

// Sequential item animation (for lists with custom delay per item)
export const sequentialVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.2 + i * 0.1,
      duration: 0.4,
      ease: [0, 0, 0.2, 1] as const
    }
  })
}

// Error message animation
export const errorVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
}

// Tab content animation
export const tabContentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
}

// Interactive element animations
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

export const hoverScaleRotate = {
  whileHover: { scale: 1.1, rotate: 3 },
  whileTap: { scale: 0.95 }
}

// Pulsing animation for attention
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      repeatType: 'reverse' as const,
      duration: 1.5
    }
  }
}

// Subtle bounce animation
export const bounceAnimation = {
  animate: {
    y: [0, -3, 0],
    transition: {
      repeat: Infinity,
      duration: 1.5
    }
  }
}
