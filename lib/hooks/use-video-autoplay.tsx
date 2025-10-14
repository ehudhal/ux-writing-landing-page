import { useEffect } from 'react'

export const useVideoAutoplay = (
  videoRef: React.RefObject<HTMLVideoElement | null>
) => {
  useEffect(() => {
    const videoElement = videoRef.current
    let hasUserScrolled = false
    const initialScrollY = window.scrollY

    const attemptVideoPlay = async (video: HTMLVideoElement) => {
      if (video.paused) {
        try {
          await video.play()
        } catch (error) {
          console.warn('Video autoplay failed:', error)
        }
      }
    }

    const isElementInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect()
      return rect.top >= 0 && rect.bottom <= window.innerHeight
    }

    const handleScroll = () => {
      if (window.scrollY === initialScrollY || !videoElement) return

      hasUserScrolled = true
      window.removeEventListener('scroll', handleScroll)

      if (isElementInViewport(videoElement)) {
        attemptVideoPlay(videoElement)
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (!videoElement) return

        if (entry.isIntersecting && hasUserScrolled) {
          attemptVideoPlay(videoElement)
        } else {
          videoElement.pause()
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    )

    if (videoElement) {
      window.addEventListener('scroll', handleScroll)
      intersectionObserver.observe(videoElement)
    }

    return () => {
      if (videoElement) {
        intersectionObserver.unobserve(videoElement)
      }
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
