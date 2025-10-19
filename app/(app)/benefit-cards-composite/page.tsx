'use client'

import {
  ClarityCard,
  EmpathyCard,
  ActionOrientationCard
} from '@/components/homepage/benefit-cards'

export default function BenefitCardsCompositePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="relative w-[1200px] h-[600px]">
        {/* Clarity card - back left */}
        <div
          className="absolute top-[80px] left-[50px] transform -rotate-3 hover:rotate-0 transition-transform duration-300"
          style={{ zIndex: 1 }}
        >
          <ClarityCard />
        </div>

        {/* Empathy card - center, slightly forward */}
        <div
          className="absolute top-[40px] left-[280px] transform rotate-2 hover:rotate-0 transition-transform duration-300"
          style={{ zIndex: 2 }}
        >
          <EmpathyCard />
        </div>

        {/* Action Orientation card - front right */}
        <div
          className="absolute top-[100px] left-[520px] transform -rotate-2 hover:rotate-0 transition-transform duration-300"
          style={{ zIndex: 3 }}
        >
          <ActionOrientationCard />
        </div>
      </div>
    </div>
  )
}
