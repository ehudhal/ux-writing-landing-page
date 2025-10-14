'use client'

import { ArtifactType } from '@/lib/db-schema/artifacts'
import { useArtifactQuery } from '@/lib/queries/artifacts-queries'
import { AnimatePresence, motion } from 'framer-motion'
import { ArtifactShareButton } from './artifact-share-button'

export function ArtifactShare({
  artifactId,
  type
}: {
  artifactId: string
  type: ArtifactType
}) {
  const { data: artifact, isSuccess } = useArtifactQuery(artifactId)

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {isSuccess && artifact && (
          <ArtifactShareButton
            artifactId={artifactId}
            shareToken={artifact.shareToken}
            type={type}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
