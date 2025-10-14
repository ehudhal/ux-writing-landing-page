'use client'
import { useIsOrgAdmin } from '@/lib/hooks/use-is-org-admin'
import { Loader2 } from 'lucide-react'

import { useCreditsInfo } from '../home/hooks/use-credits-info'
import SmallRadialChart from '../small-radial-chart'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import CheckoutDialog from './checkout-dialog'

export default function SubscriptionIndicator() {
  const { data, isLoading } = useCreditsInfo()

  if (process.env.NEXT_PUBLIC_DISABLE_USAGE_LICENSES === 'true') {
    return (
      <div className="text-xs uppercase text-red-400">Licenses Disabled</div>
    )
  }

  if (!data || isLoading) {
    return (
      <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-white p-2 text-xs">
        <Loader2 className="size-4 animate-spin" strokeWidth={1} />
      </div>
    )
  }

  const usagePercentage = (data.creditsUsage / data.credits) * 100

  // Only show if on free plan AND usage is above 80%
  if (data.isActive && usagePercentage < 80) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex aspect-square size-8 cursor-pointer items-center justify-center rounded-full p-2 text-xs focus:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <SmallRadialChart
                  barColor="#694794"
                  value={data.creditsUsage}
                  maxValue={data.credits}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>{Math.round(usagePercentage)}% used</TooltipContent>
          </Tooltip>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="mt-1 w-64 rounded-xl py-2 pr-2 shadow-xs"
      >
        <SubscriptionStatusCard />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function SubscriptionStatusCard({
  showOnlyNearCapacity = false
}: {
  showOnlyNearCapacity?: boolean
}) {
  const { data, isLoading } = useCreditsInfo()
  const isAdmin = useIsOrgAdmin()

  if (process.env.NEXT_PUBLIC_DISABLE_USAGE_LICENSES === 'true') {
    return (
      <div className="text-xs uppercase text-red-400 p-1 text-center">
        Licenses Disabled
      </div>
    )
  }

  if (isLoading) {
    return showOnlyNearCapacity ? null : (
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-white p-2 text-xs">
            <Loader2 className="size-4 animate-spin" strokeWidth={1} />
          </div>
          <div className="flex w-full flex-col">
            <h6 className="text-sm font-medium">Credits Usage</h6>
          </div>
        </div>
        <Button
          variant="ghost"
          className="h-min rounded-lg p-2 text-xs text-[#694794]"
        >
          Contact admin
        </Button>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const usagePercentage = (data.creditsUsage / data.credits) * 100
  const isFullyUtilized = usagePercentage >= 100

  // If showOnlyNearCapacity is true and usage is below 80%, don't render
  if (showOnlyNearCapacity && usagePercentage < 80) {
    return null
  }

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <SmallRadialChart
                barColor="#694794"
                value={data.creditsUsage}
                maxValue={data.credits}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>{Math.round(usagePercentage)}% used</TooltipContent>
        </Tooltip>
        <div className="flex w-full flex-col">
          <h6 className="text-sm font-medium">
            <span>
              {data.creditsUsage}/{data.credits} credits
            </span>
            {data.extraCredits > 0 && (
              <span className="ml-1 text-emerald-700 font-medium text-xs">
                + {data.extraCredits} bonus
              </span>
            )}
          </h6>
          <p className="text-xs text-grey-04">
            {data.isActive ? 'Premium Plan' : 'Free Plan'}
          </p>
        </div>
      </div>
      {isAdmin ? (
        !data.isOrgSubscriptionActive && (
          <CheckoutDialog
            variant="ghost"
            className="h-min rounded-lg p-2 text-xs text-[#694794]"
          />
        )
      ) : isFullyUtilized ? (
        <Button
          variant="ghost"
          className="h-min rounded-lg p-2 text-xs text-[#694794]"
          disabled
        >
          Contact admin
        </Button>
      ) : null}
    </div>
  )
}
