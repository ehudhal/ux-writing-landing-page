import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export type HomePageMode = 'shared' | 'recent' | 'my-designs'

export function useHomePageMode() {
  const searchParams = useSearchParams()
  const search = searchParams.get('q') || ''
  const sharedOnly = searchParams.get('shared') === 'true'
  const recentOnly = searchParams.get('recent') === 'true'

  const mode: 'shared' | 'recent' | 'my-designs' = useMemo(() => {
    if (sharedOnly) {
      return 'shared'
    }
    if (recentOnly) {
      return 'recent'
    }
    return 'my-designs'
  }, [sharedOnly, recentOnly])

  return {
    mode,
    search
  }
}
