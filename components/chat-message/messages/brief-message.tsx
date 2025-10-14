import { Tool } from '@/lib/chat/tools/tool-types'

import { useDisplayColumnParam } from '@/components/permanent-chat/display/use-display-column-param'
import { ArtifactType } from '@/lib/db-schema/artifacts'
import { WithoutError } from '@/lib/types'
import { cn } from '@/lib/utils'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
import { ClipboardList } from 'lucide-react'
export type BriefMessageContent = NonNullable<
  WithoutError<Tool<'generateBrief'>['result']>
>

export function BriefMessage({ messageContent }: { messageContent: string }) {
  const { setDisplayParam, displayParam } = useDisplayColumnParam()
  return parseMessageContent<BriefMessageContent>(
    messageContent,
    ({ briefId, brief }) => {
      const isActive = displayParam === briefId

      const briefContent = brief.sections?.[0]?.content
      const cleanContent = briefContent?.replace(/[#*`_~]/g, '').trim()
      return (
        <button
          onClick={() => setDisplayParam(ArtifactType.DESIGN_BRIEF, briefId)}
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
                <h3 className="font-medium">{brief.title}</h3>
              </div>
              {cleanContent && (
                <p className="text-gray-500 line-clamp-2">{cleanContent}</p>
              )}
            </div>
          </div>
        </button>
      )
    }
  )
}
