/*
  BACKOFFICE PAGE: Organization Subscription Management
*/

import React from 'react'
import { Organization, currentUser } from '@clerk/nextjs/server'
import { notFound, redirect } from 'next/navigation'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  getOrganizationSubscription,
  setOrganizationSubscription
} from '../backoffice-actions'

import { clerkClient } from '@clerk/express'

import { OrgSubscription } from '@/lib/db-schema/org-subscriptions'
import SubscriptionForm from './subscription-form'
import { Toaster } from '@/components/ui/sonner'
import { Metadata } from 'next'

interface OrgMgmtPageProps {
  searchParams: Promise<{
    orgId: string
  }>
}

export const metadata: Metadata = {
  title: 'Backoffice: organization subscription management'
}

export default async function OrgSubscriptionManagementPage(
  props: OrgMgmtPageProps
) {
  const user = await currentUser()

  if (!user || !user.privateMetadata || !user.privateMetadata.chordioAdmin)
    notFound()

  async function search(formData: FormData) {
    'use server'
    const orgId = formData.get('orgId') as string

    if (!orgId) {
      return
    }

    redirect(`/-/bo/org/?orgId=${orgId} `)
  }

  const { orgId } = await props.searchParams

  let subscription: OrgSubscription | null = null
  let organization: Organization | null = null

  if (orgId) {
    const subscriptionResponse = await getOrganizationSubscription(orgId)
    if (!(subscriptionResponse && 'error' in subscriptionResponse)) {
      subscription = subscriptionResponse
    }

    organization = await clerkClient.organizations.getOrganization({
      organizationId: orgId
    })
  }

  return (
    <>
      <Toaster />
      <main className="flex flex-col items-center gap-4 p-6">
        <form className="flex items-center gap-2" action={search}>
          <Input
            type="text"
            name="orgId"
            placeholder="Organization ID"
            defaultValue={orgId}
          />
          <Button type="submit" variant="outline">
            Search
          </Button>
        </form>

        {orgId && !organization && <div>Organization not found!</div>}
        {organization && subscription && (
          <SubscriptionForm
            subscription={subscription}
            organization={{ name: organization.name }}
            updateOrganization={setOrganizationSubscription}
          />
        )}
      </main>
    </>
  )
}
