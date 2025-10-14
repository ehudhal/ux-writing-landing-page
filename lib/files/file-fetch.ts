import { GetObjectCommand } from '@aws-sdk/client-s3'
import { AllowedBuckets, getS3Client } from '../external-services/aws'

/**
 * Fetches a file from S3 and returns it as a array buffer
 */
export async function fetchFileBuffer(
  key: string,
  bucketName: AllowedBuckets
): Promise<Uint8Array> {
  const { client, buckets } = getS3Client()

  try {
    const response = await client.send(
      new GetObjectCommand({
        Bucket: buckets[bucketName],
        Key: key
      })
    )

    // Convert the readable stream to a blob
    if (!response.Body) {
      throw new Error('No body returned from S3')
    }

    const arrayBuffer = await response.Body.transformToByteArray()
    return arrayBuffer
  } catch (error) {
    // If the file doesn't exist, S3 returns a NoSuchKey error
    if ((error as any)?.name === 'NoSuchKey') {
      throw new Error(`File not found: ${key}`)
    }
    console.error('Error fetching file from S3:', error)
    throw error
  }
}

/**
 * Fetches a file from S3 and returns it as a standard Blob
 */
export async function fetchFile(
  key: string,
  bucketName: AllowedBuckets,
  type?: string
): Promise<Blob> {
  const arrayBuffer = await fetchFileBuffer(key, bucketName)
  return new Blob([arrayBuffer as BlobPart], { type })
}
