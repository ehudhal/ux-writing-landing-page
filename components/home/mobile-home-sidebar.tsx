'use client'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import HomeSidebar from './home-sidebar'

export const MobileHomeSidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <div className="flex aspect-square size-8 items-center justify-center rounded-md p-0 md:hidden">
          <Menu strokeWidth={1} size={20} />
        </div>
      </SheetTrigger>
      <SheetContent onOpenAutoFocus={e => e.preventDefault()}>
        <DialogTitle className="sr-only">Sidebar</DialogTitle>
        <HomeSidebar
          className="flex w-full bg-transparent px-0"
          onLinkClick={() => {
            setOpen(false)
          }}
        />
      </SheetContent>
    </Sheet>
  )
}
