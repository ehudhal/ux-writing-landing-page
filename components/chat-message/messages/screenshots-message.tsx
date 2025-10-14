import { createFileKeyForScreenshot } from '@/lib/files/file-utils'
import { ImagesScreenshotsContent } from '@/lib/types/images-screenshots'
import { parseMessageContent } from '@/lib/utils/parse-message-content'
import { ImageWithPreviewDialog } from '../../image-with-preview-dialog'
import { SignedImage } from '../../images/signed-image'

export function ScreenshotsMessage({
  messageContent
}: {
  messageContent: string
}) {
  return parseMessageContent<ImagesScreenshotsContent>(
    messageContent,
    screenshots => {
      const imagesWithFileKey = screenshots.imagesProcessedResult.map(
        screenshot => ({
          imageId: screenshot.imageId,
          url: createFileKeyForScreenshot(
            screenshot.imageId,
            screenshot.imageType ?? 'jpeg'
          )
        })
      )
      return (
        <div className="flex flex-wrap gap-2">
          {imagesWithFileKey.map(({ imageId, url }) => (
            <ImageWithPreviewDialog
              key={imageId}
              id={imageId}
              image={<SignedImage src={url} />}
            />
          ))}
        </div>
      )
    }
  )
}
