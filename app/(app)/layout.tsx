import { Analytics } from '@vercel/analytics/react'

import '@/app/globals.css'
import { Providers } from '@/components/providers'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import './app.css'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="h-full">
      <Toaster />
      <Providers>
        <main className="md:min-h-screen">{children}</main>
      </Providers>
      <TailwindIndicator />
      <Analytics />
    </div>
  )
}
