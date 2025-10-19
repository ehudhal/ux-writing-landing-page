import React from 'react'

type BenefitCardProps = {
  issueFound: string
  suggestion: string
  explanation: string
}

export const BenefitCard = ({
  issueFound,
  suggestion,
  explanation
}: BenefitCardProps) => {
  return (
    <div className="w-[400px] h-[340px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <button className="text-xs px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
          Dismiss
        </button>
        <button className="text-xs px-3 py-1.5 text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors">
          Accept
        </button>
      </div>

      {/* Card content */}
      <div className="p-4 space-y-6 flex-1 overflow-auto">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Issue Found
          </div>
          <div className="text-sm text-gray-900 font-medium bg-red-50 border border-red-200 rounded px-3 py-2">
            "{issueFound}"
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Suggestion
          </div>
          <div className="text-sm text-gray-900 font-medium bg-emerald-50 border border-emerald-200 rounded px-3 py-2">
            "{suggestion}"
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Explanation
          </div>
          <div className="text-xs text-gray-700 leading-relaxed">
            {explanation}
          </div>
        </div>
      </div>
    </div>
  )
}

// Individual benefit cards with their specific content
export const ClarityCard = () => (
  <BenefitCard
    issueFound="Re-compute score"
    suggestion="Recalculate score"
    explanation='Users may not understand what "re-compute" means. Use simpler language.'
  />
)

export const ConcisenessCard = () => (
  <BenefitCard
    issueFound="We provide a comprehensive solution that enables you to effectively manage your tasks"
    suggestion="Manage your tasks, effortlessly"
    explanation="Roundabout marketing copy loses readers. Get to the value faster for better conversion."
  />
)

export const ConsistencyCard = () => (
  <BenefitCard
    issueFound="Colour settings"
    suggestion="Color settings"
    explanation="Your style guide requires US English spelling. Use 'color' not 'colour' for consistency."
  />
)

export const EmpathyCard = () => (
  <BenefitCard
    issueFound="You entered the wrong code"
    suggestion="That code didn't work. Try again."
    explanation="Blame-free language reduces user frustration and encourages retry."
  />
)

export const ActionOrientationCard = () => (
  <BenefitCard
    issueFound="Images page"
    suggestion="View images"
    explanation="Action-oriented CTAs with strong verbs drive engagement. Tell users what they'll do, not where they'll go."
  />
)

export const ActionOrientationCard2 = () => (
  <BenefitCard
    issueFound="New collection available"
    suggestion="Explore the new collection"
    explanation="Action-oriented copy drives engagement. Lead with what users can do, not just what exists."
  />
)

export const AccessibilityCard = () => (
  <BenefitCard
    issueFound="Utilize the aforementioned methodology"
    suggestion="Use this method"
    explanation="Complex language excludes users. Plain language is more inclusive."
  />
)
