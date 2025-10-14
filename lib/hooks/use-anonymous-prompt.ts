import { useEffect } from 'react'
import { LocalStorage } from '../localstorage'

const anonymous_prompt_key = 'anonymous_prompt'

export default function useAnonymousPrompt(
  onPrompt?: (prompt: string) => void
) {
  const setAnonymousPrompt = (prompt: string) => {
    LocalStorage.setItem(anonymous_prompt_key, prompt, null)
  }

  useEffect(() => {
    const prompt = LocalStorage.getItem<string>(anonymous_prompt_key, null)
    if (prompt && onPrompt) {
      onPrompt(prompt)
      LocalStorage.removeItem(anonymous_prompt_key, null)
    }
  }, [onPrompt])

  return {
    setAnonymousPrompt
  }
}
