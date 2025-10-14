import { isProductionBuild } from '@/lib/env-utils'
import { Message } from 'ai'
import { BadgeInfo } from 'lucide-react'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'

export function DebugMessage({ message }: { message: Message }) {
  if (isProductionBuild()) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 z-10"
      >
        <Button variant="ghost" size="icon" className=" size-6 text-blue-500">
          <BadgeInfo className="size-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] overflow-y-auto text-xs prose">
        <div className="space-y-4 p-4">
          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-medium text-muted-foreground">
              Message ID
            </div>
            <div className="text-sm">{message.id}</div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-medium text-muted-foreground">
              Role
            </div>
            <div className="text-sm">{message.role}</div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="text-sm font-medium text-muted-foreground">
              Content
            </div>
            <pre className="rounded-md mt-0 mb-0 p-2 text-sm">
              {message.content}
            </pre>
          </div>

          {message.parts && (
            <div className="flex flex-col gap-1.5">
              <div className="text-sm font-medium text-muted-foreground">
                Parts
              </div>
              <pre className="rounded-md mt-0 mb-0 p-2 text-sm">
                {JSON.stringify(message.parts, null, 2)}
              </pre>
            </div>
          )}

          {message.toolInvocations && (
            <div className="flex flex-col gap-1.5">
              <div className="text-sm font-medium text-muted-foreground">
                Tool Invocations
              </div>
              <pre className="rounded-md  p-2 text-sm">
                {JSON.stringify(message.toolInvocations, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
