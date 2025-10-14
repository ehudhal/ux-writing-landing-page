'use client'
import { Flowchart } from '@/components/ui/flowchart'
import { ArtifactType } from '@/lib/db-schema/artifacts'
import { BriefWithArtifacts } from '@/lib/services/artifacts-service'
import { motion } from 'framer-motion'
import { BackToChatButton } from '../permanent-chat/chat/back-to-chat-button'
import {
  containerVariants,
  itemVariants,
  textVariants,
  titleVariants
} from './animation-variants'
import BriefViewArtifactActions from './brief-view-artifact-actions'
import { MarkdownSection } from './ui/markdown-section'
import WireframeView from './wireframe-view'
// Map section titles to their background colors
const SECTION_BACKGROUNDS = {
  Overview: 'bg-[#F9F9FB]',
  'Use Cases': 'bg-[#F9F9FB]',
  'Proposed Solution': 'bg-[#EBFAEE]',
  Requirements: 'bg-[#EBFAEE]',
  'Technical Considerations': 'bg-[#F0F9FF]'
} as const

type SectionBackground = keyof typeof SECTION_BACKGROUNDS

export default function BriefView({
  briefWithArtifacts,
  children,
  showBackToChat = true
}: {
  briefWithArtifacts: BriefWithArtifacts
  children?: React.ReactNode
  showBackToChat?: boolean
}) {
  const brief = briefWithArtifacts.brief
  const flowchart = briefWithArtifacts.flowchart
  const wireframes = Object.entries(briefWithArtifacts.wireframes || {})

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="mx-auto flex w-full max-w-4xl flex-col gap-2 overflow-y-auto p-4 md:gap-4 md:p-8"
    >
      <motion.div
        variants={itemVariants}
        className="mb-2 flex items-center justify-between gap-2"
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="flex items-center gap-2 font-serif text-xl font-medium md:text-2xl">
            {showBackToChat && <BackToChatButton />}
            {brief.title}
          </h1>
        </div>

        {children}
      </motion.div>

      {brief.sections.map((section, index) => (
        <motion.section
          key={index}
          variants={itemVariants}
          className={`flex flex-col gap-4 rounded-lg border border-[#F0F0EF] ${
            SECTION_BACKGROUNDS[section.title as SectionBackground] ||
            'bg-[#F9F9FB]'
          } p-4`}
        >
          <motion.section
            variants={itemVariants}
            className="rounded-lg bg-white p-6"
          >
            <div className="space-y-2">
              <motion.h3 variants={titleVariants} className="font-medium">
                {section.title}
              </motion.h3>
              <motion.div variants={textVariants}>
                <MarkdownSection content={section.content} />
              </motion.div>
            </div>
          </motion.section>
        </motion.section>
      ))}

      {flowchart && briefWithArtifacts.brief.flowchartId && (
        <motion.section
          variants={itemVariants}
          className="rounded-lg border border-[#F0F0EF] bg-[#F9F9FB] p-4"
        >
          <motion.section
            variants={itemVariants}
            className="space-y-2 rounded-lg bg-white p-6"
          >
            <motion.h3 variants={titleVariants} className="font-medium">
              User Flow
            </motion.h3>
            <motion.div variants={textVariants} className="relative p-4 group">
              <BriefViewArtifactActions
                artifact={flowchart}
                artifactType={ArtifactType.FLOWCHART}
                artifactId={briefWithArtifacts.brief.flowchartId}
                artifactTitle={brief.title}
              >
                <Flowchart definition={flowchart} />
              </BriefViewArtifactActions>
            </motion.div>
          </motion.section>
        </motion.section>
      )}

      {wireframes.length > 0 && (
        <motion.section
          variants={itemVariants}
          className="rounded-lg border border-[#F0F0EF] bg-white p-2"
        >
          {wireframes.map(([wireframeId, wireframe]) => (
            <BriefViewArtifactActions
              key={wireframeId}
              artifact={wireframe}
              artifactType={ArtifactType.WIREFRAME}
              artifactId={wireframeId}
              artifactTitle={wireframe.name}
              className="top-3 right-3"
              dialogContentClassName="p-0"
            >
              <WireframeView
                key={wireframeId}
                wireframeId={wireframeId}
                wireframe={wireframe}
                showBackToChat={false}
                shareToken={wireframe.shareToken}
                fullHeight={true}
              />
            </BriefViewArtifactActions>
          ))}
        </motion.section>
      )}
    </motion.div>
  )
}
