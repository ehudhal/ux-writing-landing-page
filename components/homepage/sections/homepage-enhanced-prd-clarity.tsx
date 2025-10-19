'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { fadeInUpVariants } from '../animations'
import LucideIcon from '@/components/ui/lucide-icon'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { defaultTransition } from '../animations'

export default function HomepageEnhancedPRDClarity() {
  const contentHomepage = useHomepageContent()
  const clarityContent = contentHomepage['benefits']
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
              contentKey="benefits.title"

            />
          </h2>
          <p className="text-base lg:text-lg text-center text-offblack/70 max-w-3xl">
            <Content contentKey="benefits.subtitle" />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <EnhancedPRDClarityCard
            contentKey="benefits.benefit-1"
            iconName={clarityContent['benefit-1'].icon || 'pen-tool'}
            iconColor={clarityContent['benefit-1']['icon-color']}
            bgColor={clarityContent['benefit-1']['bg-color']}
            image={clarityContent['benefit-1'].image}
            imageClassName="z-20 absolute bottom-[-30px] lg:bottom-[-55px] left-1/2 h-auto w-[clamp(200px,280px,80%)] object-contain -translate-x-1/2 shadow-lg"
          />
          <EnhancedPRDClarityCard
            contentKey="benefits.benefit-2"
            iconName={clarityContent['benefit-2'].icon || 'layout-grid'}
            iconColor={clarityContent['benefit-2']['icon-color']}
            bgColor={clarityContent['benefit-2']['bg-color']}
            image={clarityContent['benefit-2'].image}
            imageClassName="z-20 absolute bottom-[-5px] left-1/2 -translate-x-1/2 h-auto w-[clamp(200px,300px,80%)] object-contain  shadow-lg"
          />
          <EnhancedPRDClarityCard
            contentKey="benefits.benefit-3"
            iconName={clarityContent['benefit-3'].icon || 'share-2'}
            iconColor={clarityContent['benefit-3']['icon-color']}
            bgColor={clarityContent['benefit-3']['bg-color']}
            image={clarityContent['benefit-3'].image}
            imageClassName="z-20 absolute bottom-[-15%] left-1/2  h-auto w-[clamp(200px,230px,55%)] object-contain -translate-x-1/2 shadow-lg"
          />
          <EnhancedPRDClarityCard
            contentKey="benefits.benefit-4"
            soon
            iconName={clarityContent['benefit-4'].icon || 'users-2'}
            iconColor={clarityContent['benefit-4']['icon-color']}
            bgColor={clarityContent['benefit-4']['bg-color']}
            image={clarityContent['benefit-4'].image}
            imageClassName="z-20 absolute  bottom-[-20px] lg:bottom-[-40px] left-1/2 h-auto w-[clamp(200px,300px,80%)] object-contain -translate-x-1/2 shadow-lg"
          />
          <EnhancedPRDClarityCard
            contentKey="benefits.benefit-5"
            soon
            iconName={clarityContent['benefit-5'].icon || 'file-text'}
            iconColor={clarityContent['benefit-5']['icon-color']}
            bgColor={clarityContent['benefit-5']['bg-color']}
          >
            <div className="z-20 absolute bottom-[-40px] left-1/2 -translate-x-1/2 lg:w-[clamp(100px,200px,50%)]  w-[clamp(100px,200px,70%)] ">
              <Image
                src={clarityContent['benefit-5'].image}
                alt="Press release"
                width={368}
                height={217}
                className="absolute bottom-0 left-0 translate-x-[-20%] translate-y-0 shadow-lg"
              />
              <Image
                src={clarityContent['benefit-5'].image}
                alt="Press release"
                width={368}
                height={217}
                className="  translate-x-[25%] shadow-lg translate-y-[20%]"
              />
            </div>
          </EnhancedPRDClarityCard>
          <EnhancedPRDClarityCard
            contentKey="benefits.benefit-6"
            soon
            iconName={clarityContent['benefit-6'].icon || 'play-circle'}
            iconColor={clarityContent['benefit-6']['icon-color']}
            bgColor={clarityContent['benefit-6']['bg-color']}
            image={clarityContent['benefit-6'].image}
            imageClassName="z-20 absolute bottom-[-5%] left-1/2  h-auto w-[clamp(200px,250px,80%)] object-contain -translate-x-1/2 shadow-lg"
          />
        </div>
      </div>
    </motion.section>
  )
}

type EnhancedPRDClarityCardProps = {
  contentKey: string
  iconName: string
  iconColor: string
  bgColor: string
  image?: string
  imageClassName?: string
  children?: React.ReactNode
  soon?: boolean
}

export const EnhancedPRDClarityCard = ({
  contentKey,
  iconName,
  iconColor,
  bgColor,
  image,
  imageClassName,
  children,
  soon = false
}: EnhancedPRDClarityCardProps) => {
  return (
    <div className="bg-offwhite relative rounded-2xl p-8 flex flex-col gap-4 min-h-[400px] lg:min-h-[450px] overflow-clip">
      <div className="flex items-center justify-between">
        <h3 className="text-xl lg:text-3xl font-serif font-light">
          <Content contentKey={`${contentKey}.title`} />
        </h3>
        <div
          className={`flex items-center gap-2 rounded-full p-3 aspect-square min-w-min`}
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
      <p className="text-sm lg:text-base">
        <Content contentKey={`${contentKey}.description`} />
      </p>
      {image && !children && (
        <Image
          src={image}
          alt={contentKey}
          width={368}
          height={217}
          className={imageClassName}
        />
      )}
      {children}
      {soon && (
        <span className="absolute bottom-2 right-2 z-40 bg-white rounded-full px-6 py-2 border border-offblack/10 text-sm lg:text-base text-offblack/50">
          <Content contentKey={`${contentKey}.badge`} />
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
        <ellipse cx="184.001" cy="184.989" rx="184" ry="184.159" fill={bgColor} />
      </svg>
    </div>
  )
}
