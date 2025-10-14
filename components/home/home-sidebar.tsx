'use client'
import { Button } from '@/components/ui/button'
import { IconPRDKit } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
  Clock,
  Loader2,
  MessageCircleIcon,
  Notebook,
  Presentation,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  designsPageUrl,
  knowledgePageUrl,
  sharedDesignsPageUrl
} from '@/lib/app-routes'
import { useFocusOnKeyPress } from '@/lib/hooks/use-focus-on-key-press'
import PRDKitLogo from '../prdkit-logo'
import SubscriptionIndicator from '../subscription/subscription-indicator'
import { Skeleton } from '../ui/skeleton'
import { useHomePageMode } from './hooks/use-home-page-mode'
import { useHomePageSearch } from './hooks/use-home-page-search'
import KnowledgeNav from './knowledge-nav'
import UserMenuButton, { UserMenuButtonSkeleton } from './user-menu-button'
interface HomeSidebarProps {
  className?: string
  onLinkClick?: () => void
}

export default function HomeSidebar({
  className,
  onLinkClick
}: HomeSidebarProps) {
  const pathname = usePathname()

  const { mode } = useHomePageMode()

  const { onSearchChange, searchValue } = useHomePageSearch()

  const searchInputRef = useFocusOnKeyPress<HTMLInputElement>('/')

  return (
    <div
      className={cn(
        'hidden  h-full w-[300px] flex-col gap-4  bg-background-gray p-4 px-6 md:flex',
        className
      )}
    >
      <div className="mb-4 mt-2 flex h-12 items-center justify-between">
        <Link
          href={designsPageUrl()}
          className="flex items-center gap-3"
          onMouseDown={onLinkClick}
        >
          <PRDKitLogo className="h-6 w-min" />
        </Link>
        <SubscriptionIndicator />
      </div>
      <div className="relative ">
        <Input
          ref={searchInputRef}
          value={searchValue}
          placeholder="Search"
          className=" peer bg-white px-4 py-5 text-[16px] md:text-inherit"
          onChange={e => onSearchChange(e.target.value)}
        />

        <span className="absolute right-4 top-1/2 hidden aspect-square h-6 -translate-y-1/2 items-center justify-center rounded-sm  bg-muted text-sm opacity-100 transition-all peer-focus:opacity-0 md:flex ">
          /
        </span>
      </div>
      <div className="flex h-full flex-col">
        <nav className="flex-1 flex flex-col gap-2">
          <h4 className="text-sm font-medium text-offblack/60 ">Chats</h4>
          <ul className="flex flex-col justify-start gap-1">
            <MenuItem
              href={designsPageUrl()}
              icon={<MessageCircleIcon size={20} strokeWidth={1} />}
              title={'PRDs'}
              selected={pathname === designsPageUrl() && mode === 'my-designs'}
              onClick={onLinkClick}
            />
            <MenuItem
              href={sharedDesignsPageUrl()}
              icon={<Users size={20} strokeWidth={1} />}
              title={'Shared with me'}
              selected={mode === 'shared'}
              onClick={onLinkClick}
            />
            <MenuItem
              href={`${designsPageUrl()}?recent=true`}
              icon={<Clock size={20} strokeWidth={1} />}
              title={'Recent'}
              selected={mode === 'recent'}
              onClick={onLinkClick}
            />
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <section className="flex flex-col items-start gap-4 pt-4 ">
            <KnowledgeNav />
            <UserMenuButton />
          </section>
        </div>
      </div>
    </div>
  )
}

interface MenuItemProps {
  href: string
  title: string
  icon: React.ReactNode
  selected: boolean
  onClick?: () => void
}

const MenuItem = ({ href, icon, title, selected, onClick }: MenuItemProps) => {
  return (
    <li>
      <Link href={href}>
        <Button
          variant={'ghost'}
          onMouseDown={onClick}
          className={cn('flex w-full justify-start gap-3', {
            'font-medium': selected
          })}
        >
          {icon}
          {title}
        </Button>
      </Link>
    </li>
  )
}

export function HomeSidebarSkeleton() {
  return (
    <div
      className={cn(
        'hidden  h-full w-[300px] flex-col gap-4  bg-background-gray p-4 px-6 md:flex'
      )}
    >
      <div className="mb-4 mt-2 flex h-12 items-center gap-3">
        <IconPRDKit className="h-6 w-8" />
        <span className="font-serif sm:text-lg">{'PRDKit'}</span>
      </div>
      <div className="relative ">
        <Input placeholder="Search" className=" peer bg-white px-4 py-5" />
        <div
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-all'
          )}
        >
          <Loader2 className="size-4 animate-spin" />
        </div>
        <span className="absolute right-4 top-1/2 flex aspect-square h-6 -translate-y-1/2 items-center justify-center  rounded-sm bg-muted text-sm opacity-100 transition-all peer-focus:opacity-0 ">
          /
        </span>
      </div>
      <div className="flex h-full flex-col justify-between">
        <section className="flex flex-col gap-2">
          <h4 className="text-sm font-medium text-offblack/60">CHATS</h4>
          <ul className="flex h-full flex-col justify-start gap-1">
            <MenuItem
              href={designsPageUrl()}
              icon={<Presentation size={20} strokeWidth={1} />}
              title={'PRDs'}
              selected={false}
            />
            <MenuItem
              href={sharedDesignsPageUrl()}
              icon={<Users size={20} strokeWidth={1} />}
              title={'Shared with me'}
              selected={false}
            />
            <MenuItem
              href={`${designsPageUrl()}?recent=true`}
              icon={<Clock size={20} strokeWidth={1} />}
              title={'Recent'}
              selected={false}
            />
          </ul>
        </section>

        <section className="flex flex-col  items-start gap-4 border-t pt-4">
          <h4 className="text-sm font-medium text-offblack/60">
            <Skeleton className="h-5 w-24" />
          </h4>
          <ul className="flex size-full flex-col justify-start gap-1">
            <MenuItem
              href={knowledgePageUrl()}
              icon={<Notebook strokeWidth={1} />}
              title={'Knowledge'}
              selected={false}
            />
          </ul>
          <UserMenuButtonSkeleton />
        </section>
      </div>
    </div>
  )
}
