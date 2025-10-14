'use client'

import { PRODUCT_HUNT_USER_KEY } from '@/lib/constants/local-storage'
import { PRODUCT_HUNT_CREDITS } from '@/lib/constants/prices'
import { LocalStorage } from '@/lib/localstorage'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProductHuntBanner() {
  const searchParams = useSearchParams()
  const utmSource = searchParams.get('utm_source')
  const [isProductHuntUser, setIsProductHuntUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user came from Product Hunt via referrer
    const referrer = document.referrer
    const isFromProductHunt = referrer.includes('producthunt.com')
    const isPHUser = utmSource === 'producthunt' || isFromProductHunt

    if (isPHUser) {
      // Store in localStorage that this is a Product Hunt user
      LocalStorage.setItem(PRODUCT_HUNT_USER_KEY, true, null)
    }

    setIsProductHuntUser(isPHUser)
    setIsLoading(false)
  }, [utmSource])

  if (isLoading) {
    return null
  }

  if (!isProductHuntUser) {
    // uncomment after PH launch
    return (
      <div className="w-full bg-[#eaf6ff] py-3 px-4 text-center">
        <p className="text-sm font-medium">
          🚀 We&apos;re live on Product Hunt, and we&apos;d love your support!{' '}
          <Link
            href="https://www.producthunt.com/posts/prdkit?utm_source=prdkit&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Check out the announcement →
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#f5e9d7] py-3 px-4 text-center">
      <p className="text-sm font-medium">
        👋 Welcome, Product Hunters! Claim $10 in PRDKit credits (
        {PRODUCT_HUNT_CREDITS} credits) when you sign up this week.
      </p>
    </div>
  )
}
