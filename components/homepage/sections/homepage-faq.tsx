'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { fadeInUpVariants } from '../animations'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { defaultTransition } from '../animations'

export default function HomepageFAQ() {
  const contentHomepage = useHomepageContent()
  const faqContent = contentHomepage['faq']

  return (
    <motion.section
      className="bg-offwhite py-24 lg:py-32 relative"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="lg:max-w-[900px] max-w-[95%] mx-auto w-full flex flex-col gap-6 lg:gap-12 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center">
            <Content contentKey="faq.title" />
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqContent && Object.keys(faqContent).filter(key => key.startsWith('question-')).map((key) => (
            <FAQItem key={key} contentKey={`faq.${key}`} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

type FAQItemProps = {
  contentKey: string
}

const FAQItem = ({ contentKey }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-2xl border border-offblack/10 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 lg:p-8 flex items-center justify-between gap-4 hover:bg-offwhite/50 transition-colors"
      >
        <h3 className="text-lg lg:text-xl font-medium">
          <Content contentKey={`${contentKey}.question`} />
        </h3>
        <ChevronDown
          className={`size-5 lg:size-6 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 lg:px-8 pb-6 lg:pb-8 pt-0">
          <p className="text-sm lg:text-base text-offblack/70 leading-relaxed">
            <Content contentKey={`${contentKey}.answer`} />
          </p>
        </div>
      )}
    </div>
  )
}
