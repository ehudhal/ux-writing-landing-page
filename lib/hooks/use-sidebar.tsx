'use client'

import * as React from 'react'
import { SIDEBAR_KEY } from '../constants/local-storage'
import { LocalStorage } from '../localstorage'

interface SidebarContext {
  isSidebarOpen: boolean
  toggleSidebar: () => void
  isLoading: boolean
  closeSidebar: () => void
  openSidebar: () => void
}

const SidebarContext = React.createContext<SidebarContext | undefined>(
  undefined
)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: React.ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = React.useState(() => {
    return LocalStorage.getItem<boolean>(SIDEBAR_KEY, null) ?? false
  })

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen(value => {
      const newState = !value
      LocalStorage.setItem(SIDEBAR_KEY, newState, null)
      return newState
    })
  }, [])

  const closeSidebar = React.useCallback(() => {
    setSidebarOpen(false)
    LocalStorage.setItem(SIDEBAR_KEY, false, null)
  }, [])

  const openSidebar = React.useCallback(() => {
    setSidebarOpen(true)
    LocalStorage.setItem(SIDEBAR_KEY, true, null)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar,
        isLoading: false,
        closeSidebar,
        openSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
