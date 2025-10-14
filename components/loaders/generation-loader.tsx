'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { PropsWithChildren, useEffect, useState } from 'react'
import styles from './generation-loader.module.css'

/**
 * Messages to display while generating a wireframe
 * Duration is in seconds
 */
const defaultMessages = [
  {
    content: 'Analyzing...',
    duration: 5
  },
  {
    content: 'Generating screen state...',
    duration: 10
  },
  {
    content: 'Composing UI elements...',
    duration: 15
  },
  {
    content: 'Almost there...',
    duration: 20
  }
]

type GenerationLoaderProps = {
  /**
   * Size of the loader
   */
  size?: number
  /**
   * Loader messages
   */
  messages?: typeof defaultMessages
  /**
   * Enable blur effect on background
   */
  blur?: boolean
  className?: string
}

export default function GenerationLoader({
  className,
  messages = defaultMessages,
  size = 32,
  blur = false,
  children
}: PropsWithChildren<GenerationLoaderProps>) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  useEffect(() => {
    const timers = messages.map((message, index) => {
      return setTimeout(() => {
        setCurrentMessageIndex(index)
      }, message.duration * 1000)
    })

    return () => {
      timers.forEach(timer => clearTimeout(timer)) // Clear other timers if added
    }
  }, [messages])

  return (
    <>
      <div className={cn(styles.container, className)}>
        <div className={styles.content}>
          <Loader size={size} className={styles.spinner} strokeWidth={1} />
          {messages.map((message, index) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: currentMessageIndex === index ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              hidden={currentMessageIndex !== index}
              key={index}
            >
              {message.content}
            </motion.span>
          ))}
        </div>
      </div>
      <div className={cn(styles.children, blur && styles.blurContainer)}>
        {children}
      </div>
    </>
  )
}
