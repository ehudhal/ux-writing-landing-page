'use client'

import { productPageUrl } from '@/lib/app-routes'
import { motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {
  cardVariants,
  containerVariants,
  itemVariants
} from '../../infra/animations/shared-animations'
import { WizardStepProps } from '../../infra/types'
import { ProductCreationTemplate } from '../components/product-creation-template'
import { useProductCreationContext } from '../context/product-creation-context'
export function ProductCompletionStep(stepProps: WizardStepProps) {
  const { productData } = useProductCreationContext()
  const router = useRouter()
  return (
    <ProductCreationTemplate
      isPending={false}
      {...stepProps}
      onComplete={() => {
        stepProps.onComplete()
        if (productData.productId) {
          router.push(productPageUrl(productData.productId))
        }
      }}
      primaryButtonConfig={{
        text: 'Done'
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-center h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
          variants={cardVariants}
        >
          <motion.div
            className="mb-8 text-primary"
            variants={itemVariants}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0],
              transition: {
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1
              }
            }}
          >
            <PartyPopper className="w-16 h-16 " strokeWidth={1} />
          </motion.div>

          <motion.h1
            className="text-4xl font-serif mb-6"
            variants={itemVariants}
          >
            You&apos;re all set!
          </motion.h1>

          <motion.p
            className=" text-muted-foreground max-w-sm"
            variants={itemVariants}
          >
            With this added context, PRDKit can suggest features, user flows,
            and requirements tailored to your product.
          </motion.p>
        </motion.div>
      </motion.div>
    </ProductCreationTemplate>
  )
}
