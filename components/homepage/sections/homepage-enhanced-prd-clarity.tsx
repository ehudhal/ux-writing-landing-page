'use client'
import Content from '@/content/content'
import { fadeInUpVariants } from '../animations'

import { motion } from 'framer-motion'
import {
  FileText,
  LayoutGrid,
  PenTool,
  PlayCircle,
  Share2,
  Users2
} from 'lucide-react'
import Image from 'next/image'
import { defaultTransition } from '../animations'
export default function HomepageEnhancedPRDClarity() {
  return (
    <motion.section
      className="bg-white py-24 lg:px-8 lg:py-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
      id="features"
    >
      <div className="lg:max-w-[1200px] max-w-[95%]  mx-auto w-full flex flex-col gap-6 lg:gap-16 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center ">
            <Content
              contentKey="enhanced-prd-clarity.title"
              origin="homepage"
            />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content
              contentKey="enhanced-prd-clarity.subtitle"
              origin="homepage"
            />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <EnhancedPRDClarityCard
            contentKey="enhanced-prd-clarity.wireframes"
            icon={
              <PenTool
                className="size-4 lg:size-6 text-[#51A1E1]"
                strokeWidth={1}
              />
            }
            color="#D1EDF3"
          >
            <Image
              src="/marketing/homepage/enhanced-prd-wireframes.webp"
              alt="Wireframes"
              width={368}
              height={217}
              className="z-20 absolute bottom-[-30px] lg:bottom-[-55px] left-1/2 h-auto w-[clamp(200px,280px,80%)] object-contain -translate-x-1/2 shadow-lg"
            />
          </EnhancedPRDClarityCard>
          <EnhancedPRDClarityCard
            contentKey="enhanced-prd-clarity.user-flows"
            icon={
              <LayoutGrid
                className="size-4 lg:size-6 text-[#7A4EA1]"
                strokeWidth={1}
              />
            }
            color="#EDE9F0"
          >
            <Image
              src="/marketing/homepage/enhanced-prd-user-flows.webp"
              alt="User flows"
              width={368}
              height={217}
              className="z-20 absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-auto w-[clamp(200px,300px,80%)] object-contain  shadow-lg"
            />
          </EnhancedPRDClarityCard>
          <EnhancedPRDClarityCard
            contentKey="enhanced-prd-clarity.social-posts"
            icon={
              <Share2
                className="size-4 lg:size-6 text-[#E1C151]"
                strokeWidth={1}
              />
            }
            color="#F3ECD1"
          >
            <Image
              src="/marketing/homepage/enhanced-prd-press-release-01.webp"
              alt="Social posts"
              width={368}
              height={217}
              className="z-20 absolute bottom-[-15%] left-1/2  h-auto w-[clamp(200px,230px,55%)] object-contain -translate-x-1/2 shadow-lg"
            />
          </EnhancedPRDClarityCard>
          <EnhancedPRDClarityCard
            contentKey="enhanced-prd-clarity.simulated-reviews"
            soon
            icon={
              <Users2
                className="size-4 lg:size-6 text-[#22C397]"
                strokeWidth={1}
              />
            }
            color="#C4F3E6"
          >
            <Image
              src="/marketing/homepage/enhanced-prd-simulated-reviews.webp"
              alt="Simulated reviews"
              width={368}
              height={217}
              className="z-20 absolute  bottom-[-20px] lg:bottom-[-40px] left-1/2 h-auto w-[clamp(200px,300px,80%)] object-contain -translate-x-1/2 shadow-lg"
            />
          </EnhancedPRDClarityCard>
          <EnhancedPRDClarityCard
            contentKey="enhanced-prd-clarity.press-release"
            soon
            icon={
              <FileText
                className="size-4 lg:size-6 text-[#ED5F5F]"
                strokeWidth={1}
              />
            }
            color="#FCE4E4"
          >
            <div className="z-20 absolute bottom-[-40px] left-1/2 -translate-x-1/2 lg:w-[clamp(100px,200px,50%)]  w-[clamp(100px,200px,70%)] ">
              <Image
                src="/marketing/homepage/enhanced-prd-press-release-01.webp"
                alt="Press release"
                width={368}
                height={217}
                className="absolute bottom-0 left-0 translate-x-[-20%] translate-y-0 shadow-lg"
              />
              <Image
                src="/marketing/homepage/enhanced-prd-press-release-01.webp"
                alt="Press release"
                width={368}
                height={217}
                className="  translate-x-[25%] shadow-lg translate-y-[20%]"
              />
            </div>
          </EnhancedPRDClarityCard>
          <EnhancedPRDClarityCard
            contentKey="enhanced-prd-clarity.demo-scripts"
            soon
            icon={
              <PlayCircle
                className="size-4 lg:size-6 text-[#22C397]"
                strokeWidth={1}
              />
            }
            color="#D6F5DF"
          >
            <Image
              src="/marketing/homepage/enhanced-prd-demo-briefs.webp"
              alt="Demo scripts"
              width={1220}
              height={1141}
              className="z-20 absolute bottom-[-5%] left-1/2  h-auto w-[clamp(200px,250px,80%)] object-contain -translate-x-1/2 shadow-lg"
            />
          </EnhancedPRDClarityCard>
        </div>
      </div>
    </motion.section>
  )
}

type EnhancedPRDClarityCardProps = {
  contentKey: string
  icon: React.ReactNode
  color: string
  children?: React.ReactNode
  soon?: boolean
}

export const EnhancedPRDClarityCard = ({
  contentKey,
  icon,
  color,
  children,
  soon = false
}: EnhancedPRDClarityCardProps) => {
  return (
    <div className="bg-offwhite relative rounded-2xl p-8 flex flex-col gap-4 min-h-[400px] lg:min-h-[450px] overflow-clip">
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-3xl font-serif font-light">
          <Content contentKey={`${contentKey}.title`} origin="homepage" />
        </h3>
        <div
          className={`flex items-center gap-2 rounded-full p-3 aspect-square min-w-min`}
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
      <p className="text-sm lg:text-base">
        <Content contentKey={`${contentKey}.description`} origin="homepage" />
      </p>
      {children}
      {soon && (
        <span className="absolute bottom-2 right-2 z-40 bg-white rounded-full px-6 py-2 border border-offblack/10 text-sm lg:text-base text-offblack/50">
          <Content contentKey={`${contentKey}.badge`} origin="homepage" />
        </span>
      )}
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
