import { cn } from '@/lib/utils'
import Link from 'next/link'
import PRDKitLogo from '../prdkit-logo'
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
            <PRDKitLogo color="white" />
          </div>
          <div className="flex md:flex-row flex-col gap-2 md:gap-0 justify-center items-center space-x-2 lg:space-x-6 text-xs lg:text-sm  ">
            {links.map(link => (
              <Link
                href={link.href}
                key={link.label}
                className="text-white hover:black/5"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-white text-xs md:text-left text-center ml-4">
              © 2025 Chordio, Inc. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
