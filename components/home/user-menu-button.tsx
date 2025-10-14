/* eslint-disable @next/next/no-img-element */
'use client'
import { Button } from '@/components/ui/button'
import {
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { CurrentUserAvatar } from '@/components/user-avatar'
import { useIsMobile } from '@/lib/hooks/use-media-query'
import { cn } from '@/lib/utils'
import {
  SignOutButton,
  useOrganization,
  useOrganizationList,
  UserProfile,
  useUser
} from '@clerk/nextjs'
import { Dialog } from '@radix-ui/react-dialog'
import {
  Check,
  ChevronsUpDown,
  LogOut,
  Mail,
  Plus,
  Settings,
  User
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'

import { createOrganization } from '@/app/(app)/orgs/actions/org-actions'
import OrgCreationForm from '@/app/(app)/orgs/components/org-creation-form'
import { organizationProfileUrl } from '@/lib/app-routes'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import AddToSlackUserMenuButton from '../slack/add-to-slack-user-menu-button'
import { SubscriptionStatusCard } from '../subscription/subscription-indicator'
import VisuallyHidden from '../ui/visually-hidden'

export default function UserMenuButton() {
  const { organization } = useOrganization()
  const { user } = useUser()

  const [popoverOpen, setPopoverOpen] = useState(false)
  const [parent] = useAutoAnimate()
  const isMobile = useIsMobile()

  const { isLoaded, setActive, userMemberships, userInvitations } =
    useOrganizationList({
      userMemberships: {
        infinite: true
      },
      userInvitations: {
        infinite: true
      }
    })

  const posthog = usePostHog()

  if (!organization || !user) {
    return <UserMenuButtonSkeleton />
  }

  if (!isLoaded || userMemberships.isLoading) {
    return <UserMenuButtonSkeleton />
  }

  const userAvatarLabel =
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.emailAddresses[0].emailAddress

  const displayLabel =
    userAvatarLabel.length > 20
      ? `${userAvatarLabel.slice(0, 20)}...`
      : userAvatarLabel

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          variant={'outline'}
          className="flex size-full justify-between gap-4 rounded-xl p-2"
        >
          <CurrentUserAvatar />
          <div className="flex w-full flex-col ">
            <h5 className=" text-left  ">
              {user ? displayLabel : <Skeleton className="h-full w-10" />}
            </h5>
            <h6 className="text-left text-sm text-slate-500">
              {organization ? (
                `${organization.name}`
              ) : (
                <Skeleton className="h-full w-10" />
              )}
            </h6>
          </div>
          <ChevronsUpDown size={32} strokeWidth={1} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side={isMobile ? 'top' : 'right'}
        className="mb-4  rounded-lg p-0 shadow-none"
      >
        <div className="flex w-full flex-col items-start">
          <section className="w-full border-b p-2">
            <SubscriptionStatusCard />
          </section>
          <section className="w-full border-b" ref={parent}>
            <Link
              href={organizationProfileUrl()}
              onClick={() => setPopoverOpen(false)}
            >
              <Button
                variant={'ghost'}
                className="flex w-full justify-start gap-2 rounded-none py-6"
              >
                <Settings size={20} strokeWidth={1} />
                Organization Settings
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={'ghost'}
                  className="flex w-full justify-start gap-2 rounded-none py-6"
                >
                  <User size={20} strokeWidth={1} />
                  Account Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-min overflow-visible rounded-lg p-0">
                <VisuallyHidden>
                  <DialogTitle>Account Settings</DialogTitle>
                </VisuallyHidden>
                <UserProfile
                  routing="virtual"
                  appearance={{
                    variables: {
                      fontFamily: 'IBM Plex Sans, sans-serif'
                    },
                    elements: {
                      cardBox: {
                        boxShadow: 'none',
                        borderRadius: 0
                      },
                      menuItem__member: {
                        pointerEvents: 'auto'
                      }
                    }
                  }}
                />
              </DialogContent>
            </Dialog>
            <AddToSlackUserMenuButton />
          </section>
          <section className="w-full border-b">
            <h3 className="py-3  pl-4 text-sm text-slate-500">Organizations</h3>
            <div className="flex flex-col">
              {userMemberships.data?.map(mem => (
                <Button
                  variant={'ghost'}
                  key={mem.organization.id}
                  id={mem.organization.id}
                  className="group relative flex items-center justify-start  gap-4 rounded-none px-4 py-6 disabled:opacity-100"
                  disabled={mem.organization.id === organization.id}
                  onClick={() =>
                    setActive({
                      organization: mem.organization.id
                    })
                  }
                >
                  <Image
                    src={mem.organization.imageUrl}
                    alt={mem.organization.name}
                    width={32}
                    height={32}
                    className={cn('size-8 rounded-md', {
                      'outline-2 outline-slate-800 ':
                        mem.organization.id === organization.id
                    })}
                  />
                  <h5>{mem.organization.name}</h5>
                  <Check
                    size={16}
                    className={cn(
                      'absolute right-6 top-1/2 -translate-y-1/2 opacity-0 transition-opacity',
                      {
                        'opacity-0': mem.organization.id !== organization.id,
                        'opacity-100': mem.organization.id === organization.id
                      }
                    )}
                  />
                </Button>
              ))}
            </div>
            {userInvitations?.count > 0 && (
              <h3 className="py-3  pl-4 text-sm text-slate-500">
                Organization invitations
              </h3>
            )}
            <div className="flex flex-col">
              {userInvitations.data?.map(invitation => (
                <div
                  key={invitation.id}
                  className="group  flex items-center justify-start  gap-4  px-4 py-2"
                >
                  <img
                    src={invitation.publicOrganizationData.imageUrl}
                    className={'size-8 rounded-md'}
                    alt={invitation.publicOrganizationData.name}
                  />
                  <div className="text-sm">
                    {invitation.publicOrganizationData.name}
                  </div>
                  <Button
                    variant="link"
                    className="absolute right-2"
                    onClick={async () => {
                      await invitation.accept()
                      await userMemberships.revalidate()
                      await userInvitations.revalidate()
                    }}
                  >
                    Accept
                  </Button>
                </div>
              ))}
            </div>
            <Dialog>
              <DialogTrigger className="w-full" asChild>
                <Button
                  variant={'ghost'}
                  className="flex w-full justify-start gap-2 rounded-none py-6"
                >
                  <Plus size={20} strokeWidth={1} />
                  Create a new organization
                </Button>
              </DialogTrigger>
              <DialogContent>
                <VisuallyHidden>
                  <DialogTitle>Create a new organization</DialogTitle>
                </VisuallyHidden>
                <OrgCreationForm
                  className="w-full border-none shadow-none"
                  createOrganization={createOrganization}
                />
              </DialogContent>
            </Dialog>
          </section>
          <section className="w-full border-b">
            <a href="mailto:hello@prdkit.ai">
              <Button
                variant={'ghost'}
                className="flex w-full justify-start gap-2 rounded-none py-6"
              >
                <Mail size={20} strokeWidth={1} />
                Contact Us
              </Button>
            </a>
          </section>
          <section className="w-full border-b">
            <h3 className="py-2  pl-4 pt-4 text-sm text-slate-500">
              {user.emailAddresses[0].emailAddress}
            </h3>
            <div className="flex items-center gap-2 px-4 py-2">
              <CurrentUserAvatar className="size-8" />
              <h5 className="text-sm">{displayLabel}</h5>
            </div>
            <SignOutButton>
              <Button
                variant={'ghost'}
                className="flex w-full justify-start gap-2 rounded-none py-6"
                onClick={() => {
                  posthog.reset()
                }}
              >
                <LogOut size={20} strokeWidth={1} />
                Logout
              </Button>
            </SignOutButton>
          </section>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function UserMenuButtonSkeleton() {
  return (
    <Button
      variant={'outline'}
      className="flex size-full justify-between gap-4 rounded-xl p-2"
    >
      <Skeleton className="aspect-square size-10 min-h-10 min-w-10 rounded-full" />
      <div className="flex w-full flex-col gap-2 ">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <ChevronsUpDown size={32} strokeWidth={1} />
    </Button>
  )
}
