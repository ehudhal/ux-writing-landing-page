'use client'

import { ArtifactType } from '@/lib/db-schema/artifacts'
import useCopyToClipboard from '@/lib/hooks/use-copy-to-clipboard'
import { artifactTypeToName } from '@/lib/types/artifact-data'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import {
  CopyCheck,
  CopyIcon,
  LinkIcon,
  LockIcon,
  ShareIcon
} from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog'
import { ArtifactShareCreateButton } from './artifact-share-create-button'
import { ArtifactShareRegenerateButton } from './artifact-share-regenerate-button'
import { ArtifactShareRemoveButton } from './artifact-share-remove-button'

type ArtifactShareButtonProps = {
  artifactId: string
  shareToken: string | null
  type: ArtifactType
}

export function ArtifactShareButton({
  artifactId,
  shareToken,
  type
}: ArtifactShareButtonProps) {
  const [bodyRef] = useAutoAnimate()
  const [urlRef] = useAutoAnimate()
  const [copyButtonRef] = useAutoAnimate()
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const shareLink = window.location.origin + '/artifacts/' + shareToken

  const artifactName = artifactTypeToName[type]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="h-8 gap-2 rounded-md text-xs">
          <ShareIcon className="size-3" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share {artifactName}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Sharing this {artifactName} will make it publicly accessible online,
          while your chat will remain private.
        </DialogDescription>
        <div ref={bodyRef}>
          {!shareToken && (
            <div className="my-2 flex items-center gap-4 rounded-lg border p-4">
              <div className="flex size-10 items-center justify-center rounded-full border border-gray-200">
                <LockIcon className="size-4" />
              </div>
              <div>
                <h4 className="text-sm font-medium">Private</h4>
                <p className="text-sm text-gray-500">
                  Only you can see this {artifactName}.
                </p>
              </div>
            </div>
          )}
          {shareToken && (
            <div className="flex flex-col overflow-hidden rounded-lg border">
              <div className=" my-2 flex items-center gap-4 p-4 ">
                <div className="flex size-10 items-center justify-center rounded-full border border-gray-200">
                  <LinkIcon className="size-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Public</h4>
                  <p className="text-sm text-gray-500">
                    Anyone with link can see this {artifactName}.
                  </p>
                </div>
              </div>
              <div>
                <div className=" flex w-full items-center gap-2  border-t bg-background-gray p-2">
                  <div className="flex-1" ref={urlRef}>
                    <span key={shareLink} className="line-clamp-1 px-2 text-sm">
                      {shareLink}
                    </span>
                  </div>
                  <Button
                    ref={copyButtonRef}
                    variant="ghost"
                    className="aspect-square rounded-md p-0"
                    onClick={() => {
                      copyToClipboard(shareLink)
                      toast.success('Link copied to clipboard')
                    }}
                  >
                    {isCopied ? (
                      <CopyCheck className="size-3" />
                    ) : (
                      <CopyIcon className="size-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          {shareToken && (
            <>
              <ArtifactShareRegenerateButton artifactId={artifactId} />
              <ArtifactShareRemoveButton artifactId={artifactId} />
            </>
          )}
          {!shareToken && <ArtifactShareCreateButton artifactId={artifactId} />}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
