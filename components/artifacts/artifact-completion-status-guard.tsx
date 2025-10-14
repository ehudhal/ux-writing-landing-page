'use client'
import { GenerationStatus } from '@/lib/db-schema/artifacts'
import { useArtifactGenerationStatus } from '@/lib/hooks/use-artifact-status'
import { motion } from 'framer-motion'

export function ArtifactCompletionStatusGuard({
  children,
  artifactId
}: {
  children: React.ReactNode
  artifactId: string
}) {
  const artifactStatus = useArtifactGenerationStatus(artifactId)
  if (!artifactStatus || artifactStatus !== GenerationStatus.COMPLETED) {
    return null
  }
  return <motion.div {...animation}>{children}</motion.div>
}

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, ease: [0, 0, 0.2, 1] as const }
}
