'use client'
import { URLInput } from '@/components/ui/url-input'
import { isValidUrl } from '@/lib/utils/url-utils'
import { motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  cardVariants,
  containerVariants,
  errorVariants,
  itemVariants
} from '../../infra/animations/shared-animations'
import { WizardStepProps } from '../../infra/types'
import { OnboardingTemplate } from '../components/onboarding-template'
import { useOnboardingContext } from '../context/onboarding-context'

export function WelcomeStep(stepProps: WizardStepProps) {
  const { productContext } = useOnboardingContext()
  const { setProductData } = productContext

  const [url, setUrl] = useState('')
  const [isPending, startTransition] = useTransition()
  const [showUrlValidation, setShowUrlValidation] = useState(false)

  const handleUrlSubmit = async () => {
    setShowUrlValidation(true)
    if (!isValidUrl(url)) {
      return
    }
    startTransition(async () => {
      try {
        const response = await fetch('/api/external-products/summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        })
        if (!response.ok) {
          const error = await response.json()
          toast.error(error.error || 'Failed to fetch product information')
          return
        }

        const result = await response.json()
        setProductData(result)
        stepProps.onComplete()
      } catch {
        toast.error('Failed to fetch product information')
      }
    })
  }

  return (
    <OnboardingTemplate
      {...stepProps}
      isPending={isPending}
      onComplete={handleUrlSubmit}
      primaryButtonConfig={{
        pendingText: 'Processing...'
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-4xl my-8 font-serif" variants={itemVariants}>
          Let&apos;s get PRDKit ready!
        </motion.h1>

        <motion.p
          className="text-center text-muted-foreground mb-12"
          variants={itemVariants}
        >
          Before PRDKit can help, it needs a little context about your product
          to provide personalized, accurate insights.
        </motion.p>

        <motion.div
          className="bg-slate-100 p-8 rounded-lg w-full mb-6"
          variants={cardVariants}
        >
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <div className="p-2 border border-dashed border-gray-400 rounded-lg">
              <SearchIcon className="w-4 h-4" />
            </div>
            <span className="text-sm">
              Enter your product&apos;s homepage URL, and PRDKit will
              automatically gather context
            </span>
          </div>

          <div className="relative">
            <URLInput
              value={url}
              onChange={setUrl}
              showPrefix={false}
              className="h-12 bg-white"
            />
            {showUrlValidation && !isValidUrl(url) && (
              <motion.p
                className="text-sm text-red-500 mt-2 ml-2"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
              >
                Please enter a valid URL
              </motion.p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </OnboardingTemplate>
  )
}
