const CAPTURED_S3_URL = 'https://chordio-captured.s3.us-east-1.amazonaws.com'
const ICONIFY_URL = 'https://api.iconify.design' // used for legacy icon urls

async function hashImageUrl(url: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(url)

  // Use the Web Crypto API to hash the URL
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)

  // Convert the hash to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
  return hashHex
}

export default async function getCapturedUrl(
  url: string,
  type: 'images' | 'fonts'
) {
  if (!url || url.startsWith(CAPTURED_S3_URL) || url.startsWith(ICONIFY_URL)) {
    return url
  }

  try {
    const urlObject = new URL(url, window.location.origin)

    const hashedUrl = await hashImageUrl(urlObject.pathname + urlObject.search)

    return `${CAPTURED_S3_URL}/${type}/${hashedUrl}`
  } catch (error) {
    console.warn('getCapturedUrl - error', error, url)

    return url
  }
}
