'use client'
import useOrganizationMembers from '@/lib/hooks/use-organization-members'
import { useUser } from '@clerk/nextjs'
import { UserIcon } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'

export function CurrentUserAvatar({ className }: { className?: string }) {
  const { user } = useUser()

  if (!user) return <DefaultUserAvatar className={className} />
  return (
    <Avatar className={className}>
      <AvatarImage src={user.imageUrl} className="object-cover" />
    </Avatar>
  )
}

export function OrganizationUserAvatar({
  userId,
  className
}: {
  userId: string
  className?: string
}) {
  const members = useOrganizationMembers()

  if (!members) return <DefaultUserAvatar className={className} />

  const membership = members.find(m => m.publicUserData?.userId === userId)

  if (!membership || !membership.publicUserData) {
    return <DefaultUserAvatar className={className} />
  }

  return (
    <Avatar className={className}>
      <AvatarImage
        src={membership.publicUserData.imageUrl}
        className="object-cover"
      />
    </Avatar>
  )
}

export function DefaultUserAvatar({ className }: { className?: string }) {
  return (
    <Avatar className={className}>
      <UserIcon strokeWidth={1} />
    </Avatar>
  )
}
