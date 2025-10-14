'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface RadialProgressProps {
  value: number
  className?: string
}

export function RadialProgress({ value, className }: RadialProgressProps) {
  return (
    <div className={cn('relative size-5', className)}>
      <Check
        strokeWidth={1}
        className={cn(
          'absolute left-1/2 top-1/2 z-20 size-4 shrink-0 -translate-x-1/2 -translate-y-1/2 text-background opacity-0 transition-all duration-500',
          {
            'opacity-100': value >= 100
          }
        )}
      />
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={cn(
            'stroke-current text-gray-200 transition-all duration-500 dark:text-neutral-700',
            {
              'fill-green-700': value >= 100
            }
          )}
          strokeWidth={value >= 100 ? 0 : 4}
        ></circle>

        {/* <!-- Progress Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className={cn(
            ' stroke-current text-green-700 transition-all duration-500',
            {
              'text-green-700': value >= 100
            }
          )}
          strokeWidth="4"
          strokeDasharray="100"
          strokeDashoffset={100 - value}
          strokeLinecap="round"
        ></circle>
      </svg>
    </div>
  )
}
