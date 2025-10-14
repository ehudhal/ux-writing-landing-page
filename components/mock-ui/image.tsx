import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { z } from 'zod'
import { Skeleton } from '../ui/skeleton'
const MotionSkeleton = motion.create(Skeleton)

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
export function ImageElement(props: ImageElementProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { children, dangerouslySetInnerHTML, src, ...rest } = props
  if (!src) return <></>

  // Check if the src is a valid URL
  const { success: isValidSrc } = z.string().url().safeParse(src)

  // Indicates if the image should be signed
  const shouldBeSigned = 'data-img-replace' in rest

  // Valid src and should be rendered as a regular image not a signed image.
  if (shouldBeSigned && !isValidSrc) {
    return <SignedImage {...rest} src={src} />
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img {...rest} src={src} />
  )
}

const SignedImage = (props: ImageElementProps & { src: string }) => {
  const [pending, setPending] = useState(true)
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    children,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dangerouslySetInnerHTML,

    ...rest
  } = props

  const fetchSignedURL = async (filename: string) => {
    const res = await fetch('/api/images?filename=' + filename)
    const data = (await res.json()) as { url: string }
    return data
  }

  const { data, error } = useQuery({
    queryKey: [`/api/images?filename=${props.src}`],
    queryFn: () => fetchSignedURL(props.src)
  })

  if (error) return <p className="p-4">Failed to load image</p>

  return (
    <>
      <MotionSkeleton
        hidden={!pending}
        initial={{ opacity: 1 }}
        animate={{ opacity: pending ? 1 : 0 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'relative',
          width: props['width'],
          height: props['height'] ?? 'auto'
        }}
      />
      <motion.img
        hidden={pending}
        initial={{ opacity: 0 }}
        animate={{ opacity: pending ? 0 : 1 }}
        exit={{ opacity: 0 }}
        {...rest}
        src={data?.url}
        onLoad={() => setPending(false)}
      />
    </>
  )
}
