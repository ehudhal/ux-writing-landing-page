import { CustomComponentName } from '@/components/chat-message/custom-components-enum'
import { Message } from 'ai'
import { filter, flatMap, map, pipe } from 'remeda'
import { z } from 'zod'

export function extractComponentNameFromMessage(message: Message) {
  try {
    if (!message.annotations || message.annotations.length === 0) return null

    const annotationSchema = z.object({
      componentName: z.nativeEnum(CustomComponentName).optional()
    })

    const annotationsSchema = z.array(annotationSchema).min(1)

    const customComponentNames = pipe(
      message.annotations,
      annotationsSchema.parse,
      map(annotation => annotation.componentName),
      filter(name => name !== undefined)
    )

    const hasCustomComponentNames =
      customComponentNames?.length > 0 && customComponentNames[0]

    if (hasCustomComponentNames) {
      return customComponentNames[0]
    }

    return null
  } catch {
    return null
  }
}

export const extractSuggestions = (message: Message) => {
  try {
    if (!message.annotations) return []

    const annotationSchema = z.object({
      type: z.string(),
      content: z.array(z.string()).min(1)
    })

    const annotationsSchema = z.array(annotationSchema).min(1)

    const suggestions = pipe(
      message.annotations, // Start with raw annotations array from message
      annotationsSchema.parse, // Validate annotations match expected schema
      filter(annotation => annotation.type === 'suggestions'), // Keep only suggestion type annotations
      map(annotation => annotation.content), // Extract content arrays from annotations
      flatMap(content => content) // Flatten nested arrays into single suggestions array
    )

    return suggestions
  } catch {
    return []
  }
}
