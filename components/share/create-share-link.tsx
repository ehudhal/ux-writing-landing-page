import { CircleHelp } from 'lucide-react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function CreateShareLink({
  onCreateShareLink
}: {
  onCreateShareLink: () => void
}) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Label htmlFor="create-share-link" className="flex items-center gap-1">
          {`Public share link`}
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleHelp className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Anyone with the link will be able to view this design</p>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div>
          <Button
            size="sm"
            className="mt-1"
            onClick={onCreateShareLink}
            id="create-share-link"
          >
            Create link
          </Button>
        </div>
      </div>
    </>
  )
}
