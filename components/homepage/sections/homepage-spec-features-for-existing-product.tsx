'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { fadeInUpVariants } from '../animations'

import { motion } from 'framer-motion'
import { Globe, Notebook } from 'lucide-react'
import Image from 'next/image'
import { defaultTransition } from '../animations'

export default function HomepageSpecFeaturesForExistingProduct() {
  const contentHomepage = useHomepageContent()
  const specFeatures = contentHomepage['features']
  return (
    <motion.section
      className="bg-white py-24 lg:py-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8  mx-auto w-full items-center flex flex-col gap-6 lg:gap-12 relative px-4 ">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center lg:max-w-[800px]">
            <Content contentKey="features.title" />
          </h2>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 justify-items-center">
            <SpecFeatureCard
              contentKey="features.feature-2"
              icon={
                <Globe
                  className="size-4 lg:size-6"
                  strokeWidth={1}
                  style={{ color: specFeatures['feature-2']['icon-color'] }}
                />
              }
              bgColor={specFeatures['feature-2']['bg-color']}
            >
              <Image
                src={specFeatures['feature-2'].image}
                alt="Customizable Guidelines"
                width={1708}
                height={1113}
                className="z-20 absolute bottom-[-5%] lg:bottom-[-15%] left-1/2 -translate-x-1/2 object-contain h-auto w-[clamp(200px,300px,80%)] lg:w-[clamp(200px,400px,80%)] shadow-lg"
              />
            </SpecFeatureCard>
            <SpecFeatureCard
              contentKey="features.feature-3"
              icon={
                <Notebook
                  className="size-4 lg:size-6"
                  strokeWidth={1}
                  style={{ color: specFeatures['feature-3']['icon-color'] }}
                />
              }
              bgColor={specFeatures['feature-3']['bg-color']}
            >
              <Image
                src={specFeatures['feature-3'].image}
                alt="Team Collaboration"
                width={1708}
                height={1113}
                className="z-20 absolute bottom-[-5%] lg:bottom-[-15%] left-1/2 -translate-x-1/2 object-contain h-auto w-[clamp(200px,300px,80%)] lg:w-[clamp(200px,400px,80%)] shadow-lg"
              />
            </SpecFeatureCard>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

type SpecFeatureCardProps = {
  contentKey: string
  icon: React.ReactNode
  bgColor: string
  children?: React.ReactNode
}

const SpecFeatureCard = ({
  contentKey,
  icon,
  bgColor,
  children
}: SpecFeatureCardProps) => {
  return (
    <div className="bg-offwhite w-full relative rounded-2xl p-6 lg:p-8 flex flex-col gap-4 min-h-[350px] lg:min-h-[400px] overflow-clip">
      <div className="flex items-start lg:items-center justify-start gap-4">
        <div
          className={`flex items-center gap-2 rounded-full p-3 aspect-square min-w-min`}
          style={{ backgroundColor: bgColor }}
        >
          {icon}
        </div>
        <h3 className="text-[22px] lg:text-3xl font-serif font-light">
          <Content contentKey={`${contentKey}.title`} />
        </h3>
      </div>
      <p className="text-sm lg:text-base">
        <Content contentKey={`${contentKey}.description`} />
      </p>
      {children}
      <svg
        width="463"
        height="463"
        viewBox="0 0 463 463"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={
          'absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-full'
        }
      >
        <ellipse
          cx="231.57"
          cy="231.57"
          rx="231.57"
          ry="231.57"
          fill={bgColor}
        />
      </svg>
    </div>
  )
}
