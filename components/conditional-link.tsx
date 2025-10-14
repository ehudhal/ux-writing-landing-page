'use client'
import Link, { LinkProps } from 'next/link'
import { ReactNode } from 'react'

interface ConditionalLinkProps extends Omit<LinkProps, 'href'> {
  href: string
  children: ReactNode
  disabled?: boolean
}

export function ConditionalLink({
  href,
  children,
  disabled = false,
  ...linkProps
}: ConditionalLinkProps) {
  if (disabled) {
    return <>{children}</>
  }

  return (
    <Link href={href} {...linkProps}>
      {children}
    </Link>
  )
}
