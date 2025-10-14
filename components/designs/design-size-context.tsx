'use client'

import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { createContext, PropsWithChildren, useContext } from 'react'

export type DeviceMode = 'mobile' | 'tablet' | 'desktop' | 'fullscreen'

type DesignSizeContextType = {
  maxWidth: string
  setMaxWidth: (width: string) => void
}

const DesignSizeContext = createContext<DesignSizeContextType | undefined>(
  undefined
)

export function DesignSizeProvider({
  children,
  designId
}: PropsWithChildren<{ designId: string }>) {
  const [maxWidth, setMaxWidth] = useLocalStorage<string>(
    `max-wireframe-width-${designId}`,
    '100%'
  )

  return (
    <DesignSizeContext.Provider value={{ maxWidth, setMaxWidth }}>
      {children}
    </DesignSizeContext.Provider>
  )
}

export function useDesignSize() {
  const context = useContext(DesignSizeContext)
  if (!context) {
    throw new Error('useDesignSize must be used within a DesignSizeProvider')
  }

  const { maxWidth, setMaxWidth } = context
  const onResize = (mode: DeviceMode) => {
    if (mode === 'desktop' || mode === 'fullscreen') {
      setMaxWidth('100%')
    } else if (mode === 'tablet') {
      setMaxWidth('768px')
    } else if (mode === 'mobile') {
      setMaxWidth('375px')
    }
  }

  return { onResize, maxWidth }
}
