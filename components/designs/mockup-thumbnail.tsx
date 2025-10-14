'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'
import Mockup from './mockup'

import {
  ScreenStatus,
  ScreenStatusType
} from '@/lib/db-schema/screen-instances'
import FakeProgressBar from '../fake-progress-bar'
import { Skeleton } from '../ui/skeleton'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function MockupThumbnail({
  screenInstanceId,
  title,
  initialState,
  isCurrentScreen,
  className
}: {
  screenId: string
  screenInstanceId: string
  title: string
  isCurrentScreen: boolean
  initialState?: ScreenStatusType
  className?: string
}) {
  const [screenInstanceState, setScreenInstanceState] = useState(initialState)

  return (
    <div className={cn('w-[180px]', className)}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="mb-1 truncate text-sm font-medium">{title}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
      <div
        className={cn(
          'relative max-h-[112px] overflow-hidden rounded-sm border bg-white hover:brightness-90 hover:backdrop-brightness-90',
          screenInstanceState === ScreenStatus.GENERATING && 'opacity-50',
          isCurrentScreen ? 'border-primary' : 'border-[#DBDAD1]'
        )}
      >
        <Mockup
          screenInstanceId={screenInstanceId}
          className={cn('pointer-events-none')}
          thumbnail
          readOnly
          onStateChange={setScreenInstanceState}
        />

        {screenInstanceState === ScreenStatus.GENERATING && (
          <div
            className="absolute left-1/2 top-1/2 w-[120px] text-sm"
            style={{ transform: 'translate(-50%,-50%)' }}
          >
            <FakeProgressBar />
          </div>
        )}
      </div>
    </div>
  )
}

export const WireframeThumbnailSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="group relative h-[2ch] w-[130px] rounded-sm" />
    <Skeleton className="group relative aspect-video w-[180px] max-w-48" />
  </div>
)
