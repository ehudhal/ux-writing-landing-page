import {
  GenerativeToolName,
  isGenerativeTool
} from '@/lib/chat/tools/tool-types'
import { extractComponentNameFromMessage } from '@/lib/utils/get-component-name-from-message'
import { Message } from 'ai'
import { filter, map, pipe } from 'remeda'
import { CustomComponentName } from './custom-components-enum'
import { BriefMessage } from './messages/brief-message'
import { FlowChartMessage } from './messages/flowchart-message'
import ScreensSummaryMessage from './messages/screens-summary-message'
import { ScreenshotsMessage } from './messages/screenshots-message'

const componentMap: Record<
  CustomComponentName,
  React.FC<{ messageContent: string }>
> = {
  [CustomComponentName.ScreenSummary]: ScreensSummaryMessage,
  [CustomComponentName.DesignBrief]: BriefMessage,
  [CustomComponentName.Screenshots]: ScreenshotsMessage,
  [CustomComponentName.FlowChart]: FlowChartMessage
}

export const getCustomComponent = (message: Message) => {
  const customComponentName: CustomComponentName | null =
    extractComponentNameFromMessage(message)

  let CustomComponent = null
  if (customComponentName) {
    CustomComponent = componentMap[customComponentName]
  }

  if (!CustomComponent) {
    return null
  }

  return CustomComponent
}

export const getToolInvocations = (message: Message) => {
  // Retains backward compatibility with old messages
  if (message.toolInvocations) {
    return message.toolInvocations.filter(toolInvocation =>
      isGenerativeTool(toolInvocation.toolName as GenerativeToolName)
    )
  }

  const invocations = pipe(
    message.parts ?? [],
    filter(part => part.type === 'tool-invocation'),
    map(part => part.toolInvocation),
    filter(toolInvocation =>
      isGenerativeTool(toolInvocation.toolName as GenerativeToolName)
    )
  )
  if (invocations.length === 0) {
    return null
  }
  return invocations
}
