import React from 'react'
import { Search } from 'lucide-react'

type BenefitCardProps = {
  issueFound: string
  suggestion: string
  explanation: string
  onInspect?: () => void
  onAccept?: () => void
  onDismiss?: () => void
}

export const BenefitCard = ({
  issueFound,
  suggestion,
  explanation,
  onInspect,
  onAccept,
  onDismiss
}: BenefitCardProps) => {
  return (
    <div className="w-[400px] h-[340px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
      {/* Action buttons */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-200 bg-gray-50 flex-shrink-0">
        <button
          onClick={onInspect}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors border border-gray-300"
        >
          <Search className="w-3 h-3" />
          Inspect
        </button>
        <div className="flex gap-2">
          <button
            onClick={onDismiss}
            className="text-xs px-3 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            Dismiss
          </button>
          <button
            onClick={onAccept}
            className="text-xs px-3 py-1.5 text-white bg-emerald-600 hover:bg-emerald-700 rounded transition-colors"
          >
            Accept
          </button>
        </div>
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
type CardProps = {
  onInspect?: () => void
  onAccept?: () => void
  onDismiss?: () => void
}

export const ClarityCard = ({ onInspect, onAccept, onDismiss }: CardProps) => (
  <BenefitCard
    issueFound="Re-compute score"
    suggestion="Recalculate score"
    explanation='Users may not understand what "re-compute" means. Use simpler language.'
    onInspect={onInspect}
    onAccept={onAccept}
    onDismiss={onDismiss}
  />
)

export const ConcisenessCard = ({ onInspect, onAccept, onDismiss }: CardProps) => (
  <BenefitCard
    issueFound="We provide a comprehensive solution that enables you to effectively manage your tasks"
    suggestion="Manage your tasks, effortlessly"
    explanation="Roundabout marketing copy loses readers. Get to the value faster for better conversion."
    onInspect={onInspect}
    onAccept={onAccept}
    onDismiss={onDismiss}
  />
)

export const ConsistencyCard = ({ onInspect, onAccept, onDismiss }: CardProps) => (
  <BenefitCard
    issueFound="Colour settings"
    suggestion="Color settings"
    explanation="Your style guide requires US English spelling. Use 'color' not 'colour' for consistency."
    onInspect={onInspect}
    onAccept={onAccept}
    onDismiss={onDismiss}
  />
)

export const EmpathyCard = ({ onInspect, onAccept, onDismiss }: CardProps) => (
  <BenefitCard
    issueFound="You entered the wrong code"
    suggestion="That code didn't work. Try again."
    explanation="Blame-free language reduces user frustration and encourages retry."
    onInspect={onInspect}
    onAccept={onAccept}
    onDismiss={onDismiss}
  />
)

export const ActionOrientationCard = ({ onInspect, onAccept, onDismiss }: CardProps) => (
  <BenefitCard
    issueFound="Images page"
    suggestion="View images"
    explanation="Action-oriented CTAs with strong verbs drive engagement. Tell users what they'll do, not where they'll go."
    onInspect={onInspect}
    onAccept={onAccept}
    onDismiss={onDismiss}
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
