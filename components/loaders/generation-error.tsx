import { TriangleAlert } from 'lucide-react'
import React from 'react'
import styles from './generation-error.module.css'

interface GenerationErrorProps {
  message?: string
}

const GenerationError: React.FC<GenerationErrorProps> = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          <TriangleAlert strokeWidth={1} />
        </div>
        <p className={styles.errorMessage}>
          Something went wrong. <br />
          If the issue persists, contact us at{' '}
          <a href="mailto:support@chordio.com">support@chordio.com</a>.
        </p>
      </div>
    </div>
  )
}

export default GenerationError
