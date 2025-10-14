'use client'

import { useScreenList } from '@/lib/hooks/use-screen-list'
import { cn } from '@/lib/utils'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '../ui/button'
import { Toggle } from '../ui/toggle'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

export default function MobileToggleScreenList() {
  const { isSidebarOpen, toggleSidebar } = useScreenList()

  return (
    <div className="md:hidden">
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={isSidebarOpen}
            onPressedChange={toggleSidebar}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'flex aspect-square gap-2 rounded-md p-2'
            )}
          >
            <ArrowLeft size={18} strokeWidth={1} />
            Show screen list
          </Toggle>
        </TooltipTrigger>
        <TooltipContent>
          <p>Show screen list</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
