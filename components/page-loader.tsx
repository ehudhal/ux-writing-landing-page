'use client'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

export default function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex size-full items-center justify-center"
    >
      <Loader2 className="size-8 animate-spin" strokeWidth={1} />
    </motion.div>
  )
}
