import { useTransition } from 'react'

import { removeShareToken } from '@/lib/actions/artifact-actions'
import { getArtifactKey } from '@/lib/query-keys'
import { useQueryClient } from '@tanstack/react-query'
import { Link2Off, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
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
interface ArtifactShareRemoveButtonProps {
  artifactId: string
}

export function ArtifactShareRemoveButton({
  artifactId
}: ArtifactShareRemoveButtonProps) {
  const queryClient = useQueryClient()
  const [removePending, startRemoveTransition] = useTransition()
  const router = useRouter()

  const handleRemoveShare = () => {
    startRemoveTransition(async () => {
      const result = await removeShareToken(artifactId)
      if (result && 'error' in result) {
        toast.error(result.error)
        return
      }
      toast.success('Link removed')
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
          disabled={removePending}
          className="flex items-center gap-2 transition-all"
        >
          {removePending ? (
            <>
              <Loader2 className="size-3 animate-spin" />
              <span>Removing...</span>
            </>
          ) : (
            <>
              <Link2Off className="size-4" />
              <span>Remove link</span>
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove share link</AlertDialogTitle>
          <AlertDialogDescription>
            This will remove the public share link. Anyone with the current link
            will no longer be able to access this artifact.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveShare}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
