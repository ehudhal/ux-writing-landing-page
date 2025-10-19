'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { fadeInUpVariants } from '../animations'
import { AlertCircle } from 'lucide-react'

import { motion } from 'framer-motion'
import { defaultTransition } from '../animations'

export default function HomepageChallenges() {
  const contentHomepage = useHomepageContent()
  const challengesContent = contentHomepage['challenges']

  return (
    <motion.section
      className="bg-white py-24 lg:py-32 relative"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[1200px] max-w-[95%] mx-auto w-full flex flex-col gap-6 lg:gap-16 relative px-4 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center">
            <Content contentKey="challenges.title" />
          </h2>
        </div>
        <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
          {challengesContent && Object.keys(challengesContent).filter(key => key.startsWith('challenge-')).map((key) => {
            return (
              <ChallengeCard
                key={key}
                contentKey={`challenges.${key}`}
              />
            )
          })}
        </div>
      </div>
    </motion.section>
  )
}

type ChallengeCardProps = {
  contentKey: string
}

const ChallengeCard = ({ contentKey }: ChallengeCardProps) => {
  return (
    <div className="bg-offwhite relative rounded-2xl p-4 lg:p-5 flex items-center gap-3 min-h-[80px]">
      <AlertCircle className="size-5 text-offblack flex-shrink-0" strokeWidth={1.5} />
      <h3 className="text-base lg:text-lg font-serif font-light">
        <Content contentKey={`${contentKey}.title`} />
      </h3>
    </div>
  )
}
