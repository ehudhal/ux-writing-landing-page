'use client'
import Content from '@/content/content'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { defaultTransition, fadeInUpVariants } from '../animations'

export default function HomepagePrivacy() {
  return (
    <div className="relative bg-offwhite w-full flex flex-col items-center">
      <div className="h-32 bg-white lg:h-20 w-full"></div>
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={defaultTransition}
        className="relative max-w-[95%]  flex -translate-y-1/2 flex-col items-start justify-start  gap-3 overflow-hidden rounded-[2rem] bg-[#CEF5D9]   p-8 pt-10 w-full  lg:min-h-[230px]  lg:mx-auto lg:px-16 lg:py-12 lg:max-w-[1024px]"
        id="security"
      >
        <Image
          src="/marketing/homepage/fingerprint-lock.svg"
          alt="AI Privacy"
          width={113}
          height={113}
          className=" block h-24 w-auto lg:hidden"
        />
        <h2 className="text-left font-serif text-3xl font-light lg:text-4xl">
          <Content contentKey="privacy.title" origin="homepage" />
        </h2>
        <div className="text-left text-base">
          <Content contentKey="privacy.subtitle" origin="homepage" />
          <br />
          <Link
            href="/privacy"
            className="cursor-pointer text-left text-base underline"
          >
            <Content contentKey="privacy.link-text" origin="homepage" />
          </Link>
        </div>
        <Image
          className="absolute right-0 top-0 hidden h-full w-auto lg:block"
          src="/marketing/homepage/ai-privacy-abstract.svg"
          alt="AI Privacy"
          width={725}
          height={476}
        />
      </motion.div>
    </div>
  )
}
