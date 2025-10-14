import Content from '@/content/content'
import { SignUpButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { defaultTransition, fadeInUpVariants } from '../animations'
import PRDKitButton from '../chordio-button'

export default function HomepageBetterTime() {
  return (
    <motion.section
      className="bg-[#E0F0F5] py-24 lg:py-32 relative"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[1024px] max-w-[80%] mx-auto w-full flex flex-col gap-6 lg:gap-10 relative px-4 lg:px-0">
        <h2 className="text-2xl lg:text-5xl font-serif font-light text-center ">
          <Content contentKey="better-time.title" />
        </h2>
        <div className="flex flex-col items-center gap-4">
          <SignUpButton>
            <PRDKitButton>
              <Content contentKey="better-time.cta-text" />
            </PRDKitButton>
          </SignUpButton>
        </div>
      </div>
      <Image
        className="absolute bottom-[-108px] left-0 hidden z-10 lg:block"
        src="/marketing/homepage/homepage-left-element.svg"
        alt="Homepage Left Element"
        width={392}
        height={430}
      />
      <Image
        className="absolute bottom-[-322px] right-0 top-0 hidden lg:block"
        src="/marketing/homepage/homepage-right-element.svg"
        alt="Homepage Right Element"
        width={214}
        height={430}
      />
    </motion.section>
  )
}
