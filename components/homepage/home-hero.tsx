'use client'
import Content from '@/content/content'
import { motion } from 'framer-motion'
import { useState } from 'react'
import InitialChatView from '../permanent-chat/chat/initial-chat-view/initial-chat-view'
import { IconYC } from '../ui/icons'
import { createTransition, fadeInUpVariants } from './animations'
import './home-styles.css'

export default function HomeHero() {
  const [input, setInput] = useState('')

  return (
    <div className="relative w-full md:h-full flex flex-col gap-8 flex-1 justify-center items-center pb-20  md:min-h-auto ">
      <InitialChatView
        input={input}
        setInput={setInput}
        handleSubmit={async () => {
          // Demo mode - no actual submission
        }}
        clearInputOnSubmit={false}
        submitOnFileUpload={true}
        autoFocus={false}
        className="lg:pt-28  pt-8"
        title={<Content contentKey="hero.title" origin="homepage" />}
        subtitle={<Content contentKey="hero.subtitle" origin="homepage" />}
        chatButtonsContainerClassName="bottom-3 items-end"
        sendButtonVariant="fancy"
      ></InitialChatView>
      <motion.div
        variants={fadeInUpVariants}
        initial="hidden"
        animate="visible"
        transition={createTransition(0.6)}
      >
        <span className="flex items-center mt-4 gap-1 text-base text-[#727272]">
          Backed by <IconYC className="size-6 lg:size-8 text-[#9e9e9e]" />{' '}
          Combinator
        </span>
      </motion.div>
    </div>
  )
}
