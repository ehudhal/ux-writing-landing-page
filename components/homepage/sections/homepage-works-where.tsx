'use client'
import Content from '@/content/content'
import { useHomepageContent } from '@/content/content-origin-context'
import { IconSlack, IconTeams } from '@/components/ui/icons'
import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'
import { defaultTransition, fadeInUpVariants } from '../animations'

export default function HomepageWorksWhere() {
  const contentHomepage = useHomepageContent()
  const worksWhere = contentHomepage['works-where']
  return (
    <motion.section
      className="bg-offwhite pb-24 lg:pb-32 relative "
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
      id="integrations"
    >
      <div className="lg:max-w-[1200px] max-w-[95%] lg:px-8  mx-auto w-full items-center flex flex-col gap-6 lg:gap-12 relative px-4 lg:px-0">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-2xl lg:text-[42px] font-serif font-light text-center max-w-[800px]">
            <Content contentKey="works-where.title" />
          </h2>
          <p className="text-center text-base lg:text-xl font-light">
            <Content contentKey="works-where.subtitle" />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            className="flex flex-col items-center justify-center gap-8 rounded-lg p-12"
            style={{ backgroundColor: worksWhere.slack['bg-color'] }}
          >
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-white rounded-full p-8 aspect-square flex items-center justify-center w-min">
                <IconSlack className="size-10" />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-2xl font-medium">
                <Content contentKey="works-where.slack.title" />
              </h4>
              <p className="text-lg text-center">
                <Content
                  contentKey="works-where.slack.description"
                 
                />
              </p>
            </div>
          </div>
          <div
            className="relative flex flex-col items-center justify-center gap-8 rounded-lg p-12"
            style={{ backgroundColor: worksWhere.teams['bg-color'] }}
          >
            <span className="absolute top-5 right-5 bg-white rounded-full p-3 px-4 py-2 border">
              <Content contentKey="works-where.teams.badge" />
            </span>
            <div className="flex flex-col gap-2 items-center">
              <div className="bg-white rounded-full p-8 aspect-square flex items-center justify-center w-min">
                <IconTeams className="size-10" />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-2xl font-medium">
                <Content contentKey="works-where.teams.title" />
              </h4>
              <p className="text-lg text-center">
                <Content
                  contentKey="works-where.teams.description"
                 
                />
              </p>
            </div>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-8 rounded-lg p-12"
            style={{ backgroundColor: worksWhere.web['bg-color'] }}
          >
            <div className="flex flex-col gap-2 items-center">
              <div
                className="bg-white rounded-full p-8 aspect-square flex items-center justify-center w-min"
                style={{ color: worksWhere.web['icon-color'] }}
              >
                <Globe className="size-10" strokeWidth={1} />
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <h4 className="text-2xl font-medium">
                <Content contentKey="works-where.web.title" />
              </h4>
              <p className="text-lg text-center ">
                <Content
                  contentKey="works-where.web.description"
                 
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
