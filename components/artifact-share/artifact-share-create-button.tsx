'use client'

import { createShareToken } from '@/lib/actions/artifact-actions'
import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard'
import { getArtifactKey } from '@/lib/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { Link, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
interface ArtifactShareCreateButtonProps {
  artifactId: string
}

export function ArtifactShareCreateButton({
  artifactId
}: ArtifactShareCreateButtonProps) {
  const queryClient = useQueryClient()
  const [sharePending, startShareTransition] = useTransition()
  const router = useRouter()
  const { copyToClipboard } = useCopyToClipboard()

  const handleShare = () => {
    startShareTransition(async () => {
      const result = await createShareToken(artifactId)
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      const shareLink =
        window.location.origin + '/artifacts/' + result.shareToken

      copyToClipboard(shareLink)
      toast.success('Link created and copied to clipboard')
      queryClient.invalidateQueries({
        queryKey: getArtifactKey(artifactId)
      })
      router.refresh()
    })
  }

  return (
    <Button
      disabled={sharePending}
      onClick={handleShare}
      className="flex items-center gap-2 transition-all"
    >
      {sharePending ? (
        <>
          <Loader2 className="size-3 animate-spin" />
          <span>Creating...</span>
        </>
      ) : (
        <>
          <Link className="size-4" />
          <span>Create a public share link</span>
        </>
      )}
    </Button>
  )
}
