import { useEffect } from 'react'

function useDisableLinks() {
  useEffect(() => {
    const links = document.querySelectorAll('a')
    links.forEach(link => {
      link.href = '#' // set href to # to prevent navigation
      // link.style.pointerEvents = 'none' // disable pointer events
    })
  }, [])
}

export default useDisableLinks
