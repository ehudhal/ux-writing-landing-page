'use client'
import Content from '@/content/content'
import contentHomepage from '@/content/library/homepage.json'
import { fadeInUpVariants } from '../animations'

import { useIsMobile, useIsTablet } from '@/lib/hooks/use-media-query'
import { motion } from 'framer-motion'
import { Globe, Notebook } from 'lucide-react'
import Image from 'next/image'
import { defaultTransition } from '../animations'

export default function HomepageSpecFeaturesForExistingProduct() {
  const isTablet = useIsTablet()
  const isMobile = useIsMobile()
  const isDesktop = !isMobile && !isTablet
  const specFeatures = contentHomepage['spec-features']
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
            <Content contentKey="spec-features.title" origin="homepage" />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content contentKey="spec-features.subtitle" origin="homepage" />
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <div className="  gap-4 grid grid-cols-1 lg:grid-cols-2 justify-items-center ">
            <SpecFeatureCard
              contentKey="spec-features.automated-context"
              icon={
                <Globe
                  className="size-4 lg:size-6"
                  strokeWidth={1}
                  style={{ color: specFeatures['automated-context']['icon-color'] }}
                />
              }
              bgColor={specFeatures['automated-context']['bg-color']}
            >
              <Image
                src={specFeatures['automated-context'].image}
                alt="Automated Context Gathering"
                width={1588}
                height={993}
                className="z-20 absolute bottom-[-5%] lg:bottom-[-15%] left-1/2 -translate-x-1/2 object-contain h-auto w-[clamp(200px,300px,80%)] lg:w-[clamp(200px,400px,80%)] shadow-lg"
              />
            </SpecFeatureCard>
            <SpecFeatureCard
              contentKey="spec-features.product-screen-analysis"
              icon={
                <Globe
                  className="size-4 lg:size-6"
                  strokeWidth={1}
                  style={{ color: specFeatures['product-screen-analysis']['icon-color'] }}
                />
              }
              bgColor={specFeatures['product-screen-analysis']['bg-color']}
            >
              <Image
                src={specFeatures['product-screen-analysis'].image}
                alt="Product Screen Analysis"
                width={1708}
                height={1113}
                className="z-20 absolute bottom-[-5%]  lg:bottom-[-15%] left-1/2 -translate-x-1/2 object-contain h-auto w-[clamp(200px,300px,80%)] lg:w-[clamp(200px,400px,80%)] shadow-lg"
              />
            </SpecFeatureCard>
            {!isDesktop && (
              <SpecFeatureCard
                contentKey="spec-features.knowledge-hub"
                icon={
                  <Notebook
                    className="size-4 lg:size-6"
                    strokeWidth={1}
                    style={{ color: specFeatures['knowledge-hub']['icon-color'] }}
                  />
                }
                bgColor={specFeatures['knowledge-hub']['bg-color']}
              >
                <Image
                  src={specFeatures['knowledge-hub'].image}
                  alt="Knowledge Hub"
                  width={1708}
                  height={1113}
                  className="z-20 absolute bottom-[-5%] lg:bottom-[-15%] left-1/2 -translate-x-1/2 object-contain h-auto w-[clamp(200px,300px,80%)] lg:w-[clamp(200px,400px,80%)] shadow-lg "
                />
              </SpecFeatureCard>
            )}
          </div>
          {isDesktop && (
            <div>
              <div className="bg-offwhite w-full relative rounded-2xl p-6 lg:p-8 flex flex-col gap-4 lg:min-h-[400px] min-h-[350px] overflow-clip">
                <div className="flex items-start lg:items-center justify-start gap-4">
                  <div
                    className={`flex items-center gap-2 rounded-full p-3 aspect-square min-w-min`}
                    style={{
                      backgroundColor: specFeatures['knowledge-hub']['bg-color'],
                      color: specFeatures['knowledge-hub']['icon-color']
                    }}
                  >
                    <Notebook className="size-6" strokeWidth={1} />
                  </div>
                  <h3 className="text-[22px] lg:text-3xl font-serif font-light">
                    <Content
                      contentKey="spec-features.knowledge-hub.title"
                      origin="homepage"
                    />
                  </h3>
                </div>
                <p className="max-w-[400px]">
                  <Content
                    contentKey="spec-features.knowledge-hub.description"
                    origin="homepage"
                  />
                </p>
                <Image
                  src={specFeatures['knowledge-hub'].image}
                  alt="Knowledge Hub"
                  width={1708}
                  height={1113}
                  className="z-20 absolute bottom-[-5%] lg:bottom-[-15%] right-[calc(286px+3rem)]  translate-x-1/2 lg:w-[40%] w-[30%] shadow-lg"
                />
                <svg
                  width="572.81"
                  height="572.81"
                  viewBox="0 0 572.81 572.81"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={'absolute bottom-0 translate-y-1/2 right-12 '}
                >
                  <ellipse
                    cx="286.405"
                    cy="286.405"
                    rx="286.405"
                    ry="286.405"
                    fill={specFeatures['knowledge-hub']['bg-color']}
                  />
                </svg>
              </div>
            </div>
          )}
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
          <Content contentKey={`${contentKey}.title`} origin="homepage" />
        </h3>
      </div>
      <p className="text-sm lg:text-base">
        <Content contentKey={`${contentKey}.description`} origin="homepage" />
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
