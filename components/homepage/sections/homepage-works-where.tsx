'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { IconSlack } from '@/components/ui/icons'
import LucideIcon from '@/components/ui/lucide-icon'
import { motion } from 'framer-motion'
import { defaultTransition, fadeInUpVariants } from '../animations'
import Link from 'next/link'

// Map for custom non-Lucide icons (like brand logos)
const customIconMap: Record<string, React.ReactNode> = {
  slack: <IconSlack className="size-10" />,
  figma: <img src="/figma-icon.svg" alt="Figma" className="w-20 h-20" />,
  chrome: <img src="/chrome-icon.svg" alt="Chrome" className="w-20 h-20" />,
}

// Icons that already have their own background circles in the SVG
const iconsWithOwnBackground = ['figma', 'chrome']

type PlatformCardProps = {
  contentKey: string
  icon: string
  ctaUrl: string
}

const PlatformCard = ({ contentKey, icon, ctaUrl }: PlatformCardProps) => {
  const isExternal = ctaUrl.startsWith('http')
  const ButtonWrapper = isExternal ? 'a' : Link

  // Check if it's a custom icon, otherwise use Lucide
  const iconElement = customIconMap[icon] || (
    <LucideIcon name={icon} className="size-10" strokeWidth={1} />
  )

  return (
    <div className="bg-white border border-offblack/10 rounded-2xl p-8 lg:p-12 flex flex-col gap-6">
      <div className="flex flex-col gap-2 items-center">
        {iconsWithOwnBackground.includes(icon) ? (
          <div className="flex items-center justify-center">
            {iconElement}
          </div>
        ) : (
          <div className="bg-offwhite rounded-full p-6 aspect-square flex items-center justify-center w-min">
            {iconElement}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3 items-center flex-1">
        <h4 className="text-xl lg:text-2xl font-medium text-center">
          <Content contentKey={`${contentKey}.title`} />
        </h4>
        <p className="text-base lg:text-lg text-center text-offblack/70 leading-relaxed">
          <Content contentKey={`${contentKey}.description`} />
        </p>
      </div>
      <div className="flex justify-center">
        <ButtonWrapper
          href={ctaUrl}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="inline-flex items-center justify-center px-6 py-3 bg-offblack text-white rounded-full font-medium text-base transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-black/10 hover:shadow-lg active:scale-[0.98] active:shadow-none active:brightness-95 transform-gpu"
        >
          <Content contentKey={`${contentKey}.cta-text`} />
        </ButtonWrapper>
      </div>
    </div>
  )
}

export default function HomepageWorksWhere() {
  const contentHomepage = useHomepageContent()
  const worksWhere = contentHomepage['works-where']

  return (
    <motion.section
      className="bg-offwhite py-24 lg:py-32 relative"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
      id="integrations"
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8 mx-auto w-full items-center flex flex-col gap-6 lg:gap-12 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center max-w-[800px]">
            <Content contentKey="works-where.title" />
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
          <PlatformCard
            contentKey="works-where.platform-1"
            icon={worksWhere['platform-1'].icon}
            ctaUrl={worksWhere['platform-1']['cta-url']}
          />
          <PlatformCard
            contentKey="works-where.platform-2"
            icon={worksWhere['platform-2'].icon}
            ctaUrl={worksWhere['platform-2']['cta-url']}
          />
        </div>
      </div>
    </motion.section>
  )
}
