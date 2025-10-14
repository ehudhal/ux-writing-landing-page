'use client'

import * as React from 'react'

interface ScreenListContext {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const ScreenListContext = React.createContext<ScreenListContext | undefined>(
  undefined
)

export function useScreenList() {
  const context = React.useContext(ScreenListContext)
  if (!context) {
    throw new Error('useScreenList must be used within a ScreenListProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function ScreenListProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(value => !value)
  }

  return (
    <ScreenListContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </ScreenListContext.Provider>
  )
}
