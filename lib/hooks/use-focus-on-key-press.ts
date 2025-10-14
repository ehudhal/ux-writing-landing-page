import { useEffect, useRef } from 'react'

/**
 * Hook to focus on an element when a specific key is pressed.
 * @param key - The key to listen for.
 * @param excludeTargets - An array of target types to exclude from focusing. Defaults to [HTMLInputElement, HTMLTextAreaElement].
 * @docs https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-construct-signatures
 * @returns A ref to the element to focus on.
 */
export function useFocusOnKeyPress<T extends HTMLElement>(
  key: string,
  excludeTargets: (new () => HTMLElement)[] = []
) {
  const inputRef = useRef<T>(null)

  useEffect(() => {
    // Only set default exclude targets in browser environment
    const defaultExcludeTargets =
      typeof window !== 'undefined'
        ? [HTMLInputElement, HTMLTextAreaElement]
        : []

    const finalExcludeTargets =
      excludeTargets.length > 0 ? excludeTargets : defaultExcludeTargets

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === key &&
        !finalExcludeTargets.some(target => e.target instanceof target)
      ) {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [key, excludeTargets])

  return inputRef
}
