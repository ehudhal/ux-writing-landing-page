'use client'
import { AIDevAgentInstructions } from '@/lib/chat/schemas/ai-dev-agent-instructions-schema'
import { motion } from 'framer-motion'
import { BackToChatButton } from '../permanent-chat/chat/back-to-chat-button'
import {
  containerVariants,
  itemVariants,
  textVariants,
  titleVariants
} from './animation-variants'

interface AIDevAgentInstructionsViewProps {
  instructions: AIDevAgentInstructions
  showBackToChat?: boolean
  children?: React.ReactNode
}

export function AIDevAgentInstructionsView({
  instructions,
  showBackToChat = true,
  children
}: AIDevAgentInstructionsViewProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto flex w-full max-w-4xl flex-col gap-4 overflow-y-auto p-4 md:gap-6 md:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <h1 className="flex items-center gap-2 font-serif text-xl font-medium md:text-2xl">
          {showBackToChat && <BackToChatButton />}
          {`Agent Instructions`}
        </h1>
        {children}
      </motion.div>

      {instructions.overview && (
        <motion.section
          variants={itemVariants}
          className="rounded-lg border border-[#F0F0EF] bg-[#F9F9FB] p-4"
        >
          <motion.section
            variants={itemVariants}
            className="rounded-lg bg-white p-6"
          >
            <motion.h3 variants={titleVariants} className="text-lg font-medium">
              Overview
            </motion.h3>
            <motion.p variants={textVariants} className="text-gray-700">
              {instructions.overview}
            </motion.p>
          </motion.section>
        </motion.section>
      )}

      <div className="flex flex-col gap-6">
        {instructions.tasks.map((task, index) => (
          <motion.section
            key={index}
            variants={itemVariants}
            className="rounded-lg border border-[#F0F0EF] bg-[#F9F9FB] p-4"
          >
            <motion.section
              variants={itemVariants}
              className="rounded-lg bg-white p-6"
            >
              <div className="space-y-4">
                <motion.h3
                  variants={titleVariants}
                  className="text-lg font-medium"
                >
                  {`${index + 1}. ${task.title}`}
                </motion.h3>
                <motion.p variants={textVariants} className="text-gray-700">
                  {task.description}
                </motion.p>
                <div className="flex flex-col gap-4">
                  {task.steps.map((step, stepIndex) => (
                    <motion.section
                      key={stepIndex}
                      variants={itemVariants}
                      className="flex flex-col gap-2 rounded-lg bg-white p-1"
                    >
                      <motion.p
                        variants={textVariants}
                        className="text-gray-700"
                      >
                        <span className="font-medium">
                          Step {stepIndex + 1}:
                        </span>{' '}
                        {step.description}
                      </motion.p>
                    </motion.section>
                  ))}
                </div>
              </div>
            </motion.section>
          </motion.section>
        ))}
      </div>
    </motion.div>
  )
}
