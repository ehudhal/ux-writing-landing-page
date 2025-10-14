'use client'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import { Button } from './button'

type DismissableBannerId = `${string}-prompt`

interface DismissableBannerProps {
  id: DismissableBannerId
  position?: 'bottom' | 'top'
  className?: string
  onDismiss?: () => void
  children: React.ReactNode
  hide?: boolean
}

export const generateDismissableBannerKey = (id: DismissableBannerId) =>
  `${id}-dismissed`

export function DismissableBanner({
  id,
  position = 'bottom',
  hide = false,
  className,
  children,
  onDismiss
}: DismissableBannerProps) {
  const [isDismissed, setIsDismissed] = useLocalStorage<boolean>(
    generateDismissableBannerKey(id),
    false
  )

  const isVisible = !isDismissed && !hide

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...animationProps}
          className={`absolute ${
            position === 'bottom' ? 'bottom-8' : 'top-8'
          } left-4 z-50 w-[90vw]  md:left-auto md:right-8 md:w-auto ${className}`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-2 rounded-md"
            onClick={() => {
              onDismiss?.()
              setIsDismissed(true)
            }}
          >
            <XIcon className="size-4" />
          </Button>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const animationProps = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 },
  transition: { duration: 0.3 }
}
