'use client'
import Content from '@/content/content'
import { motion } from 'framer-motion'
import { defaultTransition, fadeInUpVariants } from '../animations'
import {
  ClarityCard,
  EmpathyCard,
  ActionOrientationCard
} from '@/components/homepage/benefit-cards'

export default function HomepageUltimatePRD() {
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
            <Content contentKey="the-gist.title" />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content contentKey="the-gist.subtitle" />
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 lg:p-12 border-[#DEDEDB] border z-[20] flex flex-col gap-8">
          <h3 className="text-xl lg:text-2xl font-serif font-light text-center">
            Add the Figma plugin to apply suggestions automatically
          </h3>

          <div className="flex items-center justify-center overflow-hidden">
            <div className="relative w-full max-w-[1200px] h-[600px] mx-auto">
              {/* Clarity card - back left */}
              <div
                className="absolute top-[80px] left-[50px] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300"
                style={{ zIndex: 1 }}
              >
                <ClarityCard />
              </div>

              {/* Empathy card - center, slightly forward */}
              <div
                className="absolute top-[40px] left-[280px] transform rotate-2 hover:rotate-0 hover:scale-105 transition-transform duration-300"
                style={{ zIndex: 2 }}
              >
                <EmpathyCard />
              </div>

              {/* Action Orientation card - front right */}
              <div
                className="absolute top-[100px] left-[520px] transform -rotate-2 hover:rotate-0 hover:scale-105 transition-transform duration-300"
                style={{ zIndex: 3 }}
              >
                <ActionOrientationCard />
              </div>
            </div>
          </div>

          <div className="flex justify-center -mt-4">
            <a
              href="https://www.figma.com/community/plugin/1470337876493896011/chordio-ai-design-review-copilot"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-offblack text-white rounded-full hover:bg-offblack/90 transition-colors font-medium text-base lg:text-lg"
            >
              Install the Figma plugin
            </a>
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
