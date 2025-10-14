'use client'

import { useDesignPermission } from '@/lib/hooks/use-design-permission'
import { cn } from '@/lib/utils'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { Button, ButtonProps } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { DesignActions, DesignActionsProps } from './design-actions'

type DesignActionsMenuProps = Omit<
  DesignActionsProps,
  'removeDesign' | 'createPublicShareLink' | 'setDesignSharePolicy'
> &
  ButtonProps & {
    children?: React.ReactNode
    className?: string
    icon?: React.ReactNode
    side?: 'left' | 'right' | 'top' | 'bottom'
  }

export default function DesignActionMenu({
  design,
  className,
  icon,
  children,
  side = 'bottom',
  shownActions = ['share'],
  ...rest
}: DesignActionsMenuProps) {
  const [open, setOpen] = useState(false)

  const userPermissions = useDesignPermission(design)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {userPermissions.write && (
          <Button
            onClick={() => setOpen(!open)}
            variant={'ghost'}
            className={cn(className, 'aspect-square size-8 rounded-sm p-0')}
            {...rest}
          >
            {icon ?? (
              <EllipsisVertical
                className="fill-black"
                strokeWidth={1}
                size={18}
              />
            )}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side} className="rounded-xl p-0">
        {children}

        {userPermissions.write && (
          <DesignActions shownActions={shownActions} design={design} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
