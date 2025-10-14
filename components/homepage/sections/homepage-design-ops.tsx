import Content from '@/content/content'
import contentHomepage from '@/content/library/homepage.json'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../ui/button'
import { defaultTransition, fadeInUpVariants } from '../animations'

interface Section {
  title: string
  points: string[]
}

const baseDelay = 0

export default function HomepageDesignOps() {
  return (
    <motion.section
      className="bg-white py-16 lg:py-32 pb-24 lg:pb-16"
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={defaultTransition}
    >
      <div className="mx-auto max-w-[1024px] flex gap-8 lg:gap-16 flex-col items-center justify-between px-4 lg:px-0">
        <motion.h2
          className="text-3xl lg:text-5xl font-serif font-light text-center lg:text-left"
          variants={fadeInUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ ...defaultTransition, delay: baseDelay }}
        >
          <Content contentKey="design-ops.title" origin="homepage" />
        </motion.h2>
        <div className="flex gap-4 lg:gap-6 w-full flex-col justify-start">
          {(contentHomepage['design-ops'].sections as Section[]).map(
            (section: Section, index: number) => (
              <motion.div
                key={index}
                className="flex flex-col lg:flex-row gap-6 bg-[#F7F7F3] py-12 lg:py-24 px-6 lg:px-16 rounded-3xl lg:rounded-4xl w-full"
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  ...defaultTransition,
                  delay: baseDelay + 0.2 * (index + 1)
                }}
              >
                <div className="flex flex-col gap-6 w-full">
                  <h3 className="text-3xl lg:text-4xl font-light font-serif">
                    <Content
                      contentKey={`design-ops.sections.${index}.title`}
                      origin="homepage"
                    />
                  </h3>
                  <ul className="text-base lg:text-lg font-light list-disc ml-6 flex flex-col gap-4 max-w-[400px]">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex}>
                        <Content
                          contentKey={`design-ops.sections.${index}.points.${pointIndex}`}
                          origin="homepage"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative w-full min-h-[300px] lg:min-h-0">
                  {index === 0 && (
                    <>
                      <Image
                        src="/marketing/homepage/chordio-design-system.webp"
                        alt="Design Ops"
                        className="object-contain lg:size-72 size-64 absolute z-10 top-1/2 lg:left-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2"
                        width={275}
                        height={227}
                      />
                      <div className="absolute top-1/2 left-1/2 lg:left-[55%] -translate-x-1/2 -translate-y-1/2 lg:size-[314px] size-[250px] bg-[#D9ECF2] rounded-full"></div>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <Image
                        src="/marketing/homepage/chordio-design-brief-illustration.webp"
                        alt="Design Ops"
                        className="object-contain lg:size-72 size-52 absolute z-10 top-1/2 left-1/2 lg:left-[55%] -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black/15"
                        width={780 / 2 - 200}
                        height={799 / 2}
                      />
                      <div className="absolute top-1/2 left-1/2 lg:left-[55%] -translate-x-1/2 -translate-y-1/2 lg:size-[314px] size-[250px] bg-[#CEF5D9] rounded-full"></div>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <Image
                        src="/marketing/homepage/chordio-design-ops-03-A.svg"
                        alt="Design Ops"
                        className="object-contain lg:h-32 h-24 w-auto absolute z-20 top-[75%] left-[75%] -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black/15 rounded-xl"
                        width={182}
                        height={115}
                      />
                      <Image
                        src="/marketing/homepage/chordio-design-ops-03-B.svg"
                        alt="Design Ops"
                        className="object-contain lg:h-48 h-36 w-auto absolute z-10 top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-black/15 rounded-xl"
                        width={231}
                        height={154}
                      />
                      <div className="absolute top-1/2 left-1/2 lg:left-[55%] -translate-x-1/2 -translate-y-1/2 lg:size-[314px] size-[250px] bg-[#ECE4F6] rounded-full"></div>
                    </>
                  )}
                </div>
              </motion.div>
            )
          )}
          <motion.div
            className="flex flex-col justify-center items-center py-6 lg:py-8 gap-6 lg:gap-8 px-4 lg:px-0"
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ...defaultTransition, delay: baseDelay + 0.8 }}
          >
            <h5 className="text-xl lg:text-2xl font-light font-serif text-center">
              <Content contentKey="design-ops.cta.title" origin="homepage" />
            </h5>

            <Button
              asChild
              className="bg-[#C7E9F0] hover:bg-[#C7E9F0]/80 px-14 py-6 font-medium text-offblack transition-all ease-in-out hover:brightness-90 active:brightness-75 lg:size-min lg:px-16 lg:py-3 lg:text-lg"
            >
              <Link href="mailto:hello@chordio.com">
                <Content
                  contentKey="design-ops.cta.button-text"
                  origin="homepage"
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
