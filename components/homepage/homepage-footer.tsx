import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
const links = [
  {
    label: 'Terms',
    href: '/terms'
  },
  {
    label: 'Privacy',
    href: '/privacy'
  },
  {
    label: 'Contact Us',
    href: 'mailto:hello@prdkit.ai'
  }
]

const variantLinks = [
  {
    label: 'PRDKit',
    href: '/'
  },
  {
    label: 'Chordio',
    href: '/chordio'
  }
]

export default function HomepageFooter({
  className,
  variant = 'full'
}: {
  className?: string
  variant?: 'short' | 'full'
}) {
  return (
    <footer className={cn('font-sans bg-offwhite', className)}>
      <div
        className={cn(
          'bg-offblack px-16 rounded-t-[150px] hidden md:block md:rounded-t-full  h-[clamp(115px,15vw,128px)]',
          {
            'h-[5vh]': variant === 'short'
          }
        )}
      ></div>
      <div className={`flex items-end py-8 justify-end bg-offblack px-16`}>
        <div className="mx-auto flex size-full flex-col items-center justify-between gap-4 md:py-6  md:h-min md:flex-row  md:justify-between md:gap-0">
          <div className="flex items-center gap-2">
            <Image src="/chordio-logo-full-white.svg" alt="Chordio" width={129} height={33} />
          </div>
          <div className="flex md:flex-row flex-col gap-4 md:gap-0 justify-center items-center text-xs lg:text-sm">
            <div className="flex gap-2 items-center">
              <span className="text-white/50 text-xs">Variants:</span>
              {variantLinks.map(link => (
                <Link
                  href={link.href}
                  key={link.label}
                  className="text-white hover:text-white/80 underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex gap-2 md:gap-0 md:space-x-6">
              {links.map(link => (
                <Link
                  href={link.href}
                  key={link.label}
                  className="text-white hover:black/5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <span className="text-white text-xs md:text-left text-center">
              © 2025 Chordio, Inc. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
