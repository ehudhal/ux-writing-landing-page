export function isValidUrl(url: string) {
  try {
    const parsedUrl = new URL(url)
    return parsedUrl.hostname.includes('.')
  } catch {
    return false
  }
}
