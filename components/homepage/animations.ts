import { Variants } from 'framer-motion'

export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0
  }
}

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
}

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: () => ({
    opacity: 1,
    y: 0
  })
}

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1
  }
}

export const defaultTransition = {
  duration: 0.8,
  ease: [0, 0, 0.2, 1] as const
}

export const customEaseTransition = {
  duration: 1.2,
  ease: [0.16, 1, 0.3, 1] as const
}

export const createTransition = (
  delay: number = 0,
  isCustomEase: boolean = false
) => ({
  ...(isCustomEase ? customEaseTransition : defaultTransition),
  delay
})

export const createCardTransition = (index: number) => ({
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1] as const,
  delay: index * 0.15
})
