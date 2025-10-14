import { hasDesignReadPermission } from '../backend-util/permission-checks'
import { AIDevAgentInstructions } from '../chat/schemas/ai-dev-agent-instructions-schema'
import { SocialPosts } from '../chat/schemas/social-posts-schema'
import { Wireframe } from '../chat/schemas/wireframe-schema'
import { ERROR_CONSTANTS } from '../constants/error-constants'
import { Artifact, ArtifactType } from '../db-schema/artifacts'
import * as service from '../services/artifacts-service'
import { getDesign } from '../services/designs-service'
import { errorResponse } from '../utils/error-utils'

const { NOTFOUND, UNAUTHORIZED } = ERROR_CONSTANTS

export type BriefWithArtifacts = service.BriefWithArtifacts

export async function provideArtifactWithContentByShareToken(
  shareToken: string
): Promise<
  | (Artifact & {
      content: {
        [ArtifactType.DESIGN_BRIEF]: BriefWithArtifacts
        [ArtifactType.FLOWCHART]: string
        [ArtifactType.WIREFRAME]: Wireframe
        [ArtifactType.SOCIAL_POSTS]: SocialPosts
        [ArtifactType.DEV_AGENT_INSTRUCTIONS]: AIDevAgentInstructions
      }[Artifact['artifactType']]
    })
  | { error: string }
> {
  const artifact = await service.getArtifactByShareToken(shareToken)
  if (!artifact) {
    return errorResponse(NOTFOUND, { shareToken })
  }

  const design = await getDesign(artifact.designId)
  if (!design) {
    return errorResponse(NOTFOUND, { designId: artifact.designId })
  }

  const content = await service.getArtifactContent(
    artifact.artifactId,
    artifact.artifactType
  )
  if (!content) {
    return errorResponse(NOTFOUND, { artifactId: artifact.artifactId })
  }
  return { ...artifact, content } as any
}

export async function provideArtifactById(artifactId: string) {
  const artifact = await service.getArtifactById(artifactId)
  if (!artifact) {
    return errorResponse(NOTFOUND, { artifactId })
  }
  const hasReadPermission = await hasDesignReadPermission(artifact.designId)
  if (!hasReadPermission) {
    return errorResponse(UNAUTHORIZED, { artifactId })
  }

  return artifact
}

export async function provideArtifactWithContentById<
  T extends service.ArtifactContentType
>(artifactId: string) {
  return service.getArtifactWithContentById<T>(artifactId)
}

export type ArtifactWithContent<T extends service.ArtifactContentType> =
  Awaited<ReturnType<typeof provideArtifactWithContentById<T>>>
