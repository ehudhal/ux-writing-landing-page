'use client'

import { regenerateShareToken } from '@/lib/actions/artifact-actions'
import { getArtifactKey } from '@/lib/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
interface ArtifactShareRegenerateButtonProps {
  artifactId: string
}

export function ArtifactShareRegenerateButton({
  artifactId
}: ArtifactShareRegenerateButtonProps) {
  const [regeneratePending, startRegenerateTransition] = useTransition()
  const router = useRouter()
  const queryClient = useQueryClient()
  const handleRegenerateShare = () => {
    startRegenerateTransition(async () => {
      const result = await regenerateShareToken(artifactId)
      if ('error' in result) {
        toast.error(result.error)
        return
      }
      toast.success('Link regenerated')
      queryClient.invalidateQueries({
        queryKey: getArtifactKey(artifactId)
      })
      router.refresh()
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={regeneratePending}
          className="flex items-center gap-2 transition-all"
        >
          {regeneratePending ? (
            <>
              <Loader2 className="size-3 animate-spin" />
              <span>Regenerating...</span>
            </>
          ) : (
            <>
              <RefreshCcw className="size-4" />
              <span>Regenerate link</span>
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Regenerate share link</AlertDialogTitle>
          <AlertDialogDescription>
            This will create a new share link. Anyone with the current link will
            no longer be able to access this artifact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRegenerateShare}>
            Regenerate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
