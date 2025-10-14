import { HomePageMode } from '@/components/home/hooks/use-home-page-mode'
import { organizationMembersUrl } from '@/lib/app-routes'
import { useIsOrgAdmin } from '@/lib/hooks/use-is-org-admin'
import { useOrganization } from '@clerk/nextjs'
import { MessageCircleIcon, Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { NoSearchResults } from '../home/no-results-found'

const MyChats = () => {
  return (
    <div className="mx-auto -mt-8 flex h-full max-w-[400px] flex-col items-center justify-center gap-3">
      <div className="flex size-16 items-center justify-center rounded-full bg-background-gray">
        <MessageCircleIcon strokeWidth={1} />
      </div>
      <h3 className=" font-bold">Draft your first PRD</h3>
      <p className="max-w-[300px] text-center md:max-w-[400px]">
        Start a new PRD and tell PRDKit what you&apos;d like to spec.
        <br /> PRDKit will help you transform your concept into a structured
        product requirements document.
      </p>
    </div>
  )
}

const useIsOrgAdminAndOnlyMember = () => {
  const [isOnlyMember, setIsOnlyMember] = useState<null | boolean>(null)
  const { organization } = useOrganization()
  const isOrgAdmin = useIsOrgAdmin()

  useEffect(() => {
    if (organization) {
      organization.getMemberships().then(memberships => {
        if (memberships.total_count === 1) {
          setIsOnlyMember(true)
        }
      })
    }
  }, [organization])

  const isOrgAdminAndOnlyMember = Boolean(isOrgAdmin && isOnlyMember)

  return isOrgAdminAndOnlyMember
}

const Shared = () => {
  const isOrgAdminAndOnlyMember = useIsOrgAdminAndOnlyMember()

  return (
    <div className="mx-auto -mt-8 flex h-full max-w-[400px] flex-col items-center justify-center gap-3">
      <div className="flex size-16 items-center justify-center rounded-full bg-background-gray">
        <Users strokeWidth={1} />
      </div>
      <h3 className=" font-bold">Shared PRDs</h3>
      <p className="max-w-[300px] text-center md:max-w-[400px]">
        PRDs that others share with you will appear here.
        {isOrgAdminAndOnlyMember && (
          <>
            <Link
              href={organizationMembersUrl()}
              className="cursor-pointer underline decoration-slate-300 transition hover:decoration-slate-700"
            >
              <br />
              Invite team members
            </Link>{' '}
            to start collaborating.
          </>
        )}
      </p>
    </div>
  )
}

export const EmptyStateByHomePageMode = ({
  mode
}: {
  mode: HomePageMode | 'no-results' | 'my-designs-without-products'
}) => {
  const options = {
    'no-results': <NoSearchResults />,
    'my-designs': <MyChats />,
    shared: <Shared />,
    recent: <MyChats />,
    'my-designs-without-products': <MyChats />
  }
  return options[mode]
}
