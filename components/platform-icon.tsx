import { cn } from '@/lib/utils'
import { Users } from 'lucide-react'
import {
  IconFacebook,
  IconInstagram,
  IconLinkedin,
  IconProductHunt,
  IconX
} from './ui/icons'

type Autocomplete<T extends string> = T | (string & {})

const createIconByPlatform = (className?: string) => {
  const record: Record<string, React.ReactNode> = {
    'X (Twitter)': <IconX className={className} />,
    LinkedIn: <IconLinkedin className={className} />,
    'Product Hunt': <IconProductHunt className={className} />,
    Facebook: <IconFacebook className={className} />,
    Instagram: <IconInstagram className={className} />
  }
  return record
}

type Platform = Autocomplete<keyof ReturnType<typeof createIconByPlatform>>

export function PlatformIcon({
  platform,
  className,
  fallback
}: {
  platform: Platform
  className?: string
  fallback?: React.ReactNode
}) {
  const iconByPlatform = createIconByPlatform(className)
  const map = new Map(Object.entries(iconByPlatform))
  if (!map.has(platform)) {
    if (fallback) {
      return fallback
    }
    return <Users className={cn('size-4', className)} />
  }
  return map.get(platform)
}
