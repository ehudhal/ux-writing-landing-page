import { useEffect } from 'react'
import getCapturedUrl from '../client-util/get-captured-url'

function useImageReplacement() {
  useEffect(() => {
    // Select all <img> elements in the DOM
    const images = document.querySelectorAll('img')

    // Replace the src attribute of each <img>
    images.forEach(async img => {
      // img src
      if (!img.src && !img.srcset) {
        return
      }

      const capturedUrl = await getCapturedUrl(img.src, 'images')

      if (capturedUrl) {
        img.src = capturedUrl
      }

      // img srcset
      if (!img.srcset) {
        return
      }

      const srcsetUrls = img.srcset.split(',').map(src => {
        const srcUrl = src.trim().split(/\s+/)[0]
        return srcUrl.trim()
      })
      const newSrcset = await Promise.all(
        srcsetUrls.map(async src => {
          const hashedUrl = await getCapturedUrl(src, 'images')
          return hashedUrl
        })
      )
      img.srcset = newSrcset.join(', ')
    })

    // replace video tag poster
    const videoTags = document.querySelectorAll('video')
    videoTags.forEach(async video => {
      const poster = video.poster
      if (poster) {
        const capturedUrl = await getCapturedUrl(poster, 'images')
        video.poster = capturedUrl
      }
    })

    // Add check for pseudo-elements
    document.querySelectorAll('*').forEach(async element => {
      const before = window.getComputedStyle(element, '::before')
      const after = window.getComputedStyle(element, '::after')

      if (before.backgroundImage !== 'none') {
        const bgUrlMatch = before.backgroundImage.match(
          /url\(["']?(.*?)["']?\)/
        )
        if (bgUrlMatch) {
          const bgUrl = bgUrlMatch[1]
          const capturedUrl = await getCapturedUrl(bgUrl, 'images')
          const uniqueId = `bg-${Math.random().toString(36).substr(2, 9)}`
          element.setAttribute('data-bg-before-id', uniqueId)

          const styleSheet = new CSSStyleSheet()
          styleSheet.insertRule(`
            ${element.tagName.toLowerCase()}[data-bg-before-id="${uniqueId}"]::before {
              background-image: url(${capturedUrl}) !important;
            }
          `)
          document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            styleSheet
          ]
        }
      }

      if (after.backgroundImage !== 'none') {
        const bgUrlMatch = after.backgroundImage.match(/url\(["']?(.*?)["']?\)/)
        if (bgUrlMatch) {
          const bgUrl = bgUrlMatch[1]
          const capturedUrl = await getCapturedUrl(bgUrl, 'images')
          const uniqueId = `bg-${Math.random().toString(36).substr(2, 9)}`
          element.setAttribute('data-bg-after-id', uniqueId)

          const styleSheet = new CSSStyleSheet()
          styleSheet.insertRule(`
            ${element.tagName.toLowerCase()}[data-bg-after-id="${uniqueId}"]::after {
              background-image: url(${capturedUrl}) !important;
            }
          `)
          document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            styleSheet
          ]
        }
      }
    })

    // Handle regular background images
    document.querySelectorAll('*').forEach(async elem => {
      const style = (elem as HTMLElement).style
      const computedStyle = window.getComputedStyle(elem)

      const bgUrlMatch = computedStyle.backgroundImage.match(
        /url\(["']?(.*?)["']?\)/
      )

      if (bgUrlMatch) {
        const bgUrl = bgUrlMatch[1]
        const capturedUrl = await getCapturedUrl(bgUrl, 'images')
        style.backgroundImage = `url(${capturedUrl})`
      }
    })
  }, [])
}

export default useImageReplacement
