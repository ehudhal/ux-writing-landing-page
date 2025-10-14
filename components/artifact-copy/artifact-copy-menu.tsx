'use client'
import { ChevronDown, Copy } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export const ArtifactCopyMenu = ({
  children
}: {
  children: React.ReactNode
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 p-0 text-xs flex items-center h-8 px-3 rounded-md"
        >
          <Copy className="size-3" strokeWidth={1.5} />
          Copy <ChevronDown className="size-3" strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 p-0 flex flex-col gap-1">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
