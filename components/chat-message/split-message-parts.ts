import { ChatToolName, isNonGenerativeTool } from '@/lib/chat/tools/tool-types'
import { Message } from 'ai'

export const splitMessageParts = (message: Message) => {
  if (message.parts) {
    return message.parts
      .map((part, index) => {
        if (part.type === 'tool-invocation') {
          if (
            isNonGenerativeTool(part.toolInvocation.toolName as ChatToolName)
          ) {
            return undefined
          }
          return {
            ...message,
            id: `${message.id}-part-${index}`,
            toolInvocations: undefined,
            content: '',
            parts: [part]
          }
        }

        if (part.type === 'text') {
          return {
            ...message,
            id: `${message.id}-part-${index}`,
            content: part.text,
            toolInvocations: undefined,
            parts: [part]
          }
        }

        if (part.type === 'reasoning') {
          return {
            ...message,
            id: `${message.id}-part-${index}`,
            content: part.reasoning,
            parts: [part]
          }
        }

        if (part.type === 'step-start') {
          return
        }

        throw new Error(`Unknown part type ${JSON.stringify(part)}`)
      })
      .filter(Boolean)
  } else {
    return [message]
  }
}
