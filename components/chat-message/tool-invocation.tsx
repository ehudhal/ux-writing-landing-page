import {
  DeprecatedGenerativeToolName,
  GenerativeToolName
} from '@/lib/chat/tools/tool-types'
import { ToolInvocation as ToolInvocationType } from 'ai'
import { Loader2 } from 'lucide-react'
import AIDevAgentInstructionsMessage from './messages/ai-dev-agent-instructions-message'
import { BriefMessage } from './messages/brief-message'
import { FlowChartMessage } from './messages/flowchart-message'
import { SocialPostsMessage } from './messages/social-posts-message'
import { WireframeMessage } from './messages/wireframe-message'

const tools: Record<
  GenerativeToolName | DeprecatedGenerativeToolName,
  {
    label: string
    component: React.FC<{ messageContent: string }> | null
  }
> = {
  generateFlowChart: {
    label: 'Creating flowchart...',
    component: FlowChartMessage
  },
  generateBrief: {
    label: 'Creating PRD...',
    component: BriefMessage
  },

  generateWireframe: {
    label: 'Generating wireframe...',
    component: WireframeMessage
  },
  generateSocialPosts: {
    label: 'Generating social posts...',
    component: SocialPostsMessage
  },
  //THESE are deprecated but we are keeping them to support old messages
  generateFlowBrief: {
    label: 'Creating PRD...',
    component: BriefMessage
  },
  generateDesignBrief: {
    label: 'Creating PRD...',
    component: BriefMessage
  },
  generateAIDevAgentInstructions: {
    label: 'Creating agent instructions...',
    component: AIDevAgentInstructionsMessage
  }
}

export function ToolInvocation({
  toolInvocation
}: {
  toolInvocation: ToolInvocationType
}) {
  switch (toolInvocation.state) {
    case 'result':
      const Component = tools[toolInvocation.toolName].component
      return Component ? (
        <Component messageContent={JSON.stringify(toolInvocation.result)} />
      ) : null
    default:
      return (
        <div className="flex w-full items-center gap-2  rounded-lg border bg-white p-4 shadow-xs">
          <Loader2 className="size-4 animate-spin" />
          <p className="whitespace-nowrap text-xs font-medium">
            {tools[toolInvocation.toolName].label}
          </p>
        </div>
      )
  }
}
