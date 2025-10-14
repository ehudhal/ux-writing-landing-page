import { useCallback, useState } from 'react'

export default function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState(null)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setError(null)

      // Reset the copied state after a short delay
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err: any) {
      setError(err.message)
      setIsCopied(false)
    }
  }, [])

  const copyToClipboardWithFormatting = useCallback(
    async (
      formattedContent: string,
      fallbackPlainText: string,
      format = 'text/html'
    ) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [format]: new Blob([formattedContent], { type: format }),
            'text/plain': new Blob([fallbackPlainText], { type: 'text/plain' })
          })
        ])
        setIsCopied(true)
        setError(null)

        // Reset the copied state after a short delay
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err: any) {
        setError(err.message)
        setIsCopied(false)
      }
    },
    []
  )

  const copyImageToClipboard = useCallback(
    async (image: Blob, format = 'image/png') => {
      //currently clipboard api only supports png, and sometimes svg, jpegs are not supported
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [format]: image
          })
        ])
        setIsCopied(true)
        setError(null)

        // Reset the copied state after a short delay
        setTimeout(() => setIsCopied(false), 2000)
      } catch (err: any) {
        setError(err.message)
        setIsCopied(false)
      }
    },
    []
  )

  return {
    copyToClipboard,
    copyToClipboardWithFormatting,
    copyImageToClipboard,
    isCopied,
    error
  }
}
