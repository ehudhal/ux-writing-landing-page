import { ReactNode } from 'react'

import '@/app/base.css'
import { GlobalFonts } from '@/components/fonts'
import { getAppUrl } from '@/lib/env-utils'
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(getAppUrl()),
  title: {
    default: 'PRDKit: AI-Powered Product Requirements',
    template: `%s | PRDKit`
  },
  description:
    'Generate product requirements, user flows, and launch-ready content with AI that understands your product and design system.',
  openGraph: {
    title: 'PRDKit: AI-Powered Product Requirements',
    description:
      'Generate product requirements, user flows, and launch-ready content with AI that understands your product and design system.',
    url: new URL(getAppUrl())
  }
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={'anonymous'}
        />
        <meta name="slack-app-id" content="A05B4BJLR5M" />
        <GlobalFonts />
      </head>
      <body className={'font-sans antialiased'}>{children}</body>
    </html>
  )
}
