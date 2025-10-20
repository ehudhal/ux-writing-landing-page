'use client'
import Content from '@/content/content'
import { motion } from 'framer-motion'
import { defaultTransition, fadeInUpVariants } from '../animations'
import {
  ClarityCard,
  EmpathyCard,
  ActionOrientationCard
} from '@/components/homepage/benefit-cards'
import { useState } from 'react'

export default function HomepageUltimatePRD() {
  const [highlightedElement, setHighlightedElement] = useState<string | null>(null)
  const [acceptedCards, setAcceptedCards] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAccept = (cardId: string, message: string) => {
    setAcceptedCards(prev => new Set(prev).add(cardId))
    setToastMessage(message)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleDismiss = (cardId: string) => {
    setAcceptedCards(prev => new Set(prev).add(cardId))
  }

  return (
    <motion.section
      className="bg-offwhite py-24 lg:py-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8  mx-auto w-full flex flex-col gap-6 lg:gap-16 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center ">
            <Content contentKey="the-gist.title" />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content contentKey="the-gist.subtitle" />
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 lg:p-12 border-[#DEDEDB] border z-[20] flex flex-col gap-8">
          <h3 className="text-xl lg:text-2xl font-serif font-light text-center">
            Add the Figma plugin to apply suggestions automatically
          </h3>

          {/* Figma-style dark canvas background */}
          <div className="bg-[#2C2C2C] rounded-xl p-8 lg:p-12 relative overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
              {/* Mock website frame with Figma-style selection on the left */}
              <div className="flex-1 flex items-center justify-center p-6 lg:p-8 relative">
                {/* Figma frame label */}
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono">
                  Frame 1321319922
                </div>

                {/* Selected frame with blue border (Figma selection) */}
                <div className="w-full max-w-[500px] bg-white rounded-lg shadow-2xl p-6 space-y-6 border-2 border-blue-500 relative">
                  {/* Selection corners (Figma-style) */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-white border-2 border-blue-500"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-blue-500"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border-2 border-blue-500"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-2 border-blue-500"></div>

                  {/* Mock website header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
                      <span className="font-semibold text-gray-900">PhotoApp</span>
                    </div>
                    <div
                      className={`px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium transition-all duration-300 cursor-default ${
                        highlightedElement === 'action-orientation'
                          ? 'ring-4 ring-yellow-400 ring-opacity-75 scale-105'
                          : ''
                      }`}
                    >
                      {acceptedCards.has('action-orientation') ? 'View images' : 'Images page'}
                    </div>
                  </div>

                  {/* Main content area */}
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Photo Quality Score</h3>
                        <span className="text-2xl font-bold text-blue-600">87</span>
                      </div>
                      <div
                        className={`w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-300 cursor-default text-center ${
                          highlightedElement === 'clarity'
                            ? 'ring-4 ring-yellow-400 ring-opacity-75 scale-105'
                            : ''
                        }`}
                      >
                        {acceptedCards.has('clarity') ? 'Recalculate score' : 'Re-compute score'}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="text-base font-semibold text-gray-900 mb-3">Enter Access Code</h3>
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-2"
                        disabled
                      />
                      <div
                        className={`bg-red-50 border border-red-200 rounded-lg p-3 transition-all duration-300 ${
                          highlightedElement === 'empathy'
                            ? 'ring-4 ring-yellow-400 ring-opacity-75 scale-105'
                            : ''
                        }`}
                      >
                        <p className="text-sm text-red-700">
                          {acceptedCards.has('empathy') ? "That code didn't work. Try again." : 'You entered the wrong code'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            {/* Figma plugin panel on the right */}
            <div className="w-full lg:w-[420px] bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col relative">
              {/* Plugin header */}
              <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                <img src="/marketing/homepage/chordio.svg" alt="Chordio" className="w-5 h-5" />
                <h4 className="text-sm font-semibold text-gray-900">Chordio reviewer</h4>
              </div>

              {/* Scrollable review cards */}
              <div className="flex flex-col gap-4 p-4 overflow-y-auto max-h-[700px]">
                {!acceptedCards.has('clarity') && (
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <ClarityCard
                      onInspect={() => {
                        setHighlightedElement('clarity')
                        setTimeout(() => setHighlightedElement(null), 2000)
                      }}
                      onAccept={() => handleAccept('clarity', 'Applied suggestion: "Recalculate score"')}
                      onDismiss={() => handleDismiss('clarity')}
                    />
                  </div>
                )}
                {!acceptedCards.has('empathy') && (
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <EmpathyCard
                      onInspect={() => {
                        setHighlightedElement('empathy')
                        setTimeout(() => setHighlightedElement(null), 2000)
                      }}
                      onAccept={() => handleAccept('empathy', 'Applied suggestion: "That code didn\'t work. Try again."')}
                      onDismiss={() => handleDismiss('empathy')}
                    />
                  </div>
                )}
                {!acceptedCards.has('action-orientation') && (
                  <div className="transform hover:scale-[1.02] transition-transform duration-200">
                    <ActionOrientationCard
                      onInspect={() => {
                        setHighlightedElement('action-orientation')
                        setTimeout(() => setHighlightedElement(null), 2000)
                      }}
                      onAccept={() => handleAccept('action-orientation', 'Applied suggestion: "View images"')}
                      onDismiss={() => handleDismiss('action-orientation')}
                    />
                  </div>
                )}

                {/* Empty state when all cards are dismissed/accepted */}
                {acceptedCards.size === 3 && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h5 className="text-sm font-semibold text-gray-900 mb-1">All issues resolved!</h5>
                    <p className="text-xs text-gray-500">Your design copy looks great.</p>
                  </div>
                )}
              </div>

              {/* Toast notification */}
              {toastMessage && (
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom duration-300">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm flex-1">{toastMessage}</span>
                </div>
              )}
            </div>
            </div>
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.figma.com/community/plugin/1470337876493896011/chordio-ai-design-review-copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-offblack text-white rounded-full hover:bg-offblack/90 transition-colors font-medium text-base lg:text-lg"
            >
              Install the Figma plugin
            </a>
          </div>
        </div>
      </div>
      <svg
        width="648"
        height="384"
        viewBox="0 0 648 384"
        fill="none"
        className="absolute bottom-0 left-[0] z-[10]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M648 384C648 282.157 607.543 184.485 535.529 112.471C463.515 40.457 365.843 7.68894e-06 264 0C162.157 -7.68894e-06 64.485 40.457 -7.52898 112.471C-79.5429 184.485 -120 282.157 -120 384L264 384H648Z"
          fill="#E3F4F7"
        />
      </svg>
    </motion.section>
  )
}
