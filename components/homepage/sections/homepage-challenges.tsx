'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { fadeInUpVariants } from '../animations'
import LucideIcon from '@/components/ui/lucide-icon'

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {challengesContent && Object.keys(challengesContent).filter(key => key.startsWith('challenge-')).map((key) => {
            const challenge = challengesContent[key]
            return (
              <ChallengeCard
                key={key}
                contentKey={`challenges.${key}`}
                iconName={challenge.icon || 'alert-circle'}
                iconColor={challenge['icon-color']}
                bgColor={challenge['bg-color']}
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
  iconName: string
  iconColor: string
  bgColor: string
}

const ChallengeCard = ({ contentKey, iconName, iconColor, bgColor }: ChallengeCardProps) => {
  return (
    <div className="bg-offwhite relative rounded-2xl p-4 lg:p-5 flex items-center justify-between gap-3 min-h-[80px]">
      <h3 className="text-sm lg:text-base font-serif font-light">
        <Content contentKey={`${contentKey}.title`} />
      </h3>
      <div
        className={`flex items-center gap-2 rounded-full p-2 aspect-square min-w-min flex-shrink-0`}
        style={{ backgroundColor: bgColor }}
      >
        <LucideIcon
          name={iconName}
          className="size-4 lg:size-6"
          strokeWidth={1}
          style={{ color: iconColor }}
        />
      </div>
    </div>
  )
}
