'use client'

import type React from 'react'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useEffect, useRef, useState, type ReactNode } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function TiltCard({ children, className, onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({})
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate the center of the card
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Calculate the mouse position relative to the center of the card
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate the percentage of the mouse position relative to the card dimensions
    const percentX = mouseX / (rect.width / 2)
    const percentY = mouseY / (rect.height / 2)

    // Calculate the tilt angle (max 10 degrees)
    const tiltX = -percentY * 10
    const tiltY = percentX * 10

    // Apply the tilt effect with additional transform for pressed state
    const scale = isPressed ? 'scale(0.98)' : ''
    const transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${scale}`

    setTiltStyle({
      transform,
      transition: 'transform 0.05s ease-out, box-shadow 0.2s ease-out'
    })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsPressed(false)
    // Reset the tilt effect
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out'
    })
  }

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  // Add global mouse up handler to catch releases outside the card
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isPressed) setIsPressed(false)
    }

    if (isPressed) {
      window.addEventListener('mouseup', handleGlobalMouseUp)
    }

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isPressed])

  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <Card
      ref={cardRef}
      className={cn(
        'overflow-hidden transition-shadow duration-200',
        isHovering && !isPressed && 'shadow-md',
        isPressed && 'shadow-sm',
        !isHovering && !isPressed && 'shadow',
        className
      )}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {children}
    </Card>
  )
}
