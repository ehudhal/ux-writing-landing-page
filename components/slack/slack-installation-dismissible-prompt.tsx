'use client'
import { shouldPromptForSlackInstallation } from '@/lib/actions/slack-installation-actions'
import { useOrganization } from '@clerk/nextjs'
import { useQuery } from '@tanstack/react-query'
import { UnplugIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'
import { DismissableBanner } from '../ui/dismissable-banner'
import { IconSlack } from '../ui/icons'

export default function SlackInstallationDismissiblePrompt() {
  const { organization } = useOrganization()

  const { data: shouldPromptSlackInstallation, isLoading } = useQuery({
    queryKey: ['slack-installation'],
    enabled: Boolean(organization),
    queryFn: () => shouldPromptForSlackInstallation(organization!.id)
  })

  return (
    <DismissableBanner
      id="slack-installation-prompt"
      hide={!shouldPromptSlackInstallation || isLoading}
    >
      <Card className="bg-background-gray">
        <CardHeader>
          <CardTitle className="text-lg">
            <div className="flex items-center gap-2">
              Connect PRDKit to <IconSlack className="size-4" />
              Slack
            </div>
          </CardTitle>
          <CardDescription className="pr-16">
            Add PRDKit to Slack to start using it directly in your workspace.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="flex items-center gap-2" asChild>
            <Link href={'/api/slack/install'} prefetch={false}>
              <UnplugIcon className="size-4 text-offblack" />
              Add to Slack
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </DismissableBanner>
  )
}
