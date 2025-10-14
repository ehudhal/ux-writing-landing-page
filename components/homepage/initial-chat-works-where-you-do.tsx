import { IconFigmaColor, IconSlack } from '@/components/ui/icons'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

export function InitialChatWorksWhereYouDo() {
  return (
    <motion.div
      layout
      key="ux-copilot"
      initial="exit"
      animate="enter"
      exit="exit"
      variants={contentAnimation}
      className="absolute left-1/2 -translate-x-1/2 w-full border-t max-w-4xl mx-auto py-8 flex flex-col gap-8"
    >
      <motion.h2
        layout
        variants={childAnimation}
        className="text-center font-light text-xl md:text-2xl"
      >
        Works where you do:
      </motion.h2>
      <motion.div
        layout
        variants={childAnimation}
        className="flex justify-center items-center gap-4"
      >
        <motion.div
          layout
          variants={iconAnimation}
          className="md:size-18 size-14 border rounded-full flex items-center justify-center"
        >
          <IconFigmaColor className="md:size-8 size-6" />
        </motion.div>
        <motion.div
          layout
          variants={iconAnimation}
          className="md:size-18 size-14 border rounded-full flex items-center justify-center"
        >
          <IconSlack className="md:size-8 size-6" />
        </motion.div>
        <motion.div
          layout
          variants={iconAnimation}
          className="md:size-18 size-14 border rounded-full flex items-center justify-center"
        >
          <Globe className="md:size-8 size-6 text-[#51A1E1]" strokeWidth={1} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const childAnimation = {
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1] as const
    }
  },
  exit: {
    opacity: 0,
    y: 5,
    transition: {
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1] as const
    }
  }
}

const iconAnimation = {
  enter: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 25
    }
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1] as const
    }
  }
}

const contentAnimation = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.32, 0.72, 0, 1] as const,
      staggerChildren: 0.1,
      when: 'beforeChildren' as const
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1] as const,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren' as const
    }
  }
}
