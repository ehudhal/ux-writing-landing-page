import { clsx, type ClassValue } from 'clsx'
import { NextRequest } from 'next/server'
import { twMerge } from 'tailwind-merge'

const isProductionEnvironment = () => process.env.NODE_ENV === 'production'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// nanoid removed for simplicity

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export function kebabToTitleCase(input: string) {
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function getColorLuminance(hexColor: string) {
  // Remove the hash at the start of the hex color string if it's present
  const hex = hexColor.replace(/^#/, '')

  // Parse the r, g, b values
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  // Calculate the luminance
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  // Standard threshold for luminance to switch between black and white text
  return luminance > 128 ? 'light' : 'dark'
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>

export type Exclude<Value, ToExclude> = Value extends ToExclude ? never : Value

export function transformFieldsToDate<T extends object>(
  obj: T,
  fieldNames: string[]
) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key]

      if (fieldNames.includes(key)) {
        if (typeof value === 'string') {
          obj[key] = new Date(value) as T[Extract<keyof T, string>]
        }
      } else if (typeof value === 'object' && value !== null) {
        obj[key] = transformFieldsToDate(value, fieldNames)
      }
    }
  }

  return obj
}

export function failOnProduction() {
  if (isProductionEnvironment()) {
    throw new Error('This script is not allowed to run in production')
  }
}
// JsonifyObject types removed for simplicity

export function filesArrayToFileList(files: File[]) {
  const dataTransfer = new DataTransfer()
  files.forEach(file => {
    dataTransfer.items.add(file)
  })
  return dataTransfer.files
}

export function JSONSafeParse<T>(value: string) {
  try {
    return JSON.parse(value) as T
  } catch (error: unknown) {
    if (error instanceof Error) {
      error.message = `Failed to parse JSON: ${error.message}`
    }
    console.error(error)
    return null
  }
}

export function pathLogger(request: NextRequest) {
  const ignorePaths = ['/api', '/_next', '/favicon.ico', '/api/inngest']
  if (ignorePaths.includes(request.nextUrl.pathname)) {
    return
  }
  const datetime = new Date().toLocaleString('en-US', {
    timeStyle: 'medium',
    hour12: false,
    dateStyle: 'short'
  })

  const method = request.method.padEnd(5, ' ')
  console.log(
    `\x1b[32m${method}\x1b[0m`,
    `\x1b[34m[${datetime}]\x1b[0m`,
    request.nextUrl.pathname,
    request.nextUrl.searchParams.toString()
  )
}
