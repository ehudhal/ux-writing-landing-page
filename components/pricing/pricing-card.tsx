import { cn } from '@/lib/utils'
import { SignUpButton, useAuth } from '@clerk/nextjs'
import { Check } from 'lucide-react'

interface PricingCardProps {
  title: string
  price?: string
  priceSubtext?: React.ReactNode
  variant?: 'white' | 'premium' | 'enterprise'
  features?: string[]
  buttonText: string
}

export default function PricingCard({
  title,
  price,
  priceSubtext,
  variant = 'white',
  features,
  buttonText
}: PricingCardProps) {
  const { isSignedIn } = useAuth()

  return (
    <div
      style={{
        backgroundColor:
          variant === 'premium'
            ? '#B9EBE6'
            : variant === 'enterprise'
              ? '#DBE7F4'
              : 'white'
      }}
      className={cn(
        'rounded-4xl p-8 flex flex-col h-full w-full',
        variant === 'enterprise' && 'gradient-bg grain-effect-fade'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="mb-16 h-10">
          <div className="flex items-center whitespace-nowrap justify-between">
            <h2 className="text-4xl font-medium">{title}</h2>
          </div>
        </div>
        <div className="mb-8 font-serif flex">
          <span className="text-4xl font-light">{price}</span>
          <span className="text-gray-600 text-sm ml-2 flex items-end">
            {priceSubtext}
          </span>
        </div>
        {features && (
          <ul className="text-sm space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 mr-1 text-gray-400 " /> {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-8">
          {variant === 'enterprise' ? (
            <a
              href="mailto:sales@prdkit.ai"
              className="block w-full py-4 px-4 rounded-full bg-offblack text-white text-center"
            >
              {buttonText}
            </a>
          ) : isSignedIn ? null : (
            <SignUpButton mode="modal">
              <button className="block w-full py-4 px-4 rounded-full text-center border border-offblack bg-transparent cursor-pointer">
                {buttonText}
              </button>
            </SignUpButton>
          )}
        </div>
      </div>
    </div>
  )
}
