export const Permissions = {
  DesignRead: 'design.read',
  DesignWrite: 'design.write'
} as const

export type UserPermission = (typeof Permissions)[keyof typeof Permissions]
