import { ArtifactType, GenerationStatus } from '@/lib/db-schema/artifacts'
import { useArtifactGenerationStatus } from '@/lib/hooks/use-artifact-status'
import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard'
import { ArtifactData } from '@/lib/types/artifact-data'
import { cn } from '@/lib/utils'
import { getArtifactOutput } from '@/lib/utils/get-artifact-output'
import { Copy, Download, Expand, Loader } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

export default function BriefViewArtifactActions({
  children,
  artifact,
  artifactType,
  artifactId,
  artifactTitle,
  className,
  dialogContentClassName
}: {
  children: React.ReactNode
  artifact: ArtifactData[keyof ArtifactData]
  artifactType: ArtifactType
  artifactId: string
  artifactTitle?: string
  className?: string
  dialogContentClassName?: string
}) {
  const status = useArtifactGenerationStatus(artifactId)
  const [open, setOpen] = useState(false)
  const { copyImageToClipboard, error } = useCopyToClipboard()
  const [pendingCopy, startCopyTransition] = useTransition()
  const [pendingDownload, startDownloadTransition] = useTransition()

  const handleCopy = async () => {
    startCopyTransition(async () => {
      try {
        const artifactOutputContent = await getArtifactOutput(
          'image',
          artifactType,
          artifact,
          artifactId
        )

        if (!(artifactOutputContent instanceof Blob)) {
          throw new Error('Expected image blob')
        }
        copyImageToClipboard(artifactOutputContent)

        if (error) {
          console.error('Error copying to clipboard', error)
          toast.error('Error copying to clipboard')
        } else {
          toast.success(`Copied to clipboard.`)
        }
      } catch (err) {
        console.error('Error copying to clipboard', err)
        toast.error('Error copying to clipboard')
      }
    })
  }

  const handleDownload = async () => {
    startDownloadTransition(async () => {
      try {
        const artifactOutputContent = await getArtifactOutput(
          'image',
          artifactType,
          artifact,
          artifactId
        )

        if (!(artifactOutputContent instanceof Blob)) {
          throw new Error('Expected image blob')
        }

        const url = URL.createObjectURL(artifactOutputContent)
        const a = document.createElement('a')
        a.href = url
        a.download = `${getArtifactUserfacingTitle(artifactType, artifactTitle)}.png`
        a.click()
        URL.revokeObjectURL(url)
        toast.success(
          `${getArtifactUserfacingTitle(artifactType, artifactTitle)} downloaded.`
        )
      } catch (err) {
        console.error(`Error downloading ${artifactType.toLowerCase()}`, err)
        toast.error(`Error downloading ${artifactType.toLowerCase()}`)
      }
    })
  }

  return (
    <div className="relative group">
      <div className={cn('absolute top-0 right-0 flex gap-1', className)}>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300',
            status !== GenerationStatus.COMPLETED &&
              'opacity-0! pointer-events-none'
          )}
          onClick={handleDownload}
          disabled={pendingDownload}
        >
          {pendingDownload ? (
            <Loader className="size-3 animate-spin" />
          ) : (
            <Download className="size-3" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300',
            status !== GenerationStatus.COMPLETED &&
              'opacity-0! pointer-events-none'
          )}
          onClick={handleCopy}
          disabled={pendingCopy}
        >
          {pendingCopy ? (
            <Loader className="size-3 animate-spin" />
          ) : (
            <Copy className="size-3" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300"
          onClick={() => setOpen(true)}
        >
          <Expand className="size-3" />
        </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className={cn(
            'max-w-screen-lg max-h-[90vh] overflow-y-auto px-8',
            dialogContentClassName
          )}
        >
          <DialogHeader>
            <DialogTitle className="sr-only">{artifactType}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
      {children}
    </div>
  )
}

const getArtifactUserfacingTitle = (
  artifactType: ArtifactType,
  artifactTitle?: string
) => {
  return artifactTitle
    ? `${artifactTitle} ${artifactType.toLowerCase()}`
    : `${artifactType.toLowerCase()} - ${new Date().toLocaleDateString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }
      )}`
}
