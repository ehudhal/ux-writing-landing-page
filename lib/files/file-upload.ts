import { CopyObjectCommand } from '@aws-sdk/client-s3'
import {
  PresignedPostOptions,
  createPresignedPost
} from '@aws-sdk/s3-presigned-post'
import { ERROR_CONSTANTS } from '../constants/error-constants'
import { AllowedBuckets, getS3Client } from '../external-services/aws'
import { MAX_FILE_SIZE } from './file-constraints'

type UploadFileOptions = PresignedPostOptions & {
  Bucket: AllowedBuckets
  ContentType?: string
}

export async function uploadFile(file: Blob, options: UploadFileOptions) {
  const { client, buckets } = getS3Client()
  const { url: postURL, fields } = await createPresignedPost(client, {
    Bucket: buckets[options.Bucket],
    Key: options.Key,
    Conditions: options.Conditions
      ? [
          ['content-length-range', 0, MAX_FILE_SIZE], // up to 10 MB
          ...options.Conditions
        ]
      : [
          ['content-length-range', 0, MAX_FILE_SIZE] // up to 10 MB
        ],
    Fields: {
      'Content-Type': options.ContentType || 'image/png',
      ...options.Fields
    },
    Expires: options.Expires ?? 60 // Seconds before the presigned post expires. 3600 by default.
  })

  const formData = new FormData()
  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as string)
  })
  formData.append('file', file)

  return await fetch(postURL, {
    method: 'POST',
    body: formData
  })
}

export async function copyFile(
  oldKey: string,
  newKey: string,
  bucket: AllowedBuckets
) {
  try {
    const { client, buckets } = getS3Client()
    const params = {
      Bucket: buckets[bucket],
      CopySource: `${buckets[bucket]}/${oldKey}`,
      Key: newKey
    }

    const command = new CopyObjectCommand(params)
    await client.send(command)
  } catch (e) {
    const error = e as Error
    console.error(error.message)
    return {
      error: ERROR_CONSTANTS.GENERIC
    }
  }
}
