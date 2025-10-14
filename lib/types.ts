import { type Message } from 'ai'

export interface Chat extends Record<string, unknown> {
  id: string
  title: string
  createdAt: Date
  userId: string
  organizationId: string
  messages: Message[]
}

export type WithoutError<T> = Exclude<T, { error: string }>

export type Brand<K, T> = K & { __brand: T }

export type FeedbackType = 'helpful' | 'unhelpful'
