import { Alert, AlertDescription } from '@/components/ui/alert'
import { ReactNode } from 'react'

export function parseMessageContent<T>(
  messageContent: string,
  render: (parsedContent: T) => ReactNode
) {
  try {
    const parsed = JSON.parse(messageContent) as T
    return render(parsed)
  } catch {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          An error occurred while processing this message. Please try again.
        </AlertDescription>
      </Alert>
    )
  }
}
