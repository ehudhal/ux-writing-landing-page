'use client'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Wireframe } from '@/lib/chat/schemas/wireframe-schema'
import { cn } from '@/lib/utils'
import { TooltipPortal } from '@radix-ui/react-tooltip'
import { motion } from 'framer-motion'
import { Monitor } from 'lucide-react'
import { ReactNode, useRef, useState } from 'react'
import { BackToChatButton } from '../permanent-chat/chat/back-to-chat-button'
import { containerVariants, itemVariants } from './animation-variants'

interface WireframeViewProps {
  wireframeId: string
  wireframe: Wireframe
  children?: ReactNode
  fullHeight?: boolean
  showBackToChat?: boolean
  shareToken?: string
}

export default function WireframeView({
  wireframeId,
  wireframe,
  children,
  fullHeight = false,
  showBackToChat = true,
  shareToken
}: WireframeViewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState<number | null>(null)

  const wireframeUrl = `/wireframe/${wireframeId}${
    shareToken ? `?shareToken=${shareToken}` : ''
  }`

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`mx-auto flex w-full  flex-col gap-4 overflow-y-auto p-8`}
    >
      <motion.div
        variants={itemVariants}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <h1 className="flex items-center gap-2 font-serif text-xl font-medium ">
          {showBackToChat && <BackToChatButton />}
          {wireframe.name || 'Wireframe'}
        </h1>
        {children}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={cn(
          'rounded-lg border overflow-hidden border-[#F0F0EF] bg-[#F9F9FB] relative'
        )}
      >
        {wireframe.productScreenName && (
          <Tooltip>
            <TooltipTrigger
              asChild
              className="absolute top-3 left-4 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-normal text-offblack border border-gray-200 flex items-center gap-1"
            >
              <motion.span className="flex items-center gap-1">
                <Monitor className="size-3" strokeWidth={1}></Monitor>
                {wireframe.productScreenName}
              </motion.span>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent>
                <p className="text-xs ">
                  Based on your product screen <br />
                </p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        )}
        <motion.iframe
          ref={iframeRef}
          className={cn(
            'w-full border-none bg-[#F9F9FB]',
            !fullHeight && 'min-h-[60vh] md:min-h-[80vh]'
          )}
          animate={{ height: iframeHeight || 'auto' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          title="Wireframe Preview"
          src={wireframeUrl}
          onLoad={() => {
            if (!fullHeight) return
            setTimeout(() => {
              try {
                const iframe = iframeRef.current
                if (!iframe) {
                  return
                }

                const doc =
                  iframe.contentDocument || iframe.contentWindow?.document
                if (doc) {
                  const documentHeight = doc.documentElement.scrollHeight
                  const bodyHeight = doc.body.scrollHeight
                  const height = Math.max(documentHeight, bodyHeight)
                  setIframeHeight(height)
                }
              } catch (e) {
                console.error('Error adjusting iframe height:', e)
              }
            }, 500)
          }}
        />
      </motion.div>
    </motion.div>
  )
}
