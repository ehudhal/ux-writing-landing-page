'use client'

import { ANNUAL_PRICE, MONTHLY_PRICE } from '@/lib/constants/prices'
import { useState } from 'react'
import PricingCard from './pricing-card'

export default function Plans() {
  const [isYearly, setIsYearly] = useState(true)

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1  bg-[#EBEBE9] rounded-full border border-gray-300">
          <button
            className={`py-2 px-8 rounded-full transition-colors cursor-pointer ${
              !isYearly ? 'bg-gray-700 text-offwhite' : ''
            }`}
            onClick={() => setIsYearly(false)}
          >
            Monthly
          </button>
          <button
            className={`px-8 py-2 rounded-full transition-colors cursor-pointer ${
              isYearly ? 'bg-gray-700 text-offwhite' : ''
            }`}
            onClick={() => setIsYearly(true)}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-full overflow-x-hidden">
        <PricingCard
          title="Free"
          price="$0"
          variant="white"
          buttonText="Get started"
          features={[
            'AI-powered PRDs',
            'Visual user flows',
            'Launch-ready content',
            'Export to Bolt.new, Loveable, Cursor',
            'Public and private shareable links',
            `${process.env.NEXT_PUBLIC_UNLICENSED_CREDITS} credits`
          ]}
        />

        <PricingCard
          title="Premium"
          price={isYearly ? `$${ANNUAL_PRICE}` : `$${MONTHLY_PRICE}`}
          priceSubtext={
            isYearly ? (
              <span>
                per seat/month <br /> (billed yearly)
              </span>
            ) : (
              <span className="mb-1">per seat/month</span>
            )
          }
          variant="premium"
          buttonText="Get started"
          features={[
            'Everything in Free, plus:',
            '10x monthly limit',
            'Team workspace',
            'Shared team knowledge',
            'Slack bot',
            'Admin tools & priority support'
          ]}
        />

        <PricingCard
          title="Enterprise"
          price="Contact us"
          variant="enterprise"
          features={[
            'Everything in Premium, plus:',
            'Higher usage limits',
            'Custom integrations',
            'Priority support',
            'Dedicated onboarding & success sessions'
          ]}
          buttonText="Contact us"
        />
      </div>
    </>
  )
}
