'use client'

import '@/app/globals.css'
import { useEffect } from 'react'

import { GlobalFonts } from '@/components/fonts'
import { Button } from '@/components/ui/button'
import { CircleAlert } from 'lucide-react'
import Link from 'next/link'
import { cn } from '../lib/utils'

export default function GlobalError({
  error
}: {
  error: Error & { digest?: string }
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'anonymous'}
        />
        <GlobalFonts />
      </head>
      <body className={cn('font-sans antialiased ')}>
        <div className="text-offblack relative z-20 flex min-h-screen items-center justify-center bg-background-gray">
          <div className="mx-auto -mt-8 flex h-full w-full max-w-[90%] md:max-w-[800px] flex-col items-center justify-center gap-4 md:gap-6 rounded-3xl border bg-white p-8 pt-12 pb-16 ">
            <div className="flex flex-col gap-4 items-center">
              <div className="flex size-24 md:size-32 items-center justify-center rounded-full bg-gray-100">
                <CircleAlert className="md:size-12 size-10 " />
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-center font-bold">
                Something went wrong.
              </h1>
              <p className="text-gray-700 text-center text-base md:text-lg">
                Please try again later or contact support.
              </p>
              <Link href="/">
                <Button>Go back</Button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
