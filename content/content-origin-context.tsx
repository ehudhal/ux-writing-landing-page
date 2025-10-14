'use client'

import contentAbout from '@/content/library/about.json'
import contentHomepage from '@/content/library/homepage.json'
import contentHomepageChordio from '@/content/library/homepage-chordio.json'
import contentPartnership from '@/content/library/partnership.json'
import { createContext, useContext } from 'react'

type ContentOrigin = 'homepage' | 'homepage-chordio' | 'about' | 'partnership'

const contentMap = {
  homepage: contentHomepage,
  'homepage-chordio': contentHomepageChordio,
  about: contentAbout,
  partnership: contentPartnership
}

const ContentOriginContext = createContext<ContentOrigin>('homepage')

export function ContentOriginProvider({
  children,
  origin
}: {
  children: React.ReactNode
  origin: ContentOrigin
}) {
  return (
    <ContentOriginContext.Provider value={origin}>
      {children}
    </ContentOriginContext.Provider>
  )
}

export function useContentOrigin() {
  return useContext(ContentOriginContext)
}

export function useHomepageContent() {
  const origin = useContentOrigin()
  return contentMap[origin] as typeof contentHomepage
}
