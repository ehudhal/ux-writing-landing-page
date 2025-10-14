import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { LocalStorage } from '../localstorage'

type Value = string | object | boolean

export const useLocalStorage = <T extends Value | null>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  const { userId } = useAuth()
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  useEffect(() => {
    // Retrieve from localStorage
    const item = LocalStorage.getItem<T>(key, userId ?? null)
    if (item !== null) {
      setStoredValue(item)
    }
  }, [key, userId])

  const setValue = (value: T) => {
    // Save state
    setStoredValue(value)

    // Save to localStorage
    LocalStorage.setItem(key, value, userId ?? null)
  }

  return [storedValue, setValue]
}
