import { Bug, BugOff } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

type LabelPosition = {
  id: string
  rect: DOMRect
  preferredY: number
  actualY: number
}

function calculateNonOverlappingPositions(
  labels: LabelPosition[]
): LabelPosition[] {
  const sortedLabels = [...labels].sort((a, b) => a.preferredY - b.preferredY)
  const labelHeight = 20
  const spacing = 2

  for (let i = 1; i < sortedLabels.length; i++) {
    const prevLabel = sortedLabels[i - 1]
    const currentLabel = sortedLabels[i]

    if (currentLabel.preferredY < prevLabel.actualY + labelHeight + spacing) {
      currentLabel.actualY = prevLabel.actualY + labelHeight + spacing
    } else {
      currentLabel.actualY = currentLabel.preferredY
    }
  }

  return sortedLabels
}

const getColorForId = (id: string) => {
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const hue = Math.abs(hash % 360)
  return `hsla(${hue}, 70%, 50%, 1)`
}

export const HighlightChunks: React.FC<{
  children: React.ReactNode
  enabled?: boolean
}> = ({ children, enabled = false }) => {
  const [hidden, setHidden] = useState(false)
  if (!enabled) return <>{children}</>

  const HideButton = () => (
    <Button
      style={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        borderRadius: '9999px',
        aspectRatio: '1',
        backgroundColor: 'black',
        border: 'none',
        cursor: 'pointer',
        color: 'white',
        width: 42,
        height: 42
      }}
      onClick={() => setHidden(prev => !prev)}
    >
      {hidden ? (
        <Bug strokeWidth={1} size={18} />
      ) : (
        <BugOff strokeWidth={1} size={18} />
      )}
    </Button>
  )
  if (hidden)
    return (
      <>
        {children}
        <HideButton />
      </>
    )
  return (
    <Highlight>
      {children}
      <HideButton />
    </Highlight>
  )
}

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [elements, setElements] = useState<Map<string, HTMLElement[]>>(
    new Map()
  )
  const [positions, setPositions] = useState<Map<string, DOMRect[]>>(new Map())

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateElements = () => {
      const foundElements = Array.from(container.querySelectorAll('[data-csi]'))
      const elementsByCsiId = new Map<string, HTMLElement[]>()
      const positionsByCsiId = new Map<string, DOMRect[]>()

      foundElements.forEach(el => {
        const csiId = el.getAttribute('data-csi')
        if (!csiId) return

        if (!elementsByCsiId.has(csiId)) {
          elementsByCsiId.set(csiId, [])
          positionsByCsiId.set(csiId, [])
        }
        elementsByCsiId.get(csiId)!.push(el as HTMLElement)
        const rect = el.getBoundingClientRect()

        // Calculate position relative to viewport
        const absoluteRect = new DOMRect(
          rect.x,
          rect.y,
          rect.width,
          rect.height
        )
        positionsByCsiId.get(csiId)!.push(absoluteRect)
      })

      setElements(elementsByCsiId)
      setPositions(positionsByCsiId)
    }

    // Initial update
    updateElements()

    // Update on scroll with throttling
    let scrollTimeout: number
    const scrollHandler = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout)
      }
      scrollTimeout = window.requestAnimationFrame(updateElements)
    }

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateElements)
    })

    // Observe container and window
    resizeObserver.observe(container)
    window.addEventListener('scroll', scrollHandler, { passive: true })
    document.addEventListener('scroll', scrollHandler, {
      passive: true,
      capture: true
    })

    // Mutation observer to track DOM changes
    const mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(updateElements)
    })

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    })

    return () => {
      window.removeEventListener('scroll', scrollHandler)
      document.removeEventListener('scroll', scrollHandler, true)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout)
      }
    }
  }, [])

  return (
    <>
      <div ref={containerRef}>{children}</div>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 999999
        }}
      >
        {(() => {
          const labelPositions: LabelPosition[] = Array.from(elements.entries())
            .map(([csiId]) => {
              const elementRects = positions.get(csiId) || []
              const firstRect = elementRects[0]
              if (!firstRect) return null

              return {
                id: csiId,
                rect: firstRect,
                preferredY: Math.max(0, firstRect.y - 20),
                actualY: Math.max(0, firstRect.y - 20)
              }
            })
            .filter((pos): pos is LabelPosition => pos !== null)

          const adjustedLabels =
            calculateNonOverlappingPositions(labelPositions)

          return Array.from(elements.entries()).map(([csiId]) => {
            const color = getColorForId(csiId)
            const elementRects = positions.get(csiId) || []
            const firstRect = elementRects[0]
            const labelPosition = adjustedLabels.find(l => l.id === csiId)

            if (!firstRect || !labelPosition) return null

            return (
              <React.Fragment key={csiId}>
                {elementRects.map((rect, index) => {
                  if (rect.width === 0 || rect.height === 0) return null

                  return (
                    <div
                      key={index}
                      style={{
                        position: 'fixed',
                        left: rect.x,
                        top: rect.y,
                        width: rect.width,
                        height: rect.height,
                        border: `1px solid ${color}`,
                        boxSizing: 'border-box',
                        pointerEvents: 'none'
                      }}
                    />
                  )
                })}
                <div
                  style={{
                    position: 'fixed',
                    backgroundColor: color,
                    color: 'black',
                    padding: '2px 5px',
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    zIndex: 9999,
                    top: labelPosition.actualY,
                    left: Math.max(0, firstRect.x),
                    transform: 'none',
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(csiId)
                    toast.info('Copied to clipboard, Chunk ID: ' + csiId)
                  }}
                >
                  {csiId}
                </div>
              </React.Fragment>
            )
          })
        })()}
      </div>
    </>
  )
}
