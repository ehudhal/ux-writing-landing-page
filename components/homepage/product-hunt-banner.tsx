'use client'

import Content from '@/content/content'
import contentHomepage from '@/content/library/homepage.json'
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
          <Content
            contentKey="product-hunt.announcement"
            origin="homepage"
          />{' '}
          <Link
            href="https://www.producthunt.com/posts/prdkit?utm_source=prdkit&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            <Content
              contentKey="product-hunt.announcement-cta"
              origin="homepage"
            />
          </Link>
        </p>
      </div>
    )
  }

  // Get the welcome text from JSON and replace the placeholder
  const welcomeText = contentHomepage['product-hunt'].welcome

  return (
    <div className="w-full bg-[#f5e9d7] py-3 px-4 text-center">
      <p className="text-sm font-medium">
        {welcomeText.replace('{credits}', String(PRODUCT_HUNT_CREDITS))}
      </p>
    </div>
  )
}
