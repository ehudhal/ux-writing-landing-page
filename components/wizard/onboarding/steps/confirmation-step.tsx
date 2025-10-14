'use client'
import { motion } from 'framer-motion'
import {
  BookCheckIcon,
  CheckCheckIcon,
  PaletteIcon,
  UsersIcon
} from 'lucide-react'
import {
  containerVariants,
  hoverScaleRotate,
  iconVariants,
  itemVariants,
  sequentialVariants
} from '../../infra/animations/shared-animations'
import { WizardStepProps } from '../../infra/types'
import { OnboardingTemplate } from '../components/onboarding-template'

export function ConfirmationStep(stepProps: WizardStepProps) {
  const features = [
    {
      icon: <BookCheckIcon className="w-5 h-5" />,
      text: 'UX guidelines matched to your product'
    },
    {
      icon: <PaletteIcon className="w-5 h-5" />,
      text: 'Personalized UI recommendations'
    },
    {
      icon: <UsersIcon className="w-5 h-5 rounded" />,
      text: 'Context-aware UX suggestions tailored to your audience'
    }
  ]

  return (
    <OnboardingTemplate
      {...stepProps}
      isPending={false}
      primaryButtonConfig={{
        text: 'Continue',
        variant: 'primary'
      }}
    >
      <motion.div
        className="flex flex-col items-center justify-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={iconVariants} className="mt-12 mb-4">
          <CheckCheckIcon
            className="w-12 h-12 text-slate-700"
            strokeWidth={1.5}
          />
        </motion.div>

        <motion.h1 className="text-4xl mb-4 font-serif" variants={itemVariants}>
          You are all set!
        </motion.h1>

        <motion.p className="text-center mb-12" variants={itemVariants}>
          PRDKit is now ready to provide tailored UX reviews and documentation.
        </motion.p>

        <motion.div
          className="bg-slate-100 p-4 rounded-lg w-full mb-6 space-y-6"
          variants={itemVariants}
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4"
              custom={i}
              variants={sequentialVariants}
            >
              <motion.div
                className="p-2 bg-white rounded-full border"
                {...hoverScaleRotate}
              >
                {feature.icon}
              </motion.div>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </OnboardingTemplate>
  )
}
