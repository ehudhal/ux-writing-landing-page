'use client'
import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { AnimatePresence, motion } from 'framer-motion'
import { ChatMessageAttachment } from './chat-message-attachment'
import { ChatMessageAvatar } from './chat-message-avatar'
import { ChatMessageLoader } from './chat-message-loader'
import { ChatMessageMarkdown } from './chat-message-markdown'

import { memo } from 'react'
import { getCustomComponent, getToolInvocations } from './chat-message-helpers'
import { ToolInvocation } from './tool-invocation'
import { useChatMessageAnimation } from './use-chat-message-animation'
export interface ChatMessageProps {
  message: Message
  index: number
  loading?: boolean
  messagesLength: number
  previousMessageOfSameRole?: boolean
}

export function ChatMessage({
  message,
  index,
  messagesLength,
  loading = false,
  previousMessageOfSameRole = false,
  ...props
}: ChatMessageProps) {
  const content = message.content ?? ''
  const animationProps = useChatMessageAnimation({
    loading,
    index,
    messagesLength
  })

  const CustomComponent = getCustomComponent(message)
  const toolInvocations = getToolInvocations(message)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        {...animationProps}
        className={cn(
          'group relative mb-0 mt-10 flex items-start md:-ml-12  md:pl-12',
          {
            'mt-3': previousMessageOfSameRole,
            'flex-row-reverse': message.role === 'user'
          }
        )}
        {...props}
      >
        {/* <DebugMessage message={message} /> */}
        <ChatMessageAvatar
          message={message}
          invisible={previousMessageOfSameRole}
        />
        <div
          className={cn(
            'ml-4 flex  flex-col items-start justify-start gap-4   rounded-xl rounded-bl-md',
            {
              'ml-12 mr-4 rounded-tr-md rounded-bl-xl px-4 py-3 items-end bg-white  border border-border/50 ':
                message.role === 'user',
              'bg-transparent border-none w-full mr-12 ':
                (CustomComponent || toolInvocations) &&
                message.role === 'assistant'
            }
          )}
        >
          {!loading && !CustomComponent && content && (
            <ChatMessageMarkdown
              key={`${message.id}-${message.role}`}
              messageContent={content}
            />
          )}
          {message.experimental_attachments && (
            <div className="flex flex-wrap gap-2">
              {message.experimental_attachments.map(attachment => (
                <ChatMessageAttachment
                  key={attachment.url}
                  attachment={attachment}
                />
              ))}
            </div>
          )}
          {loading && <ChatMessageLoader message={message} />}
          {!loading && CustomComponent && (
            <CustomComponent messageContent={message.content} />
          )}
          {toolInvocations &&
            toolInvocations.map(toolInvocation => {
              return (
                <ToolInvocation
                  key={`${toolInvocation.toolCallId}-${toolInvocation.toolName}-${toolInvocation.state}`}
                  toolInvocation={toolInvocation}
                />
              )
            })}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export const MemoizedChatMessage = memo(ChatMessage)
