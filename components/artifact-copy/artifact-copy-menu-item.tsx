'use client'

import { ArtifactType } from '@/lib/db-schema/artifacts'
import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard'
import { ArtifactData, ArtifactOutputType } from '@/lib/types/artifact-data'
import { getArtifactOutput } from '@/lib/utils/get-artifact-output'
import { CopyIcon, Loader2 } from 'lucide-react'
import { marked } from 'marked'
import { useState } from 'react'
import { toast } from 'sonner'
import { DropdownMenuItem } from '../ui/dropdown-menu'

type ArtifactCopyMenuItemProps<T extends ArtifactType> = {
  artifactId: string
  outputType: ArtifactOutputType
  artifactType: T
  data: ArtifactData[T]
  children?: React.ReactNode
}

export function ArtifactCopyMenuItem<T extends ArtifactType>({
  outputType,
  artifactId,
  artifactType: type,
  data,
  children
}: ArtifactCopyMenuItemProps<T>) {
  const [isCopying, setIsCopying] = useState(false)
  const {
    copyToClipboard,
    copyToClipboardWithFormatting,
    copyImageToClipboard,
    error
  } = useCopyToClipboard()

  const handleCopy = async () => {
    setIsCopying(true)
    try {
      const artifactOutputContent = await getArtifactOutput(
        outputType,
        type,
        data,
        artifactId
      )

      if (outputType === 'image') {
        if (!(artifactOutputContent instanceof Blob)) {
          throw new Error('Expected image blob')
        }
        copyImageToClipboard(artifactOutputContent)
      } else {
        if (typeof artifactOutputContent !== 'string') {
          throw new Error('Expected string content')
        }
        if (outputType === 'markdown') {
          copyToClipboard(artifactOutputContent)
        } else {
          const htmlContent = await marked(artifactOutputContent)
          copyToClipboardWithFormatting(htmlContent, artifactOutputContent)
        }
      }

      // this error is from the clipboard api failure
      if (error) {
        console.error('Error copying to clipboard', error)
        toast.error('Error copying to clipboard')
      } else {
        toast.success('Content copied to clipboard')
      }
    } catch (err) {
      console.error('Error copying to clipboard', err)
      toast.error('Error copying to clipboard')
    } finally {
      setIsCopying(false)
    }
  }

  return (
    <DropdownMenuItem
      className="h-8 gap-3 text-xs px-3 py-4 rounded-none flex justify-start items-center cursor-pointer"
      onClick={e => {
        e.stopPropagation()
        handleCopy()
      }}
      disabled={isCopying}
    >
      {children ?? (
        <>
          {isCopying ? (
            <Loader2 className="size-3 animate-spin" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          Copy to clipboard
        </>
      )}
    </DropdownMenuItem>
  )
}
