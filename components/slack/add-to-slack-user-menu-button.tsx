import { shouldPromptForSlackInstallation } from '@/lib/actions/slack-installation-actions'
import { useIsOrgAdmin } from '@/lib/hooks/use-is-org-admin'
import { useOrganization } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { IconSlack } from '../ui/icons'

export default function AddToSlackUserMenuButton() {
  const isOrgAdmin = useIsOrgAdmin()
  const { organization } = useOrganization()
  const { data: shouldPromptSlackInstallation, isLoading } = useQuery({
    queryKey: ['slack-installation'],
    enabled: Boolean(organization) && isOrgAdmin,
    queryFn: () => shouldPromptForSlackInstallation(organization!.id)
  })

  if (!isOrgAdmin || !shouldPromptSlackInstallation || isLoading) return null

  return (
    <Button
      variant={'ghost'}
      className="relative flex w-full justify-start gap-[10px] rounded-none py-6 pl-[18px]"
      asChild
    >
      <a href="/api/slack/install">
        <IconSlack className="size-4" strokeWidth={1} />
        Add PRDKit to Slack
      </a>
    </Button>
  )
}
