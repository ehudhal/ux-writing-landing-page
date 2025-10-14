'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { useIsMobile } from '@/lib/hooks/use-media-query'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { defaultTransition, fadeInUpVariants } from '../animations'

export default function HomepageUltimatePRD() {
  const isMobile = useIsMobile()
  const contentHomepage = useHomepageContent()
  const chatCard = contentHomepage['ultimate-prd']['chat-card']
  const prdCard = contentHomepage['ultimate-prd']['prd-card']

  return (
    <motion.section
      className="bg-offwhite py-24 lg:py-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8  mx-auto w-full flex flex-col gap-6 lg:gap-16 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center ">
            <Content contentKey="ultimate-prd.title" />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content contentKey="ultimate-prd.subtitle" />
          </p>
        </div>
        <div className=" bg-white rounded-2xl flex flex-col lg:flex-row gap-4 p-6 border-[#DEDEDB] border z-[20]">
          <div className="flex flex-col justify-between gap-4 w-full lg:w-1/2">
            <h4 className="text-xl font-serif font-light">
              <Content
                contentKey="ultimate-prd.chat-card.title"
               
              />
            </h4>
            <Image
              src={isMobile ? chatCard['image-mobile'] : chatCard.image}
              alt={chatCard.title}
              className="w-full h-full object-cover rounded-2xl"
              width={1106}
              height={680}
            />
          </div>
          <div className="flex flex-col justify-between gap-4 w-full lg:w-1/2">
            <h4 className="text-xl font-serif font-light">
              <Content
                contentKey="ultimate-prd.prd-card.title"
               
              />
            </h4>
            <Image
              src={isMobile ? prdCard['image-mobile'] : prdCard.image}
              alt={prdCard.title}
              width={1106}
              className="w-full h-full object-cover rounded-2xl"
              height={680}
            />
          </div>
        </div>
      </div>
      <svg
        width="648"
        height="384"
        viewBox="0 0 648 384"
        fill="none"
        className="absolute bottom-0 left-[0] z-[10]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M648 384C648 282.157 607.543 184.485 535.529 112.471C463.515 40.457 365.843 7.68894e-06 264 0C162.157 -7.68894e-06 64.485 40.457 -7.52898 112.471C-79.5429 184.485 -120 282.157 -120 384L264 384H648Z"
          fill="#E3F4F7"
        />
      </svg>
    </motion.section>
  )
}
