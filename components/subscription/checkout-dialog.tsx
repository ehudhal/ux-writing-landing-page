'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import Link from 'next/link'
import { useState } from 'react'

import { pricingPageUrl } from '@/lib/app-routes'
import { useCheckoutUrl } from '@/lib/hooks/use-checkout-url'
import { BillingToggle } from './billing-toggle'
import { PlanFeatures } from './components/plan-features'
import { PricingDetails } from './components/pricing-details'
import { useOrganizationMemberCount } from './hooks/use-organization-member-count'

export default function CheckoutDialog({
  variant = 'default',
  className
}: {
  variant?:
    | 'default'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
  className?: string
}) {
  // Dialog state
  const [open, setOpen] = useState(false)

  // Form state
  const [isAnnual, setIsAnnual] = useState(true)
  const [licenses, setLicenses] = useState<number | null>(null)

  // Data fetching hooks
  const {
    memberCount,
    loading: loadingMembers,
    fetchMemberCount
  } = useOrganizationMemberCount()
  const {
    checkoutUrl,
    loading: loadingCheckout,
    fetchCheckoutUrl
  } = useCheckoutUrl()

  // Handle dialog open
  const handleDialogOpen = async (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      const count = await fetchMemberCount()
      setLicenses(count)
      await fetchCheckoutUrl(count, isAnnual)
    }
  }

  // Handle billing period change
  const handleBillingPeriodChange = (value: boolean) => {
    if (!licenses) {
      return
    }
    setIsAnnual(value)
    fetchCheckoutUrl(licenses, value)
  }

  // Handle licenses change
  const handleLicensesChange = (newValue: number) => {
    if (!licenses) {
      return
    }
    setLicenses(newValue)
    fetchCheckoutUrl(newValue, isAnnual)
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          Upgrade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogTitle className="sr-only">Upgrade Subscription</DialogTitle>
        <div className="space-y-4">
          {/* Plan Features */}
          <PlanFeatures />

          {/* View All Plans Link */}
          <div className="text-center">
            <Link
              href={pricingPageUrl()}
              className="text-sm text-gray-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View all plans
            </Link>
          </div>

          {/* Team Member Info */}
          <div className="text-sm text-muted-foreground">
            {loadingMembers ? (
              'Loading team member count...'
            ) : (
              <>
                Your team has {memberCount} members.{' '}
                <Link
                  href="/organization-profile/organization-members"
                  className="text-primary hover:underline"
                  onClick={() => setOpen(false)}
                >
                  View and manage team members
                </Link>
              </>
            )}
          </div>

          {/* Billing Toggle */}
          <BillingToggle
            isAnnual={isAnnual}
            onChange={handleBillingPeriodChange}
          />

          {/* Pricing Details */}
          <PricingDetails
            licenses={licenses}
            isAnnual={isAnnual}
            memberCount={memberCount}
            onLicensesChange={handleLicensesChange}
          />

          {/* Checkout Button */}
          <Link
            href={checkoutUrl ?? '#'}
            className="flex justify-center"
            prefetch={false}
            target="_blank"
            onClick={e => {
              if (!checkoutUrl) {
                e.preventDefault()
                return
              }
              setOpen(false)
            }}
          >
            <Button disabled={loadingCheckout} className="w-full">
              {loadingCheckout ? 'Loading...' : 'Proceed to Checkout'}
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
