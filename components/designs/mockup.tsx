'use client'

import { ScreenStatusType } from '@/lib/db-schema/screen-instances'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { CSSProperties, memo, useEffect, useRef, useState } from 'react'
import MockupLoader from '../loaders/mockup-loader'

function Mockup({
  designId,
  screenInstanceId,
  className,
  onPostedFeedback,
  onStateChange,
  thumbnail,
  readOnly = false,
  allowComments = false
}: {
  designId?: string
  screenInstanceId: string
  onPostedFeedback?: (content: string) => void
  onStateChange?: (state: ScreenStatusType) => void
  className?: string
  allowComments?: boolean
  thumbnail?: boolean
  readOnly?: boolean
}) {
  const [loading, setLoading] = useState(true)

  const ref = useRef<HTMLIFrameElement>(null)
  const style = thumbnail
    ? {
        width: 902,
        height: 550,
        transform: 'scale(0.2)'
      }
    : {}

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // event origin needs to be the same as the origin of the current page
      if (event.origin !== window.location.origin) {
        return // Ignore messages from unknown sources for security
      }

      if (event.data.type === 'submit-status-update') {
        if (event.data.payload.screenInstanceId === screenInstanceId) {
          if (onStateChange) {
            onStateChange(event.data.payload.status)
          }
        }
      }

      if (event.data.type === 'post-feedback') {
        if (onPostedFeedback) {
          onPostedFeedback(event.data.payload.message)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    // Clean up
    return () => {
      window.removeEventListener('message', handleMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [designId, onStateChange, screenInstanceId])

  // Send the allowComments state to the iframe based on prop change
  useEffect(() => {
    if (ref.current && ref.current.contentWindow) {
      ref.current.contentWindow.postMessage(
        {
          type: 'change-allow-comments',
          payload: allowComments
        },
        window.location.origin
      )
    }
  }, [ref, allowComments])

  const queryParams = new URLSearchParams({
    readOnly: readOnly.toString()
  }).toString()

  return (
    <>
      <MockupLoader
        loading={loading}
        className={className}
        thumbnail={thumbnail}
        style={style as CSSProperties}
      />
      <motion.iframe
        id="wireframe"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        hidden={loading}
        ref={ref}
        className={cn(
          'size-full flex-1 origin-top-left overflow-auto',
          className,
          !thumbnail && 'min-w-[320px]'
        )}
        style={style as CSSProperties}
        seamless
        key={screenInstanceId}
        src={`/mockup/${screenInstanceId}?${queryParams}`}
        onLoad={() => {
          setLoading(false)
        }}
      />
    </>
  )
}

export default memo(Mockup)
