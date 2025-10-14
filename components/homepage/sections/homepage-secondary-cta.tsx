'use client'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { defaultTransition, fadeInUpVariants } from '../animations'

export default function HomepageSecondaryCta() {
  return (
    <motion.section
      className="bg-offwhite pb-24 lg:pb-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8  mx-auto w-full items-center flex flex-col gap-6 lg:gap-12 relative px-4">
        <div className="flex flex-col items-center gap-4 mb-4 bg-white rounded-4xl lg:p-0 p-8 lg:rounded-full lg:py-24 w-full">
          <h2 className="text-3xl lg:text-[42px] font-serif font-light text-center max-w-[800px]">
            Start crafting exceptional PRDs today
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            Join innovative teams saving hours, improving communication, and
            bringing ideas to life with PRDKit.
          </p>
          <Button className="gradient-bg px-8 md:px-16 py-7  text-lg mt-8 text-offblack transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-black/10 hover:shadow-lg active:scale-[0.98] active:shadow-none active:brightness-95">
            Get Started for Free
          </Button>
        </div>
      </div>
    </motion.section>
  )
}
