import { ArtifactType } from '@/lib/db-schema/artifacts'

export type FeedbackOption = {
  label: string
  suggestion: string | null
}

type FeedbackOptions = Record<ArtifactType, FeedbackOption[]>

export const feedbackOptionsByType: FeedbackOptions = {
  [ArtifactType.WIREFRAME]: [
    {
      label: 'Issue with components usage',
      suggestion:
        'Try providing feedback to PRDKit. In 60% of the cases, PRDKit was able to provide a good response after the first feedback message, and in 70% of the times a second feedback message did the trick.'
    },
    {
      label: 'Not using the right pages from knowledge',
      suggestion:
        'Try providing feedback to PRDKit. In 60% of the cases, PRDKit was able to provide a good response after the first feedback message, and in 70% of the times a second feedback message did the trick.'
    },
    {
      label: 'Issue with UX copy',
      suggestion:
        'Try providing feedback to PRDKit. In 60% of the cases, PRDKit was able to provide a good response after the first feedback message, and in 70% of the times a second feedback message did the trick.'
    },
    {
      label: 'Design does not match prompt',
      suggestion:
        'Try providing feedback to PRDKit. In 60% of the cases, PRDKit was able to provide a good response after the first feedback message, and in 70% of the times a second feedback message did the trick.'
    },
    {
      label: 'Other',
      suggestion: null
    }
  ],
  [ArtifactType.FLOWCHART]: [
    {
      label: 'Incorrect steps',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    },
    {
      label: 'Missing steps',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    },
    {
      label: 'Other',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    }
  ],
  [ArtifactType.DESIGN_BRIEF]: [
    {
      label: 'Too superficial',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    },
    {
      label: 'Too vague',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    },
    {
      label: 'Factually incorrect',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    },
    {
      label: 'Other',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    }
  ],
  [ArtifactType.SOCIAL_POSTS]: [
    {
      label: 'Too superficial',
      suggestion:
        'Try providing feedback to PRDKit. In 60% of the cases, PRDKit was able to provide a good response after the first feedback message, and in 70% of the times a second feedback message did the trick.'
    },
    {
      label: 'Does not match the product requirements',
      suggestion:
        'Make sure that you have provided the product requirements to the Chat either as a PRD or as a conversation.'
    },
    {
      label: 'Other',
      suggestion: 'Make sure to provide the right tone for the social post.'
    }
  ],
  [ArtifactType.DEV_AGENT_INSTRUCTIONS]: [
    {
      label: 'Too superficial',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    },
    {
      label: 'Does not match the product requirements',
      suggestion:
        'Make sure that you have provided the product requirements to the chat either as a PRD or as a conversation.'
    },
    {
      label: 'Other',
      suggestion:
        'Try providing feedback. PRDKit is able to course correct after a single feedback message most of the times.'
    }
  ]
}
