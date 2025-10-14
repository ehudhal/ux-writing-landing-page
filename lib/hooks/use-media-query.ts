import { useEffect, useState } from 'react'

type MediaQuery = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const useMediaQuery = (query: MediaQuery): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQueryList = window.matchMedia(getMediaQueryString(query))

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQueryList.addEventListener('change', handleMediaQueryChange)
    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange)
    }
  }, [query])

  return matches
}

const getMediaQueryString = (query: MediaQuery): string => {
  switch (query) {
    case 'sm':
      return '(max-width: 640px)'
    case 'md':
      return '(min-width: 640px) and (max-width: 767px)'
    case 'lg':
      return '(min-width: 768px) and (max-width: 1023px)'
    case 'xl':
      return '(min-width: 1024px) and (max-width: 1279px)'
    case '2xl':
      return '(min-width: 1280px)'

    default:
      throw new Error(`Invalid media query: ${query}`)
  }
}

export const useIsMobile = () => {
  const isMd = useMediaQuery('md')
  const isSm = useMediaQuery('sm')

  return isMd || isSm
}

export const useIsTablet = () => {
  return useMediaQuery('lg')
}

export default useMediaQuery
