import { Message } from 'ai'
import { ImageWithPreviewDialog } from '../image-with-preview-dialog'

export function ChatMessageAttachment({
  attachment
}: {
  attachment: NonNullable<Message['experimental_attachments']>[number]
}) {
  if (!attachment.name) {
    return null
  }

  return (
    <ImageWithPreviewDialog
      id={attachment.name}
      image={
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={attachment.url} alt={attachment.name} />
        </div>
      }
    />
  )
}
