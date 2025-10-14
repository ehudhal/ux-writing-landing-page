import { ArtifactType } from '@/lib/db-schema/artifacts'
import { ArtifactData } from '@/lib/types/artifact-data'
import { ArtifactCopyMenu } from '../artifact-copy/artifact-copy-menu'
import { ArtifactCopyMenuItem } from '../artifact-copy/artifact-copy-menu-item'
import { ArtifactShare } from '../artifact-share/aritfact-share'
import { ArtifactCompletionStatusGuard } from '../artifacts/artifact-completion-status-guard'
import { ArtifactFeedbackByArtifactType } from '../artifacts/artifact-feedback/artifact-feedback'
import { IconNotion } from '../ui/icons'

type ArtifactActionsProps<T extends ArtifactType> = {
  artifactId: string
  type: T
  data: ArtifactData[T]
  showNotion?: boolean
  showCopy?: boolean
  showCopyImage?: boolean
  showShare?: boolean
  showFeedback?: boolean
}

export function ArtifactActions<T extends ArtifactType>({
  artifactId,
  type,
  data,
  showNotion = true,
  showCopy = true,
  showCopyImage = false,
  showShare = true,
  showFeedback = true
}: ArtifactActionsProps<T>) {
  return (
    <ArtifactCompletionStatusGuard artifactId={artifactId}>
      <div className="flex gap-2">
        {showFeedback && (
          <ArtifactFeedbackByArtifactType
            artifactType={type}
            artifactId={artifactId}
          />
        )}
        <ArtifactCopyMenu>
          {showNotion && (
            <ArtifactCopyMenuItem
              artifactId={artifactId}
              artifactType={type}
              data={data}
              outputType="markdown"
            >
              <IconNotion className="size-4" />
              Copy to Notion
            </ArtifactCopyMenuItem>
          )}
          {showCopy && (
            <ArtifactCopyMenuItem
              artifactId={artifactId}
              artifactType={type}
              data={data}
              outputType="html"
            />
          )}
          {showCopyImage && (
            <ArtifactCopyMenuItem
              artifactId={artifactId}
              artifactType={type}
              data={data}
              outputType="image"
            />
          )}
        </ArtifactCopyMenu>
        {showShare && <ArtifactShare artifactId={artifactId} type={type} />}
      </div>
    </ArtifactCompletionStatusGuard>
  )
}
