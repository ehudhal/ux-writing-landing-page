'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Loader } from 'lucide-react'
import { CSSProperties } from 'react'
import { Skeleton } from '../ui/skeleton'
import styles from './mockup-loader.module.css'

const AnimatedSkeleton = motion.create(Skeleton)

type MockupLoaderProps = {
  loading: boolean
  style?: CSSProperties
  className?: string
  thumbnail?: boolean
}

export default function MockupLoader({
  loading,
  style,
  className,
  thumbnail
}: MockupLoaderProps) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: loading ? 1 : 0 }}
      hidden={!loading}
    >
      <AnimatedSkeleton
        hidden={!loading}
        initial={{ opacity: 1 }}
        animate={{ opacity: loading ? 1 : 0 }}
        style={style as CSSProperties}
        className={cn(
          styles.skeleton,
          className,
          thumbnail ? styles.thumbnail : ''
        )}
      />
      <motion.div
        className={styles.loaderWrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 1 : 0 }}
      >
        <Loader className={styles.loader} strokeWidth={1} />
      </motion.div>
    </motion.div>
  )
}
