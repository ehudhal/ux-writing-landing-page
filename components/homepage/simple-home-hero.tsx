'use client'
import Content from '@/content/content'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { IconYC } from '../ui/icons'
import { createTransition, fadeInUpVariants } from './animations'
import './home-styles.css'

export default function SimpleHomeHero() {
  return (
    <div className="relative w-full md:h-full flex flex-col gap-8 flex-1 justify-center items-center pb-20 md:min-h-auto">
      <div className="lg:pt-28 pt-8 flex flex-col items-center gap-6 max-w-4xl px-4">
        <h1 className="text-4xl lg:text-6xl font-serif font-light text-center">
          <Content contentKey="hero.title" />
        </h1>
        <p className="text-xl lg:text-2xl text-center text-gray-600">
          <Content contentKey="hero.subtitle" />
        </p>
        <Button className="gradient-bg px-8 md:px-16 py-7 text-lg mt-8 text-offblack transition-all duration-300 ease-in-out hover:scale-[1.02] shadow-black/10 hover:shadow-lg active:scale-[0.98] active:shadow-none active:brightness-95">
          <Content contentKey="hero.cta-text" />
        </Button>
      </div>
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={createTransition(0.6)}
      >
        <span className="flex items-center mt-4 gap-1 text-base text-[#727272]">
          <Content contentKey="hero.yc-badge" />{' '}
          <IconYC className="size-6 lg:size-8 text-[#9e9e9e]" />
        </span>
      </motion.div>
    </div>
  )
}
