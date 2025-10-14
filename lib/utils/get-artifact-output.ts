'use server'

import { ArtifactType } from '@/lib/db-schema/artifacts'
import { getImageBlob } from '../actions/image-actions'
import { AIDevAgentInstructions } from '../chat/schemas/ai-dev-agent-instructions-schema'
import { SocialPosts } from '../chat/schemas/social-posts-schema'
import { Wireframe } from '../chat/schemas/wireframe-schema'
import {
  createFileKeyForFlowchart,
  createFileKeyForWireframe
} from '../files/file-utils'
import { BriefWithArtifacts } from '../services/artifacts-service'
import { ArtifactData, ArtifactOutputType } from '../types/artifact-data'

async function getFlowchartOutput(
  outputType: ArtifactOutputType,
  flowchart: string,
  flowchartId: string
) {
  if (outputType === 'markdown') {
    return `# Flowchart #\n\n\`\`\`mermaid\n${flowchart}\n\`\`\``
  }

  const fileKey = createFileKeyForFlowchart(flowchartId)

  const imageBlob = await getImageBlob(fileKey)
  if (!imageBlob) {
    throw new Error('Failed to fetch flowchart image')
  }
  return imageBlob
}

async function getWireframeOutput(
  outputType: ArtifactOutputType,
  wireframe: Wireframe,
  artifactId: string
) {
  const fileKey = createFileKeyForWireframe(artifactId)

  if (outputType === 'markdown') {
    //currently we should not get to this as the copy to markdown button does not appear for wireframes
    throw new Error('Wireframes are not supported in markdown')
  }

  const imageBlob = await getImageBlob(fileKey)
  if (!imageBlob) {
    throw new Error('Failed to fetch wireframe image')
  }
  return imageBlob
}

async function getDesignBriefOutput(
  outputType: ArtifactOutputType,
  data: BriefWithArtifacts
): Promise<string> {
  const { brief, flowchart } = data
  let output = `# ${brief.title} #\n`

  for (const section of brief.sections) {
    output += `## ${section.title} ##\n${section.content}\n`
  }

  if (brief.flowchartId) {
    if (outputType === 'markdown') {
      output += `\n## Flowchart ##\n\`\`\`mermaid\n${flowchart}\n\`\`\``
    }
  }
  return output
}

async function getSocialPostsOutput(
  outputType: ArtifactOutputType,
  data: SocialPosts
): Promise<string> {
  const { posts } = data
  let output = ''

  for (const post of posts) {
    output += `## ${post.title} ##\n${post.content}\n`
  }
  return output
}

async function getAIDevAgentInstructionsOutput(
  outputType: ArtifactOutputType,
  data: AIDevAgentInstructions
): Promise<string> {
  let output = `## Overview: ##\n${data.overview}\n`
  for (const task of data.tasks) {
    output += `## ${task.title} ##\n${task.description}\n`
    let stepIndex = 1
    for (const step of task.steps) {
      output += ` ${stepIndex}. ${step.description}\n`
      stepIndex++
    }
  }
  return output
}

export async function getArtifactOutput<T extends ArtifactType>(
  outputType: ArtifactOutputType,
  type: T,
  data: ArtifactData[T],
  artifactId: string
): Promise<string | Blob> {
  switch (type) {
    case ArtifactType.FLOWCHART:
      return getFlowchartOutput(outputType, data as string, artifactId)

    case ArtifactType.WIREFRAME:
      return getWireframeOutput(outputType, data as Wireframe, artifactId)

    case ArtifactType.DESIGN_BRIEF:
      return getDesignBriefOutput(outputType, data as BriefWithArtifacts)

    case ArtifactType.SOCIAL_POSTS:
      return getSocialPostsOutput(outputType, data as SocialPosts)

    case ArtifactType.DEV_AGENT_INSTRUCTIONS:
      return getAIDevAgentInstructionsOutput(
        outputType,
        data as AIDevAgentInstructions
      )

    default:
      return JSON.stringify(data, null, 2)
  }
}
