'use client'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import useMediaQuery from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils'
import { Expand, Monitor, Smartphone, Tablet } from 'lucide-react'
import { useEffect } from 'react'
import { DeviceMode, useDesignSize } from './design-size-context'

type DeviceModeButtonProps = {
  designId: string
}

export default function DeviceModeButtons({ designId }: DeviceModeButtonProps) {
  const [mode, setMode] = useLocalStorage<DeviceMode>(
    `device-mode-${designId}`,
    'desktop'
  )
  const { onResize } = useDesignSize()
  const isMobile = useMediaQuery('sm')
  const handleChangeMode = (mode: DeviceMode) => {
    setMode(mode)
    if (onResize) {
      onResize(mode)
    }
  }

  useEffect(() => {
    if (isMobile) {
      handleChangeMode('desktop')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile])

  return (
    <div className=" hidden aspect-4/1 h-full min-w-[100px]  max-w-min gap-1 rounded-sm border p-1 md:flex">
      <ModeButton mode={mode} setMode={handleChangeMode} targetMode="mobile" />
      <ModeButton mode={mode} setMode={handleChangeMode} targetMode="tablet" />
      <ModeButton mode={mode} setMode={handleChangeMode} targetMode="desktop" />
    </div>
  )
}

const icons = {
  mobile: <Smartphone strokeWidth={1} size={14} />,
  tablet: <Tablet strokeWidth={1} size={14} />,
  desktop: <Monitor strokeWidth={1} size={14} />,
  fullscreen: <Expand strokeWidth={1} size={14} />
}

type ModeButtonProps = {
  targetMode: DeviceMode
  mode: DeviceMode
  setMode: (mode: DeviceMode) => void
  disabled?: boolean
}
const ModeButton = ({
  mode,
  setMode,
  targetMode,
  disabled
}: ModeButtonProps) => {
  if (disabled) return <></>
  const isActive = targetMode === mode
  return (
    <button
      onClick={() => {
        if (disabled) return
        return setMode(targetMode)
      }}
      disabled={disabled}
      className={cn(
        `flex size-full items-center justify-center rounded-sm p-1 px-2 text-sm transition-colors hover:bg-gray-200`,
        {
          ['bg-gray-100']: isActive,
          [' hover:bg-transparent']: disabled
        }
      )}
    >
      {icons[targetMode]}
    </button>
  )
}
