'use client'
import {
  SignOutButton,
  useOrganization,
  useOrganizationList
} from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

export function SwitchDifferentOrg() {
  const { organization } = useOrganization()

  const { setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  })

  const [pending, startTransition] = useTransition()
  const [selectedOrgId, setSelectedOrgId] = useState<string | undefined>(
    organization?.id
  )

  if (
    !organization ||
    !userMemberships ||
    !userMemberships.data ||
    !setActive
  ) {
    return null
  }

  if (
    userMemberships.data.filter(org => org.organization.id !== organization.id)
      .length === 0
  ) {
    return (
      <Button variant={'ghost'} asChild>
        <li
          key={'logout'}
          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2  rounded-full"
        >
          <LogOutIcon className="size-4" />
          <h3>Logout</h3>
        </li>
      </Button>
    )
  }

  const getOrg = (orgId: string) => {
    return userMemberships.data.find(org => org.organization.id === orgId)
  }

  const handleOrgChange = (orgId: string) => {
    setSelectedOrgId(orgId)
    startTransition(() => {
      setActive({
        organization: orgId
      })
    })
  }

  return (
    <div className=" flex w-[400px] max-w-[90vw]  flex-col ">
      <div className="flex w-full items-center gap-2">
        <div className="h-px w-full bg-offblack" />
        <h2 className="font-serif">Or</h2>
        <div className="h-px w-full bg-offblack" />
      </div>
      <div className="flex flex-col">
        <h2 className=" py-4 font-serif ">
          Switch to a different organization
        </h2>
        <Select
          disabled={pending}
          onValueChange={handleOrgChange}
          value={selectedOrgId}
        >
          <SelectTrigger className="w-full rounded-full pl-2 pr-4">
            {selectedOrgId ? (
              <div className="flex items-center gap-2">
                <Avatar className="size-6">
                  <AvatarImage
                    src={getOrg(selectedOrgId)?.organization.imageUrl}
                  />
                </Avatar>
                <h3>{getOrg(selectedOrgId)?.organization.name}</h3>
              </div>
            ) : (
              <SelectValue
                className="ml-2"
                placeholder="Select an organization"
              />
            )}
          </SelectTrigger>
          <SelectContent className="rounded-2xl shadow-none">
            {userMemberships.data
              .filter(org => org.organization.id !== organization.id)
              .map(org => (
                <SelectItem
                  key={org.id}
                  value={org.organization.id}
                  className="flex items-center justify-start gap-2 rounded-full pl-2"
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={org.organization.imageUrl} />
                    </Avatar>
                    {org.organization.name}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <SignOutButton>
          <Button variant={'ghost'} asChild>
            <li
              key={'logout'}
              className="mt-4  flex cursor-pointer items-center justify-center gap-2  rounded-full"
            >
              <LogOutIcon className="size-4" />
              <h3>Logout</h3>
            </li>
          </Button>
        </SignOutButton>
      </div>
    </div>
  )
}
