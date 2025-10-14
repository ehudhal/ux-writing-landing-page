import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export const useQueryString = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const setQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return pathname + '?' + params.toString()
    },
    [searchParams, pathname]
  )

  const setQueryStrings = useCallback(
    (keyValues: { name: string; value: string }[]) => {
      const params = new URLSearchParams(searchParams.toString())

      keyValues.forEach(({ name, value }) => {
        params.set(name, value)
      })

      return pathname + '?' + params.toString()
    },
    [searchParams, pathname]
  )

  const removeQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.delete(name)

      if (params.toString() === '') {
        return pathname
      }
      return pathname + '?' + params.toString()
    },
    [searchParams, pathname]
  )

  const removeQueryStrings = useCallback(
    (ids: string[]) => {
      const params = new URLSearchParams(searchParams.toString())
      ids.forEach(id => {
        params.delete(id)
      })

      if (params.toString() === '') {
        return pathname
      }
      return pathname + '?' + params.toString()
    },
    [searchParams, pathname]
  )

  return {
    setQueryString,
    setQueryStrings,
    removeQueryString,
    removeQueryStrings
  }
}
