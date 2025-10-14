import Content from '@/content/content'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { defaultTransition, fadeInUpVariants } from '../animations'

const baseDelay = 0

export default function HomepageNoSpec() {
  return (
    <motion.section
      className="pt-32 lg:pt-32 relative overflow-clip bg-white"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ ...defaultTransition, delay: 0.8 }}
    >
      <div className="mx-auto max-w-[1024px] px-6 flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between">
        <motion.div
          className="relative flex justify-end items-end h-full self-end order-2 lg:order-1"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay + 0.2 }}
        >
          <Image
            src="/marketing/homepage/chordio-brief.svg"
            alt="No spec? No problem!"
            className="relative z-10 shadow-2xl shadow-black/15 mb-[-80%]"
            width={461}
            height={824}
          />
          <div className="absolute translate-x-1/2 right-1/2 bottom-[-30%] translate-y-1/2 bg-[#BAEDC7]/40 w-[727px] h-[727px] rounded-full"></div>
        </motion.div>
        <motion.div
          className="flex flex-col gap-6 pb-20 lg:pb-38 order-1 lg:order-2"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay }}
        >
          <h2 className="text-4xl lg:text-5xl font-serif font-light text-center lg:text-left">
            <Content contentKey="no-spec.title" />
          </h2>
          <p className="text-lg lg:text-xl font-light text-center lg:text-left max-w-[500px]">
            <Content contentKey="no-spec.description" />
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
