export const PAGE_TYPES = {
  DESIGN: 'd',
  SHARED: 's',
  EXAMPLE: 'e'
} as const

export type PageType = (typeof PAGE_TYPES)[keyof typeof PAGE_TYPES]
