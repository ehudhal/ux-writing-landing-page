import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function useRefreshUntilInstanceId(
  screenInstanceId: string | null
) {
  const router = useRouter()
  useEffect(() => {
    if (screenInstanceId) {
      return
    }

    const interval = setInterval(() => {
      if (!screenInstanceId) {
        router.refresh()
      } else {
        clearInterval(interval)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [router, screenInstanceId])
}
