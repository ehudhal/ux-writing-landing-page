import Image from 'next/image'
import { generateSignedUrl } from '@/lib/files/files-sign'
import { createFileKeyForProductScreenshot } from '@/lib/files/file-utils'

interface ProductScreenshotProps {
  screenId: string
}

export default async function ProductScreenshot({
  screenId
}: ProductScreenshotProps) {
  const signedUrl = await generateSignedUrl(
    createFileKeyForProductScreenshot(screenId),
    'userImages'
  )

  return (
    <div className="relative flex h-full min-w-0 overflow-hidden">
      <Image
        src={signedUrl}
        alt="screen"
        className="size-full rounded-md border object-contain"
        fill={true}
      />
    </div>
  )
}
