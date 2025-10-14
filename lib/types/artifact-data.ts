import { ArtifactType } from '../db-schema/artifacts'

import { AIDevAgentInstructions } from '../chat/schemas/ai-dev-agent-instructions-schema'
import { SocialPosts } from '../chat/schemas/social-posts-schema'
import { Wireframe } from '../chat/schemas/wireframe-schema'
import { BriefWithArtifacts } from '../services/artifacts-service'
export type ArtifactData = {
  [ArtifactType.FLOWCHART]: string
  [ArtifactType.DESIGN_BRIEF]: BriefWithArtifacts
  [ArtifactType.WIREFRAME]: Wireframe
  [ArtifactType.SOCIAL_POSTS]: SocialPosts
  [ArtifactType.DEV_AGENT_INSTRUCTIONS]: AIDevAgentInstructions
}

export type ArtifactOutputType = 'markdown' | 'html' | 'image'

// map from artifact type to the user-friendly name
export const artifactTypeToName = {
  [ArtifactType.DESIGN_BRIEF]: 'product requirements',
  [ArtifactType.FLOWCHART]: 'flowchart',
  [ArtifactType.WIREFRAME]: 'wireframe',
  [ArtifactType.SOCIAL_POSTS]: 'social posts',
  [ArtifactType.DEV_AGENT_INSTRUCTIONS]: 'dev agent instructions'
} as const
