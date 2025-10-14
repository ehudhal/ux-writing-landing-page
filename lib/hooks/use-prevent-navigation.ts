'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const UNSAVED_CHANGES_MESSAGE =
  'You have unsaved changes. Are you sure you want to leave?'

export function usePreventNavigation(shouldPrevent: boolean) {
  const router = useRouter()

  useEffect(() => {
    if (!shouldPrevent) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    // Store original router methods
    const originalPush = router.push.bind(router)
    const originalReplace = router.replace.bind(router)

    // Create wrapped router method
    const wrapRouterMethod = (
      originalMethod: (href: string, ...args: any[]) => void
    ) => {
      return (href: string, ...args: any[]) => {
        if (window.confirm(UNSAVED_CHANGES_MESSAGE)) {
          originalMethod(href, ...args)
        }
      }
    }

    // Patch router methods
    router.push = wrapRouterMethod(originalPush)
    router.replace = wrapRouterMethod(originalReplace)

    // Store current pathname and add to history stack
    const currentPathname = window.location.pathname

    // Handle back/forward navigation
    const handlePopState = (event: PopStateEvent) => {
      // If there's no state, it's likely a back button press
      if (!event.state?.preventNavigation) {
        // Prevent the navigation
        history.pushState({ preventNavigation: true }, '', currentPathname)
        // Show confirmation
        if (window.confirm(UNSAVED_CHANGES_MESSAGE)) {
          // If confirmed, go back
          history.back()
        }
      }
    }

    // Add current state to history
    history.pushState({ preventNavigation: true }, '', currentPathname)

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      // Cleanup
      router.push = originalPush
      router.replace = originalReplace
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [shouldPrevent, router])
}
