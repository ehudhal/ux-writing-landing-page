import { cn } from '@/lib/utils'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import DotPattern from './ui/dot-pattern'
import VisuallyHidden from './ui/visually-hidden'

export const ImageWithPreviewDialog = ({
  id,
  image
}: {
  id: string
  image: React.ReactNode
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            'flex h-32 w-32 items-center cursor-pointer justify-center rounded-lg bg-gray-100 border border-gray-200 opacity-100 transition-opacity overflow-hidden'
          )}
          key={id}
        >
          <div className="relative size-full flex items-center justify-center ">
            <div className="object-contain object-center mx-2 my-2 max-h-[calc(100%-1rem)] z-20 rounded-md overflow-hidden drop-shadow-xl">
              {image}
            </div>
            <DotPattern
              className="absolute inset-0 opacity-15 "
              width={8}
              height={8}
            />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent
        forceMount
        className={cn(
          'max-w-4xl p-0 max-h-[90vh] min-h-[30vh] flex flex-col overflow-hidden shadow-none'
        )}
      >
        <VisuallyHidden>
          <DialogTitle>Screenshot</DialogTitle>
          <DialogDescription>Screenshot</DialogDescription>
        </VisuallyHidden>
        <div className=" size-full flex-1 overflow-auto bg-gray-50">
          <div className="relative min-h-[30vh] size-full flex items-center justify-center">
            <div
              className="object-contain object-center mx-8 my-8 max-h-[calc(100%-1rem)] rounded-xl overflow-hidden 
             z-20 shadow-2xl shadow-accent-foreground/10 border "
            >
              {image}
            </div>
          </div>
          <DotPattern className="absolute inset-0 opacity-25 size-full" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
