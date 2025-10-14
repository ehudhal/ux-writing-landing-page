'use client'

import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import PRDKitLogo from '../prdkit-logo'
import { Button } from '../ui/button'
import { IconPRDKit } from '../ui/icons'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'

export default function HomepageHeader() {
  return (
    <div className=" w-full bg-transparent">
      <DesktopVersion />
      <MobileVersion />
    </div>
  )
}

function DesktopVersion() {
  return (
    <div className="hidden relative justify-between p-6  md:p-10 md:pb-4 lg:flex">
      <Link href="/" className="flex items-center gap-0">
        <PRDKitLogo color="offblack" />
      </Link>
      <div className="flex items-center gap-8 xl:absolute xl:right-1/2 xl:translate-x-1/2 p-0 h-10">
        {[
          {
            label: 'Features',
            href: '/#features'
          },
          {
            label: 'Workflows',
            href: '/#workflows'
          },
          {
            label: 'Integrations',
            href: '/#integrations'
          },
          {
            label: 'Security',
            href: '/#security'
          },
          {
            label: 'Pricing',
            href: '/pricing'
          }
        ].map(item => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <Button className="px-12 py-5 w-38" variant="outline">
          Sign in
        </Button>
        <Button className="px-12 py-5 w-38">Get started</Button>
      </div>
    </div>
  )
}

function MobileVersion() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex justify-between p-6 pb-4 md:p-10 lg:hidden">
      <Link href="/" className="flex items-center gap-0">
        <IconPRDKit className="h-auto w-8 md:w-12" />
        <span className="font-light text-offblack sm:text-2xl">{'PRDKit'}</span>
      </Link>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        aria-label="Open navigation menu"
        className="relative px-0 hover:bg-transparent"
      >
        <Menu strokeWidth={1} />
      </Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <VisuallyHidden>
          <SheetTitle>Navigation menu</SheetTitle>
        </VisuallyHidden>
        <SheetContent
          side="top"
          className="flex flex-col gap-6 [&>button[data-component=sheet-close]]:hidden"
        >
          <header className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-0">
              <IconPRDKit className="h-auto w-10 md:w-12" />
              <span className="font-light text-offblack sm:text-2xl">
                {'PRDKit'}
              </span>
            </Link>
          </header>
          <nav className="flex flex-col gap-2 px-4">
            <Link href="/about" className="text-lg ">
              About
            </Link>
            <Link href="/pricing" className="text-lg ">
              Pricing
            </Link>

            <Link href="/partnerships" className="text-lg ">
              Partnerships
            </Link>
          </nav>
          <Button
            className="w-full bg-chordio-blue px-8 text-offblack hover:bg-[#8fbbc4] md:px-12"
            onClick={() => setIsOpen(false)}
          >
            Sign in
          </Button>
        </SheetContent>
      </Sheet>
    </div>
  )
}
