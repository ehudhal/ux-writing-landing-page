'use client'

import { cn } from '@/lib/utils'

import getFigmaDataFromHTML from '@/lib/actions/get-figma-data-for-html'
import { useState } from 'react'
import { toast } from 'sonner'
import { IconFigma } from '../ui/icons'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function CopyToFigmaButton() {
  const [canCopy, setCanCopy] = useState(true)
  let toastId: string | number | undefined
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          disabled={!canCopy}
          onClick={async () => {
            setCanCopy(false)
            try {
              const iframe = document.getElementById('wireframe')
              const iframeDocument = (iframe as HTMLIFrameElement)
                ?.contentDocument
              const designContent =
                iframeDocument?.getElementById('wireframe-content')
              const designContentHTML = designContent?.outerHTML

              if (!designContentHTML) {
                toast.error('Could not copy to clipboard')
                return
              }

              //the reason we are doing this is because we are using the tailwind in all the generated html and we need to ensure it will be used in the figma transformation
              //we cannot use our tailwind.js as it is not accessible to the api being a relative path
              const inputHTMLData = `<body><script src="https://chordio.com/css/tailwind.js" data-nscript="afterInteractive"></script>${designContentHTML}</body>`

              toastId = toast.loading('Copying to clipboard…', {
                duration: 20000
              })
              const clipboardData = await getFigmaDataFromHTML(inputHTMLData)

              if (clipboardData) {
                await navigator.clipboard.write([
                  new ClipboardItem({
                    'text/html': new Blob([clipboardData], {
                      type: 'text/html'
                    })
                  })
                ])
                toast.dismiss(toastId)
                toast.success('Copied. You can now paste into a Figma page.')
              }
            } catch (error) {
              console.error(error)
              if (toastId) {
                toast.dismiss(toastId)
              }
              toast.error('Could not copy to clipboard')
            } finally {
              setCanCopy(true)
            }
          }}
          className={cn(
            `h-full rounded-md border p-2 px-4 text-sm transition-colors hover:bg-gray-200`,
            { 'bg-gray-100': !canCopy }
          )}
        >
          <IconFigma className="size-3" strokeWidth={1} />
        </button>
      </TooltipTrigger>
      <TooltipContent usePortal>
        Copy to clipboard. Paste in Figma.
      </TooltipContent>
    </Tooltip>
  )
}
