import { ErrorUtil } from '@/lib/errors'
import { GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AllowedBuckets, getS3Client } from '../external-services/aws'

export async function generateSignedUrl(
  filename: string,
  bucket: AllowedBuckets
) {
  try {
    const { client, buckets } = getS3Client()
    const params = {
      Bucket: buckets[bucket],
      Key: filename,
      Expires: 60 * 60 // URL expires in 1 hour
    }
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(client, command)
    return url
  } catch (e) {
    const error = e as Error
    ErrorUtil.throw(error.message)
  }
}

export async function checkIfObjectExists(
  filename: string,
  bucket: AllowedBuckets
) {
  try {
    const { client, buckets } = getS3Client()
    const params = {
      Bucket: buckets[bucket],
      Key: filename
    }
    const command = new HeadObjectCommand(params)
    await client.send(command)
    return true
  } catch {
    return false
  }
}

// Function to generate signed URLs for an array of filenames and convert them to File objects
export async function generateSignedUrls(
  filenames: string[],
  bucket: AllowedBuckets
) {
  const signedUrls = await Promise.all(
    filenames.map(filename => generateSignedUrl(filename, bucket))
  )

  const signedUrlsMap = signedUrls.reduce(
    (acc, url, index) => {
      acc[filenames[index]] = url
      return acc
    },
    {} as Record<string, string>
  )

  return signedUrlsMap
}
