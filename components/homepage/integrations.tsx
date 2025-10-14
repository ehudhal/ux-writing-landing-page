'use client'

import React, { forwardRef, useRef } from 'react'

import { cn } from '@/lib/utils'
import { AnimatedBeam, AnimatedBeamProps } from '../magicui/animated-beam'
import PRDKitLogo from '../prdkit-logo'

const Circle = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    style?: React.CSSProperties
  }
>(({ className, children, style }, ref) => {
  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        'z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]',
        className
      )}
    >
      {children}
    </div>
  )
})

Circle.displayName = 'Circle'

type IntegrationProps = {
  icon1: React.ReactNode
  icon2: React.ReactNode
  icon3: React.ReactNode
  baseColor?: string
  pathColor?: string
  path1Props?: Partial<AnimatedBeamProps>
  path2Props?: Partial<AnimatedBeamProps>
  path3Props?: Partial<AnimatedBeamProps>
}

export function Integrations({
  icon1,
  icon2,
  icon3,
  baseColor,
  pathColor,
  path1Props,
  path2Props,
  path3Props
}: IntegrationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const centerLogoRef = useRef<HTMLDivElement>(null)
  const icon1Ref = useRef<HTMLDivElement>(null)
  const icon2Ref = useRef<HTMLDivElement>(null)
  const icon3Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="relative flex lg:h-[400px] w-full items-center justify-center lg:overflow-hidden lg:p-10"
      ref={containerRef}
    >
      <div className="flex size-full max-w-lg items-stretch justify-between gap-10 h-full">
        <div className="flex flex-col items-center justify-center">
          <Circle
            className="size-24 lg:size-36  shadow-none border-none"
            style={{ backgroundColor: baseColor }}
          >
            <Circle
              ref={centerLogoRef}
              className="size-20 lg:size-26 p-2 shadow-lg flex items-center justify-center"
            >
              <PRDKitLogo
                variant="symbol"
                color="offblack"
                className="w-6 lg:w-8"
              />
            </Circle>
          </Circle>
        </div>
        <div className="flex flex-col items-center justify-between gap-10">
          <Circle ref={icon1Ref}>{icon1}</Circle>
          <Circle ref={icon2Ref}>{icon2}</Circle>
          <Circle ref={icon3Ref}>{icon3}</Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={icon1Ref}
        toRef={centerLogoRef}
        curvature={-90}
        gradientStartColor={pathColor}
        gradientStopColor={pathColor}
        duration={3}
        pathWidth={3}
        {...path1Props}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={icon2Ref}
        toRef={centerLogoRef}
        gradientStartColor={pathColor}
        gradientStopColor={pathColor}
        delay={2}
        duration={3}
        pathWidth={3}
        {...path2Props}
      />
      <AnimatedBeam
        containerRef={containerRef}
        gradientStartColor={pathColor}
        gradientStopColor={pathColor}
        fromRef={icon3Ref}
        toRef={centerLogoRef}
        delay={4}
        curvature={90}
        duration={3}
        pathWidth={3}
        {...path3Props}
      />
    </div>
  )
}
