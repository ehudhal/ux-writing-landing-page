'use client'
import { IBM_Plex_Sans, IBM_Plex_Serif } from 'next/font/google'

const ibmPlexSans = IBM_Plex_Sans({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plex-sans',
  display: 'swap'
})

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['100', '200', '300', '400'],
  subsets: ['latin'],
  variable: '--font-plex-serif',
  display: 'swap'
})

export const GlobalFonts = () => {
  return (
    <style>
      {`
      :root {
        --font-sans: ${ibmPlexSans.style.fontFamily};
        --font-serif: ${ibmPlexSerif.style.fontFamily};
      }
    `}
    </style>
  )
}
