'use client'

import { Screen } from '@/lib/db-schema/screens'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import CopyToFigmaButton from './copy-figma-clipboard-button'
import DeviceModeButtons from './device-mode-buttons'

export default function DesignViewActions({
  screen,
  designId
}: {
  screen: Screen
  designId: string
}) {
  const [parent] = useAutoAnimate()

  return (
    <div
      className="flex flex-col items-center justify-between gap-2"
      ref={parent}
    >
      <div className="flex w-full flex-col-reverse items-start justify-start gap-2 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex h-full items-center justify-start gap-2 pb-2 text-xs">
          <span className="line-clamp-2">{screen.description}</span>
        </div>

        <div className="hidden h-full max-h-[50px] shrink justify-end gap-2 self-start md:flex">
          <DeviceModeButtons designId={designId}></DeviceModeButtons>
          <CopyToFigmaButton />
        </div>
      </div>
    </div>
  )
}
