'use client'

type BillingToggleProps = {
  isAnnual: boolean
  onChange: (isAnnual: boolean) => void
}

export function BillingToggle({ isAnnual, onChange }: BillingToggleProps) {
  return (
    <div className="flex w-full rounded-lg bg-muted p-0.5">
      <button
        onClick={() => onChange(false)}
        className={`flex-1 cursor-pointer rounded-md py-1.5 text-sm font-medium transition-colors ${
          !isAnnual
            ? 'bg-white text-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted-foreground/10'
        }`}
      >
        Pay Monthly
      </button>
      <button
        onClick={() => onChange(true)}
        className={`flex-1 cursor-pointer rounded-md py-1.5 text-sm font-medium transition-colors ${
          isAnnual
            ? 'bg-white text-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted-foreground/10'
        }`}
      >
        Pay Annually
      </button>
    </div>
  )
}
