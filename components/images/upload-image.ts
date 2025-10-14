import { getUploadFileURL } from '@/lib/actions/user-files-actions'
import { isValidError } from '@/lib/errors'
import { AllowedBuckets } from '@/lib/external-services/aws'
import { assertAllowedMimeType } from '@/lib/files/filename'
type Options = {
  url: string
  bucket?: AllowedBuckets
}
//**
/* Uploads an image to S3 from the client side.
 */
export const uploadImage = async (file: File, options: Options) => {
  try {
    const mimeType = assertAllowedMimeType(file.type)
    const uploadUrl = await getUploadFileURL(
      mimeType,
      options?.bucket ?? 'userImages',
      options.url
    )
    if (uploadUrl && 'error' in uploadUrl) {
      throw new Error(uploadUrl.error)
    }
    const { url, fields, fileNameKey, fullUrl } = uploadUrl
    const formData = new FormData()
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string)
    })
    formData.append('file', file)

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })

    if (!uploadResponse.ok) {
      throw new Error('Error uploading image')
    }

    return {
      fileNameKey,
      fullUrl
    }
  } catch (e) {
    const error = e as Error
    console.error(error)
    const message = isValidError(error.message)
      ? error.message
      : 'Error uploading file'
    return {
      error: message
    }
  }
}
