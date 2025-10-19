'use client'

import {
  ClarityCard,
  ConcisenessCard,
  ConsistencyCard,
  EmpathyCard,
  ActionOrientationCard,
  ActionOrientationCard2,
  AccessibilityCard
} from '@/components/homepage/benefit-cards'
import html2canvas from 'html2canvas'
import { useRef } from 'react'

export default function BenefitCardsPage() {
  const clarityRef = useRef<HTMLDivElement>(null)
  const concisenessRef = useRef<HTMLDivElement>(null)
  const consistencyRef = useRef<HTMLDivElement>(null)
  const empathyRef = useRef<HTMLDivElement>(null)
  const actionOrientationRef = useRef<HTMLDivElement>(null)
  const actionOrientation2Ref = useRef<HTMLDivElement>(null)
  const accessibilityRef = useRef<HTMLDivElement>(null)

  const exportCard = async (ref: React.RefObject<HTMLDivElement>, filename: string) => {
    if (!ref.current) return

    const canvas = await html2canvas(ref.current, {
      scale: 2, // Higher resolution
      backgroundColor: '#f3f4f6' // Match the page background
    })

    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
  }

  const exportAllCards = async () => {
    await exportCard(clarityRef, 'clarity-card')
    await new Promise(resolve => setTimeout(resolve, 500))
    await exportCard(concisenessRef, 'conciseness-card')
    await new Promise(resolve => setTimeout(resolve, 500))
    await exportCard(consistencyRef, 'consistency-card')
    await new Promise(resolve => setTimeout(resolve, 500))
    await exportCard(empathyRef, 'empathy-card')
    await new Promise(resolve => setTimeout(resolve, 500))
    await exportCard(actionOrientationRef, 'action-orientation-card')
    await new Promise(resolve => setTimeout(resolve, 500))
    await exportCard(actionOrientation2Ref, 'action-orientation-card-2')
    await new Promise(resolve => setTimeout(resolve, 500))
    await exportCard(accessibilityRef, 'accessibility-card')
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Benefit Cards for Export
            </h1>
            <p className="text-gray-600 mt-2">
              Click the export button on each card to download it as a PNG image.
            </p>
          </div>
          <button
            onClick={exportAllCards}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Export All Cards
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Clarity</h2>
              <button
                onClick={() => exportCard(clarityRef, 'clarity-card')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={clarityRef}>
              <ClarityCard />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Conciseness</h2>
              <button
                onClick={() => exportCard(concisenessRef, 'conciseness-card')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={concisenessRef}>
              <ConcisenessCard />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Consistency</h2>
              <button
                onClick={() => exportCard(consistencyRef, 'consistency-card')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={consistencyRef}>
              <ConsistencyCard />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Empathy</h2>
              <button
                onClick={() => exportCard(empathyRef, 'empathy-card')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={empathyRef}>
              <EmpathyCard />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Action Orientation</h2>
              <button
                onClick={() => exportCard(actionOrientationRef, 'action-orientation-card')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={actionOrientationRef}>
              <ActionOrientationCard />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Action Orientation 2</h2>
              <button
                onClick={() => exportCard(actionOrientation2Ref, 'action-orientation-card-2')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={actionOrientation2Ref}>
              <ActionOrientationCard2 />
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-gray-700">Accessibility</h2>
              <button
                onClick={() => exportCard(accessibilityRef, 'accessibility-card')}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
              >
                Export
              </button>
            </div>
            <div ref={accessibilityRef}>
              <AccessibilityCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
