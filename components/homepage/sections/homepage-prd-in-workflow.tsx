'use client'
import Content from '@/content/content'
import { fadeInUpVariants } from '../animations'

import { IconNotion } from '@/components/ui/icons'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { defaultTransition } from '../animations'
import { Integrations } from '../integrations'
export default function HomepagePRDInWorkflow() {
  return (
    <motion.section
      className="bg-offwhite py-24 lg:py-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
      id="workflows"
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8  mx-auto w-full items-center flex flex-col gap-6 lg:gap-12 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center max-w-[800px]">
            <Content contentKey="prd-in-workflow.title" origin="homepage" />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content contentKey="prd-in-workflow.subtitle" origin="homepage" />
          </p>
        </div>
        <div className="bg-white max-w-full w-full lg:max-w-[1000px] rounded-3xl p-6 lg:p-4 lg:pl-16 flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col gap-6 lg:mb-0 mb-6">
            <h4 className="text-2xl lg:text-4xl font-serif font-light">
              <Content
                contentKey="prd-in-workflow.live-prototyping.title"
                origin="homepage"
              />
            </h4>
            <h6 className="text-base lg:text-lg font-medium">
              <Content
                contentKey="prd-in-workflow.live-prototyping.subtitle"
                origin="homepage"
              />
            </h6>
            <p className="text-sm lg:text-base">
              <Content
                contentKey="prd-in-workflow.live-prototyping.description"
                origin="homepage"
              />
            </p>
          </div>
          <Integrations
            key="prd-in-workflow"
            baseColor="#D1EDF350"
            pathColor="#83c3d1"
            icon1={
              <Image
                src="/marketing/homepage/integrations/lovable.png"
                alt="Lovable"
                width={32}
                height={32}
              />
            }
            icon2={
              <Image
                src="/marketing/homepage/integrations/cursor.png"
                alt="Cursor"
                width={32}
                height={32}
              />
            }
            icon3={
              <Image
                src="/marketing/homepage/integrations/bolt.svg"
                alt="Bolt"
                width={32}
                height={32}
              />
            }
          />
        </div>
        <div className="bg-white max-w-full w-full lg:max-w-[1000px] rounded-3xl p-6 lg:p-4 lg:pl-16 flex flex-col lg:flex-row items-center justify-center">
          <div className="flex flex-col gap-6 lg:mb-0 mb-6">
            <h4 className="text-2xl lg:text-4xl font-serif font-light max-w-[200px]">
              <Content
                contentKey="prd-in-workflow.share-with-team.title"
                origin="homepage"
              />
            </h4>
            <h6 className="text-base lg:text-lg font-medium">
              <Content
                contentKey="prd-in-workflow.share-with-team.subtitle"
                origin="homepage"
              />
            </h6>
            <p className="text-sm lg:text-base">
              <Content
                contentKey="prd-in-workflow.share-with-team.description"
                origin="homepage"
              />
            </p>
          </div>
          <Integrations
            key="prd-in-workflow-2"
            baseColor="#A078E510"
            pathColor="#A078E5"
            icon1={<IconNotion className="size-6" />}
            icon2={
              <Image
                src="/marketing/homepage/integrations/confluence.svg"
                alt="Confluence"
                width={32}
                height={32}
              />
            }
            icon3={
              <Image
                src="/marketing/homepage/integrations/google-docs.svg"
                alt="Google Docs"
                width={50}
                className="size-60"
                height={50}
              />
            }
          />
        </div>
      </div>
    </motion.section>
  )
}

type EnhancedPRDClarityCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  children?: React.ReactNode
}

export const EnhancedPRDClarityCard = ({
  title,
  description,
  icon,
  color,
  children
}: EnhancedPRDClarityCardProps) => {
  return (
    <div className="bg-offwhite relative rounded-2xl p-8 flex flex-col gap-4 min-h-[450px] overflow-clip">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-serif font-light">{title}</h3>
        <div
          className={`flex items-center gap-2 rounded-full p-3 aspect-square min-w-min`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
      <p>{description}</p>
      {children}
      <svg
        width="368"
        height="217"
        viewBox="0 0 368 217"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={'absolute bottom-0 left-1/2 -translate-x-1/2 w-full'}
      >
        <ellipse cx="184.001" cy="184.989" rx="184" ry="184.159" fill={color} />
      </svg>
    </div>
  )
}
