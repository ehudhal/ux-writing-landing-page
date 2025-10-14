import { SharePolicyType } from '@/lib/db-schema/designs'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import ChooseSharePolicy from './choose-share-policy'

export function SharePopover({
  children,
  onOpenChange,
  onUpdateSharePolicy,
  open,
  sharePolicy
}: {
  children: React.ReactNode
  onUpdateSharePolicy: (policy: SharePolicyType) => void
  onOpenChange: (open: boolean) => void
  open: boolean
  sharePolicy: SharePolicyType
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent align="start" side="right" className="rounded-xl">
        <ChooseSharePolicy
          onUpdateSharePolicy={onUpdateSharePolicy}
          sharePolicy={sharePolicy}
        />
      </PopoverContent>
    </Popover>
  )
}
