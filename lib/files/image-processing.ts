import { openai } from '@/lib/ai'
import { uploadFile } from '@/lib/files/file-upload'
import { createFileKeyForScreenshot } from '@/lib/files/file-utils'
import { generateText, ImagePart } from 'ai'
import { FileElement } from 'slack-edge'

export async function generateImageDescriptionFromBuffer(
  file: Pick<FileElement, 'id' | 'mimetype'>,
  arrayBuffer: ArrayBuffer
) {
  console.time(`File ${file.id} - Generate description from buffer`)
  const result = await generateImageDescription(arrayBuffer, file.mimetype)

  console.timeEnd(`File ${file.id} - Generate description from buffer`)
  return result
}

export async function generateImageDescriptionFromURL(
  file: Pick<FileElement, 'id' | 'mimetype'>,
  url: string
) {
  console.time(`File ${file.id} - Generate description from URL`)
  const result = await generateImageDescription(url, file.mimetype)

  console.timeEnd(`File ${file.id} - Generate description from URL`)
  return result
}

async function generateImageDescription(
  image: ImagePart['image'],
  mimeType: string
) {
  const result = await generateText({
    model: openai('gpt-4o'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'This is an image of a screen. Describe the layout and UI elements and their main visual traits, that you see in the screen.'
          },
          {
            type: 'image',
            mimeType,
            image
          }
        ]
      }
    ]
  })
  return result
}

export async function uploadImageToStorage(
  file: Pick<FileElement, 'id' | 'mimetype'>,
  blob: Blob
) {
  console.time(`File ${file.id} - Upload image`)
  const result = await uploadFile(blob, {
    Key: createFileKeyForScreenshot(file.id!, file.mimetype.split('/')[1]),
    ContentType: file.mimetype,
    Bucket: 'artifacts'
  })
  console.timeEnd(`File ${file.id} - Upload image`)

  if (!result.ok) {
    console.warn('Web file upload handler - failed to upload image', {
      id: file.id,
      status: result.status,
      statusText: result.statusText
    })

    throw new Error('Failed to upload image')
  }

  return result
}
