'use client'
import { Flowchart } from '@/components/ui/flowchart'
import { motion } from 'framer-motion'
import { BackToChatButton } from '../permanent-chat/chat/back-to-chat-button'
import {
  containerVariants,
  itemVariants,
  textVariants
} from './animation-variants'

export default function FlowchartView({
  flowchart,
  children,
  showBackToChat = true
}: {
  flowchart: string
  children?: React.ReactNode
  showBackToChat?: boolean
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto flex w-full max-w-4xl flex-col gap-2 overflow-y-auto p-4 md:gap-4 md:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <h1 className="flex items-center gap-2 font-serif text-xl font-medium ">
          {showBackToChat && <BackToChatButton />}
          User Flow
        </h1>
        {children}
      </motion.div>

      <motion.section
        variants={itemVariants}
        className="rounded-lg border border-[#F0F0EF] bg-[#F9F9FB] p-4"
      >
        <motion.div variants={textVariants} className="relative p-4">
          <Flowchart definition={flowchart} />
        </motion.div>
      </motion.section>
    </motion.div>
  )
}
