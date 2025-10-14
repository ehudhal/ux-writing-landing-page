import { useDisplayColumnParam } from '@/components/permanent-chat/display/use-display-column-param'
import { Tool } from '@/lib/chat/tools/tool-types'
import { ArtifactType } from '@/lib/db-schema/artifacts'
import { WithoutError } from '@/lib/types'
import { cn } from '@/lib/utils'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
import { ClipboardList } from 'lucide-react'

type AIDevAgentInstructionsMessageContent = NonNullable<
  WithoutError<Tool<'generateAIDevAgentInstructions'>['result']>
>

export default function AIDevAgentInstructionsMessage({
  messageContent
}: {
  messageContent: string
}) {
  const { setDisplayParam, displayParam } = useDisplayColumnParam()
  return parseMessageContent<AIDevAgentInstructionsMessageContent>(
    messageContent,
    ({ instructionsArtifactId, instructions }) => {
      const cleanContent = instructions.overview?.replace(/[#*`_~]/g, '').trim()
      const isActive = displayParam === instructionsArtifactId

      return (
        <button
          onClick={() =>
            setDisplayParam(
              ArtifactType.DEV_AGENT_INSTRUCTIONS,
              instructionsArtifactId
            )
          }
          className="w-full"
        >
          <div
            className={cn(
              'flex w-full items-center rounded-lg border border-gray-200 bg-white p-4 text-sm  text-offblack shadow-xs transition-all duration-300  hover:scale-[1.02] active:scale-100',
              {
                'border-offblack': isActive
              }
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <ClipboardList className="mr-2 size-4 shrink-0 text-gray-500" />
                <h3 className="font-medium">Agent Instructions</h3>
              </div>
              {cleanContent && (
                <p className="text-gray-500 line-clamp-2 text-left">
                  {cleanContent}
                </p>
              )}
            </div>
          </div>
        </button>
      )
    }
  )
}
