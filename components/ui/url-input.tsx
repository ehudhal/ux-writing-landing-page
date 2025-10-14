'use client'
import { useEffect, useState } from 'react'
import { Input, InputProps } from './input'

interface URLInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
  showValidation?: boolean
  showPrefix?: boolean
}

export function URLInput({
  value,
  onChange,
  showPrefix = false,
  ...props
}: URLInputProps) {
  const [displayValue, setDisplayValue] = useState(value)

  useEffect(() => {
    setDisplayValue(value)
  }, [value])

  const handleChange = (newValue: string) => {
    setDisplayValue(newValue)

    // Clean up the URL before passing it to parent
    let processedUrl = newValue.trim()

    // Only add protocol if there isn't one and there's content
    if (
      processedUrl &&
      !processedUrl.startsWith('http://') &&
      !processedUrl.startsWith('https://')
    ) {
      processedUrl = `https://${processedUrl}`
    }

    onChange(processedUrl)
  }

  const handleFocus = () => {
    if (!displayValue && showPrefix) {
      setDisplayValue('https://')
      onChange('https://')
    }
  }

  const handleBlur = () => {
    if (displayValue === 'https://') {
      setDisplayValue('')
      onChange('')
    }
  }

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={e => handleChange(e.target.value)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="https://example.com"
    />
  )
}
