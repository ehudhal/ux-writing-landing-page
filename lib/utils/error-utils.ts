export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return 'Unknown error'
}

export const throwError = (error: string, payload?: object): never => {
  console.error(error, payload)
  throw new Error(error)
}

export const errorResponse = (error: string, payload?: object) => {
  if (payload) {
    console.warn(error, payload)
  }

  return {
    error
  }
}
