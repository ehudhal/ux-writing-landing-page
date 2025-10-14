import { DefaultDesignTitle } from '../../db-schema/designs'

import { getDesign, updateDesign } from '@/lib/services/designs-service'
import { CoreMessage, generateObject, Message } from 'ai'
import { z } from 'zod'
import { openai } from '../../ai'
import { prompts } from '../../prompts/prompts'

/**
 * Summarizes the goal of the design based on the chat history.
 * @param options.force - If force is true, the LLM will set a goal even if unclear.
 */
export async function summarizeDesignGoal(
  designId: string,
  messages: Message[] | CoreMessage[],
  options: {
    force?: boolean
  } = {}
) {
  const design = await getDesign(designId)
  if (!design) {
    throw new Error('Design not found')
  }

  // stop if the design already has a title
  if (design.title !== DefaultDesignTitle) {
    return
  }

  const { object: designGoal } = await generateObject({
    model: openai('gpt-4.1-mini'),
    messages,
    system: prompts('chat/design/models/goal/action')
      .addIf(!options.force, 'chat/design/models/goal/null-ok')
      .toString(),
    schema: z.object({
      overallGoal: z.string().nullable()
    })
  })

  if (designGoal.overallGoal) {
    // This a fix for when the LLM outputs null as string or Untitled chat.
    if (['Untitled chat', 'null'].includes(designGoal.overallGoal)) {
      return
    }

    await updateDesign(designId, {
      title: designGoal.overallGoal
    })
    return designGoal.overallGoal
  }
}
