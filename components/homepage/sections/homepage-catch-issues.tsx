import Content from '@/content/content'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { defaultTransition, fadeInUpVariants } from '../animations'

const baseDelay = 0

export default function HomepageCatchIssues() {
  return (
    <motion.section
      className="pt-28 relative overflow-clip px-8 bg-[#F7F7F3]"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ ...defaultTransition, delay: 0.8 }}
    >
      <div className="mx-auto max-w-[1024px] flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between px-6 lg:px-0">
        <motion.div
          className="flex flex-col gap-6 pb-12 lg:pb-28 order-1 lg:order-none"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-center lg:text-left">
            <Content contentKey="catch-issues.title" origin="homepage" />
          </h2>
          <p className="text-lg lg:text-xl font-light text-center lg:text-left max-w-[500px]">
            <Content contentKey="catch-issues.description" origin="homepage" />
          </p>
        </motion.div>
        <motion.div
          className="relative flex justify-center lg:justify-end items-end w-full lg:w-auto order-2 lg:order-none"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay + 0.2 }}
        >
          <Image
            src="/marketing/homepage/chordio-review-illustration.svg"
            alt="Catch issues early"
            className="relative z-10 shadow-2xl shadow-black/15 max-w-[90%] lg:max-w-none"
            width={498}
            height={461}
          />
          <div className="absolute translate-x-1/2 right-1/2 bottom-[-30%] translate-y-1/2 bg-[#BAEDC7]/40 w-[727px] h-[727px] rounded-full"></div>
        </motion.div>
      </div>
    </motion.section>
  )
}
