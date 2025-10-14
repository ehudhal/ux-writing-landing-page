import { SignedImage } from '@/components/images/signed-image'
import { useDisplayColumnParam } from '@/components/permanent-chat/display/use-display-column-param'
import { Tool } from '@/lib/chat/tools/tool-types'
import { ArtifactType, GenerationStatus } from '@/lib/db-schema/artifacts'
import { createFileKeyForFlowchart } from '@/lib/files/file-utils'
import { useArtifactGenerationStatus } from '@/lib/hooks/use-artifact-status'
import { WithoutError } from '@/lib/types'
import { cn } from '@/lib/utils'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
import { Workflow } from 'lucide-react'

type FlowchartContent = NonNullable<
  WithoutError<Tool<'generateFlowChart'>['result']>
>

export function FlowChartMessage({
  messageContent
}: {
  messageContent: string
}) {
  return parseMessageContent<FlowchartContent>(
    messageContent,
    ({ flowchartId }) => <FlowChartMessageItem flowchartId={flowchartId} />
  )
}

function FlowChartMessageItem({ flowchartId }: { flowchartId: string }) {
  const artifactStatus = useArtifactGenerationStatus(flowchartId)
  const { setDisplayParam, displayParam } = useDisplayColumnParam()
  const isActive = displayParam === flowchartId

  return (
    <button
      onClick={() => setDisplayParam(ArtifactType.FLOWCHART, flowchartId)}
      className="w-full"
    >
      <div
        className={cn(
          'flex items-center rounded-lg border border-gray-200 bg-white p-4 text-sm text-offblack shadow-xs transition-all duration-300 hover:scale-[1.02] active:scale-100',
          {
            'border-offblack': isActive
          }
        )}
      >
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Workflow className="size-4 shrink-0 text-gray-500" />
              <h3 className="font-medium">User Flow</h3>
            </div>

            <div className="size-10 rounded-md border">
              <SignedImage
                src={createFileKeyForFlowchart(flowchartId)}
                key={flowchartId}
                className="size-full object-contain"
                shouldRefetch={artifactStatus === GenerationStatus.GENERATING}
                shouldLogFetchError={
                  artifactStatus !== GenerationStatus.CAPTURE_FAILED
                }
              />
            </div>
          </div>
        </div>
      </div>
    </button>
  )
}
