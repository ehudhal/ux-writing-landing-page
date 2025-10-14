export const ERROR_CONSTANTS = {
  UNAUTHORIZED: 'Unauthorized',
  NOTFOUND: 'Not found',
  GENERIC: 'An error occurred'
}

export type ErrorConstants = typeof ERROR_CONSTANTS
// single error constant
export type ErrorConstant = keyof ErrorConstants

export const CUSTOMIZATION_ERROR_CONSTANTS = {
  INVALID: 'Invalid design token',
  NOT_FOUND: 'Design token not found',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_SIZE_LIMIT_EXCEEDED: 'File size limit exceeded'
}

export const VALID_ERRORS = [
  ...Object.values(CUSTOMIZATION_ERROR_CONSTANTS),
  ...Object.values(ERROR_CONSTANTS)
]
