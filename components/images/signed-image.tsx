'use client'

import * as Sentry from '@sentry/nextjs'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Loader2, OctagonX } from 'lucide-react'
import { useEffect, useState } from 'react'

type ImageElementProps = {} & Omit<
  React.HTMLProps<HTMLImageElement>,
  | 'onAnimationStart'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDrag'
  | 'onDragEnter'
  | 'onDragExit'
  | 'onDragLeave'
  | 'onDragOver'
  | 'onDrop'
  | 'onLoad'
  | 'onError'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStart'
  | 'onTransitionEnd'
  | 'onTransitionStart'
>

export const SignedImage = (
  props: ImageElementProps & {
    src: string
    imageLoadingErrorText?: string
    shouldRefetch?: boolean
    shouldLogFetchError?: boolean
  }
) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dangerouslySetInnerHTML,
    imageLoadingErrorText,
    shouldRefetch = false,
    shouldLogFetchError = true,
    ...rest
  } = props

  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const fetchSignedURL = async (filename: string) => {
    const res = await fetch(`/api/images?filename=${filename}&bucket=artifacts`)
    if (!res.ok) {
      throw new Error(
        `Failed to fetch signed URL: ${res.status} ${res.statusText}`
      )
    }
    const data = (await res.json()) as { url: string }
    return data
  }

  const { data, error, isLoading, isRefetching } = useQuery({
    queryKey: [`/api/images?filename=${props.src}`, shouldRefetch],
    queryFn: () => fetchSignedURL(props.src),
    retry: shouldRefetch ? 10 : 1,
    retryDelay: 5000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    staleTime: 0
  })

  useEffect(() => {
    if (error && shouldLogFetchError) {
      //Use Sentry to capture error with additional context, as we cannot acheive this with console.error
      Sentry.captureException(new Error('Image API load error'), {
        extra: {
          src: props.src,
          originalError: error,
          originalMessage: error.message
        }
      })
    }
  }, [error, props.src, shouldLogFetchError])

  if (isRefetching || isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Loader2 className="animate-spin stroke-primary/25" strokeWidth={1} />
      </div>
    )
  }

  if (error || imageError) {
    return (
      <div className="flex size-full flex-col items-center justify-center">
        <div className="flex size-full items-center justify-center">
          <OctagonX strokeWidth={1} className="stroke-primary/50" />
        </div>
        {imageLoadingErrorText && (
          <p className="pt-2 text-sm text-primary/50">
            {imageLoadingErrorText}
          </p>
        )}
      </div>
    )
  }

  return (
    <motion.img
      initial={{ opacity: 0 }}
      animate={{ opacity: imageLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      {...rest}
      src={data?.url}
      onError={() => {
        Sentry.captureException(new Error('Image load error'), {
          extra: {
            src: props.src,
            signedURL: data?.url
          }
        })

        setImageError(true)
      }}
      onLoad={() => setImageLoaded(true)}
    />
  )
}
