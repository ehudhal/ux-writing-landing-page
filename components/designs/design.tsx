'use client'

import Mockup from './mockup'

import { Screen } from '@/lib/db-schema/screens'
import { cn } from '@/lib/utils'
import { History } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDesignSize } from './design-size-context'
import useRefreshUntilInstanceId from './hooks/refresh-until-screen-instance-id'

export default function Design({
  designId,
  screen,
  historicalScreenInstanceId,
  readOnly = false
}: {
  designId: string
  screen: Screen
  readOnly?: boolean
  historicalScreenInstanceId?: string
}) {
  const { maxWidth } = useDesignSize()
  const router = useRouter()

  let screenInstanceId = screen.primaryInstanceId

  if (historicalScreenInstanceId) {
    screenInstanceId = historicalScreenInstanceId
  }

  useRefreshUntilInstanceId(screenInstanceId)

  const viewLatest = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('history')
    url.searchParams.delete('screenInstance')
    url.searchParams.delete('his')
    router.push(url.toString())
  }

  if (!screenInstanceId) return null
  return (
    <div className="flex h-full min-w-0 grow flex-col md:p-2">
      <div className="flex grow items-center justify-center">
        <div
          style={{
            maxWidth: maxWidth
          }}
          className={cn(
            'relative h-full  grow overflow-auto rounded-md border bg-background transition-all',
            {
              'h-[95%] rounded-xl mx-4': maxWidth !== '100%'
            }
          )}
        >
          <Mockup
            designId={designId}
            screenInstanceId={screenInstanceId}
            allowComments={false}
            readOnly={readOnly}
          />
        </div>
      </div>
      {historicalScreenInstanceId && (
        <div className="flex items-center gap-2 bg-offblack px-4 py-3">
          <History className="size-4 text-gray-100" strokeWidth={1} />
          <p className="text-xs text-gray-100 ">
            You&apos;re viewing an earlier version of this screen.
            <span
              className="mx-1 cursor-pointer font-bold transition-all hover:text-gray-200 hover:underline"
              onClick={viewLatest}
            >
              Click here
            </span>
            to view the latest version.
          </p>
        </div>
      )}
    </div>
  )
}
