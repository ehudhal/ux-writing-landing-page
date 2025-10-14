export type RequestContextData = {
  userId: string
  organizationId: string
  designId: string
  lastActionMessageIndex?: number
  productId?: string | null
  slackThreadId?: string
}
