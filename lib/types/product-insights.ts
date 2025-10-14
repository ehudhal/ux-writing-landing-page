import { z } from 'zod'

export const InsightType = {
  OVERVIEW: 'overview',
  USER_PERSONAS: 'userPersonas',
  BUSINESS_ASPECTS: 'businessAspects'
} as const

export type InsightType = (typeof InsightType)[keyof typeof InsightType]

export const InsightTitles: Record<InsightType, string> = {
  [InsightType.OVERVIEW]: 'Overview',
  [InsightType.USER_PERSONAS]: 'User Personas',
  [InsightType.BUSINESS_ASPECTS]: 'Business Aspects'
} as const

export const productInsightSchema = z.object({
  content: z.string()
})

export const productInsightsSchema = z.object({
  [InsightType.OVERVIEW]: productInsightSchema,
  [InsightType.USER_PERSONAS]: productInsightSchema,
  [InsightType.BUSINESS_ASPECTS]: productInsightSchema
})

export type ProductInsight = z.infer<typeof productInsightSchema>
export type ProductInsights = z.infer<typeof productInsightsSchema>
