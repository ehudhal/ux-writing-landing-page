'use client'

import { PRODUCT_HUNT_USER_KEY } from '@/lib/constants/local-storage'
import { PRODUCT_HUNT_CREDITS } from '@/lib/constants/prices'

import { LocalStorage } from '@/lib/localstorage'
import { useEffect, useState } from 'react'

export default function PostSignupProductHuntBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user came from Product Hunt
    const isProductHuntUser = LocalStorage.getItem<boolean>(
      PRODUCT_HUNT_USER_KEY,
      null
    )

    setIsVisible(!!isProductHuntUser)
    setIsLoading(false)
  }, [])

  const handleDismiss = () => {
    // Remove the Product Hunt user key from localStorage to prevent showing the banner again
    LocalStorage.removeItem(PRODUCT_HUNT_USER_KEY, null)
    setIsVisible(false)
  }

  if (isLoading || !isVisible) {
    return null
  }

  return (
    <div className="relative w-full bg-[#f9f6e7] py-3 px-4 text-center">
      <p className="text-sm font-medium">
        🎉 You&apos;ve received {PRODUCT_HUNT_CREDITS} free credits! Enjoy
        specing with PRDKit.
      </p>
      <button
        onClick={handleDismiss}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  )
}
