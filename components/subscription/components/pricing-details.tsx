import { ANNUAL_PRICE, MONTHLY_PRICE } from '@/lib/constants/prices'

interface PricingDetailsProps {
  licenses: number | null
  isAnnual: boolean
  memberCount: number
  onLicensesChange: (newValue: number) => void
}

function PricingDetailsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Number of Licenses Row Skeleton */}
      <div className="flex justify-between items-center gap-8">
        <span className="text-sm text-gray-600">Number of licenses</span>
        <div className="w-16 h-8 bg-gray-200 rounded-md"></div>
      </div>

      {/* Price per License Row Skeleton */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Price per license</span>
        <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
      </div>

      {/* Total Price Row Skeleton */}
      <div className="flex justify-between items-center border-t pt-4">
        <span className="text-sm font-medium">Total price</span>
        <div className="w-24 h-5 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  )
}

export function PricingDetails({
  licenses,
  isAnnual,
  memberCount,
  onLicensesChange
}: PricingDetailsProps) {
  // Return skeleton UI if licenses is null
  if (licenses === null) {
    return <PricingDetailsSkeleton />
  }

  return (
    <div className="space-y-4">
      {/* Number of Licenses Row */}
      <div className="flex justify-between items-center gap-8">
        <span className="text-sm text-gray-600">Number of licenses</span>
        <input
          type="number"
          min="1"
          max={memberCount}
          value={licenses}
          onChange={e => {
            const newValue = Math.min(
              memberCount,
              Math.max(1, parseInt(e.target.value) || 1)
            )
            onLicensesChange(newValue)
          }}
          className="w-16 text-center text-sm rounded-md border border-input bg-background px-2 py-1"
        />
      </div>

      {/* Price per License Row */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">Price per license</span>
        <span className="text-sm">
          ${isAnnual ? ANNUAL_PRICE : MONTHLY_PRICE}/month
          {isAnnual && ' (billed annually)'}
        </span>
      </div>
    </div>
  )
}

// Export constants for use in other components
export { ANNUAL_PRICE, MONTHLY_PRICE }
