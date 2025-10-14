'use client'
import { URLInput } from '@/components/ui/url-input'
import { isValidUrl } from '@/lib/utils/url-utils'
import { motion } from 'framer-motion'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import {
  cardVariants,
  containerVariants,
  errorVariants,
  itemVariants
} from '../../infra/animations/shared-animations'
import { WizardStepProps } from '../../infra/types'
import { ProductCreationTemplate } from '../components/product-creation-template'
import { useProductCreationContext } from '../context/product-creation-context'

export function ProductUrlStep(stepProps: WizardStepProps) {
  const { setProductData } = useProductCreationContext()

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
    <ProductCreationTemplate
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
        <motion.h1
          className="text-3xl lg:text-4xl my-8 font-serif text-center"
          variants={itemVariants}
        >
          Add product details
        </motion.h1>
        {/* Mobile-only subtitle */}
        <p className="text-sm text-gray-500 mb-8 text-center">
          Add product and business context for more helpful chats.
        </p>
        <motion.div
          className="bg-slate-100 p-8 rounded-lg w-full mb-6"
          variants={cardVariants}
        >
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <span className="text-sm">
              Enter your product&apos;s homepage URL to gather context
              automatically.
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
    </ProductCreationTemplate>
  )
}
