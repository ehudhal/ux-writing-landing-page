'use client'

import mermaid from 'mermaid'
import { useEffect, useRef } from 'react'

// Initialize mermaid with default config
mermaid.initialize({
  startOnLoad: false,
  theme: 'default',
  securityLevel: 'loose',
  // Add these settings to make the diagram fill the container
  htmlLabels: true
})

interface FlowchartProps {
  definition: string
  className?: string
  id?: string
}

export const Flowchart = ({ definition, id }: FlowchartProps) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true
    const renderChart = async () => {
      if (!elementRef.current || !isMounted) return

      try {
        // Clear the element's content
        elementRef.current.innerHTML = ''
        // Remove any previous error state
        elementRef.current.removeAttribute('data-mermaid-error')

        // Add the mermaid class and chart definition
        elementRef.current.className =
          'mermaid size-full flex items-center justify-center z-10'

        const textNode = document.createTextNode(definition)
        elementRef.current.appendChild(textNode)

        // Wait for next tick to ensure DOM is updated
        await new Promise(resolve => setTimeout(resolve, 0))

        // Double check element still exists and is mounted
        if (!elementRef.current || !isMounted) return

        // Render the chart
        await mermaid.run({
          nodes: [elementRef.current]
        })
      } catch (error) {
        console.error('Error rendering mermaid chart:', error)
        if (elementRef.current && isMounted) {
          elementRef.current.innerHTML = 'Error rendering flowchart'
          // Add error data attribute for detection in headless browser
          elementRef.current.setAttribute('data-mermaid-error', 'true')
        }
      }
    }

    renderChart()

    return () => {
      isMounted = false
    }
  }, [definition, id])

  // Add styles to make the container and SVG fill available space
  return (
    <div
      ref={elementRef}
      id={id}
      className="relative z-10 flex size-full items-center justify-center [&>svg]:size-full"
    />
  )
}
