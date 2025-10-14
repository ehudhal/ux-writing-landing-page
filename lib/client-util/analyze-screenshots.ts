import { AnalyzedScreen } from '@/lib/types/analyzed-screen'
import pLimit from 'p-limit'

export async function analyzeScreenshots(
  screenIds: string[],
  productId: string
): Promise<AnalyzedScreen[]> {
  const limit = pLimit(5)

  const imagesProcessed = await Promise.all(
    screenIds.map(screenId =>
      limit(async () => {
        const response = await fetch('/api/analyze-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            screenId,
            productId
          })
        })
        if (!response.ok) {
          throw new Error('Failed to analyze image')
        }
        return response.json() as Promise<AnalyzedScreen>
      })
    )
  )

  return imagesProcessed
}
