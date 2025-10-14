import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { AllowedBuckets, getS3Client } from '../external-services/aws'

export async function deleteFile(
  key: string,
  bucketName: AllowedBuckets
): Promise<void> {
  const { client, buckets } = getS3Client()

  try {
    await client.send(
      new DeleteObjectCommand({
        Bucket: buckets[bucketName],
        Key: key
      })
    )
  } catch (error) {
    // If the file doesn't exist, S3 returns a NoSuchKey error
    // We can safely ignore this since the end result is what we want
    if ((error as any)?.name !== 'NoSuchKey') {
      console.error('Error deleting file from S3:', error)
      throw error
    }
  }
}
