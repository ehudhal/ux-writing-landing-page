import Content from '@/content/content'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
    cardVariants,
    customEaseTransition,
    defaultTransition,
    fadeInUpVariants,
    fadeInVariants,
    scaleInVariants
} from '../animations'

const baseDelay = 0

export default function HomepageLeveragePatterns() {
  return (
    <motion.section
      className="pt-16 lg:pt-48 relative overflow-clip bg-[#F7F7F3]"
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ ...defaultTransition, delay: baseDelay }}
    >
      <div className="mx-auto max-w-[1024px] flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between px-6 lg:px-0">
        <motion.div
          className="flex flex-col gap-6 pb-32 lg:pb-52 z-[3]"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay + 0.2 }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-center lg:text-left">
            <Content contentKey="leverage-patterns.title" />
          </h2>
          <p className="text-lg lg:text-xl font-light text-center lg:text-left max-w-[500px]">
            <Content
              contentKey="leverage-patterns.description"
             
            />
          </p>
        </motion.div>
      </div>
      <div className="relative lg:absolute lg:top-0 lg:right-0 flex flex-col lg:flex-row justify-end items-end h-full self-end">
        <motion.div
          className="absolute  lg:right-1/2 lg:translate-x-1/2 top-[-50%] -translate-x-1/2 lg:top-[10%] bg-[#E6DCF4]/40 w-[327px] h-[327px] lg:w-[727px] lg:h-[727px] rounded-full z-[1]"
          variants={scaleInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...customEaseTransition, delay: baseDelay + 0.4 }}
        />
        <div className="relative w-full lg:w-auto">
          <div className="z-10">
            <Image
              src="/marketing/homepage/chordio-org-knowledge.svg"
              alt="PRDKit organization knowledge"
              className="relative shadow-2xl z-10 shadow-black/15 w-[90%] right-[-5%] mx-auto lg:w-auto lg:right-[-35%] lg:top-[5%] lg:max-w-[900px] xl:max-w-none"
              width={976}
              height={476}
            />
          </div>
          <div className="absolute bottom-[10%] right-[8%] lg:bottom-[10%] lg:right-[-10%] z-20 w-[90%] lg:w-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="flex gap-2 lg:gap-4"
            >
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="w-1/3 lg:max-w-[200px] xl:max-w-none lg:w-auto"
              >
                <Image
                  src="/marketing/homepage/chordio-org-knowledge-card-01.svg"
                  alt="Onboarding"
                  className="relative shadow-2xl rounded-xl shadow-black/15 w-full"
                  width={277}
                  height={174}
                />
              </motion.div>
              <motion.div
                custom={1}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="w-1/3 lg:w-auto lg:max-w-[200px] xl:max-w-none"
              >
                <Image
                  src="/marketing/homepage/chordio-org-knowledge-card-02.svg"
                  alt="Cancel subscription"
                  className="relative shadow-2xl rounded-xl shadow-black/15 w-full"
                  width={277}
                  height={174}
                />
              </motion.div>
              <motion.div
                custom={2}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="w-1/3 lg:w-auto lg:max-w-[200px] xl:max-w-none"
              >
                <Image
                  src="/marketing/homepage/chordio-org-knowledge-card-03.svg"
                  alt="AI UX Pattern"
                  className="relative shadow-2xl rounded-xl shadow-black/15 w-full"
                  width={277}
                  height={174}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
