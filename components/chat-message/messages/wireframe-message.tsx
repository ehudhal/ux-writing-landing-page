import { SignedImage } from '@/components/images/signed-image'
import { useDisplayColumnParam } from '@/components/permanent-chat/display/use-display-column-param'
import DotPattern from '@/components/ui/dot-pattern'
import { Tool } from '@/lib/chat/tools/tool-types'
import { ArtifactType, GenerationStatus } from '@/lib/db-schema/artifacts'
import { createFileKeyForWireframe } from '@/lib/files/file-utils'
import { useArtifactGenerationStatus } from '@/lib/hooks/use-artifact-status'
import { WithoutError } from '@/lib/types'
import { cn } from '@/lib/utils'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'

type WireframeContent = NonNullable<
  WithoutError<Tool<'generateWireframe'>['result']>
>

export function WireframeMessage({
  messageContent
}: {
  messageContent: string
}) {
  return parseMessageContent<WireframeContent>(
    messageContent,
    ({ wireframeId, name }) => (
      <WireframeMessageItem wireframeId={wireframeId} name={name} />
    )
  )
}

function WireframeMessageItem({
  name,
  wireframeId
}: {
  wireframeId: string
  name: string
}) {
  const artifactStatus = useArtifactGenerationStatus(wireframeId)
  const { setDisplayParam, displayParam } = useDisplayColumnParam()
  const isActive = displayParam === wireframeId

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        onClick={() => setDisplayParam(ArtifactType.WIREFRAME, wireframeId)}
        className="block w-full"
      >
        <div
          className={cn(
            'relative flex max-h-[250px] min-h-[180px] w-full items-center justify-center overflow-hidden rounded-lg border border-gray-200 object-contain bg-[#F9F9FB] transition-all duration-300',
            {
              'border-offblack': isActive
            }
          )}
        >
          <AnimatePresence mode="wait">
            {artifactStatus !== GenerationStatus.GENERATING ? (
              <SignedImage
                src={createFileKeyForWireframe(wireframeId)}
                key={wireframeId}
                className="bg-[#F9F9FB] object-contain p-1 m-4 rounded-lg shadow-2xl shadow-accent-foreground/20 border max-h-[180px] z-20 max-w-[90%]"
                imageLoadingErrorText="No preview available"
                shouldRefetch={!artifactStatus}
                shouldLogFetchError={
                  artifactStatus !== GenerationStatus.CAPTURE_FAILED
                }
              />
            ) : (
              <motion.p
                {...fadeInOut}
                className="text-center text-xs  animate-pulse flex items-center gap-1"
              >
                <Check className="w-4 h-4" strokeWidth={1} />
                Wireframe is ready. Generating preview...
              </motion.p>
            )}
          </AnimatePresence>
          <DotPattern
            className="absolute inset-0 opacity-15"
            width={8}
            height={8}
          />
        </div>
      </button>

      <p className="text-center text-xs text-gray-500 mb-4">{name}</p>
    </div>
  )
}

const fadeInOut = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}
