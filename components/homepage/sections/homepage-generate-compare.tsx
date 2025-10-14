import Content from '@/content/content'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  customEaseTransition,
  defaultTransition,
  fadeInUpVariants,
  fadeInVariants,
  scaleInVariants
} from '../animations'

const baseDelay = 0

export default function HomepageGenerateCompare() {
  return (
    <motion.section
      className="bg-[#E0F0F5] py-24 lg:py-48 relative overflow-clip"
      variants={fadeInVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="max-w-[1024px] mx-auto w-full flex flex-col lg:flex-row lg:justify-end lg:items-end relative px-6 lg:px-0">
        <motion.div
          className="flex flex-col gap-6 z-20 pb-12 lg:pb-0"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-center lg:text-left">
            <Content contentKey="generate-compare.title" origin="homepage" />
          </h2>
          <p className="text-lg lg:text-xl font-light text-center lg:text-left lg:max-w-[500px] ">
            <Content
              contentKey="generate-compare.description"
              origin="homepage"
            />
          </p>
        </motion.div>
      </div>

      <div className="relative mt-12 w-full flex justify-center lg:absolute lg:h-full lg:top-0 lg:left-0 2xl:left-[0] ">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: -10 }}
          viewport={{ once: true }}
          transition={{ ...customEaseTransition, delay: baseDelay + 0.4 }}
          className="relative z-10 lg:absolute lg:scale-100 scale-125 -left-[10%] lg:top-[30%]  2xl:left-0 shadow-2xl shadow-black/15 max-w-[90%] lg:max-w-[600px] 2xl:max-w-[50%] "
        >
          <Image
            src="/marketing/homepage/chordio-wireframe-example.webp"
            alt="Generate & compare UX approaches"
            width={766}
            height={479}
          />
        </motion.div>
        <motion.div
          className="absolute top-[10%] left-[5%] bg-chordio-blue/50 w-[727px] h-[727px] rounded-full"
          variants={scaleInVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...customEaseTransition, delay: baseDelay + 0.2 }}
        />
      </div>
    </motion.section>
  )
}
