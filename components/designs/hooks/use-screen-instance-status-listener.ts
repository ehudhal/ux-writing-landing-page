import { ScreenStatusType } from '@/lib/db-schema/screen-instances'
import { useEffect, useState } from 'react'

export default function useScreenInstanceStatusListener(
  screenInstanceId: string
) {
  const [generationStatus, setGenerationStatus] = useState<ScreenStatusType>()

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // event origin needs to be the same as the origin of the current page
      if (event.origin !== window.location.origin) {
        return // Ignore messages from unknown sources for security
      }

      if (event.data.type === 'submit-status-update') {
        if (event.data.payload.screenInstanceId === screenInstanceId) {
          setGenerationStatus(event.data.payload.status)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    // Clean up
    return () => {
      window.removeEventListener('message', handleMessage)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { generationStatus }
}
