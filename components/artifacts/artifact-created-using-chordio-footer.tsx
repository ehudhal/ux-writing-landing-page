import { cn } from '@/lib/utils'
import Link from 'next/link'
import PRDKitLogo from '../prdkit-logo'
import { Button } from '../ui/button'

export function ArtifactCreatedUsingPRDKitFooter({
  className
}: {
  className?: string
}) {
  return (
    <div
      className={cn('flex w-full items-center justify-center mb-4', className)}
    >
      <Button
        variant="ghost"
        className="flex text-sm text-gray-500 font-light"
        asChild
      >
        <Link href={'/'} target="_blank">
          <div className="flex items-center gap-2">
            Created using <PRDKitLogo className="h-4 text-gray-500 w-min" />
          </div>
        </Link>
      </Button>
    </div>
  )
}
