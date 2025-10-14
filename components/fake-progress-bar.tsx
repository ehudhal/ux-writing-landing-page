'use client'

import { useEffect, useState } from 'react'
import { Progress } from './ui/progress'

const FakeProgressBar = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (progress < 100) setProgress(p => p + 1)
        else {
          clearInterval(interval)
        }
      },
      1000 + Math.random() * 600
    )

    return () => {
      clearInterval(interval)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Progress value={progress} />
}

export default FakeProgressBar
