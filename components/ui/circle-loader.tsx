import React from 'react'
import { motion } from 'framer-motion'

const SliceLoader = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div className="relative flex size-1/2 items-center justify-center rounded-full">
      {/* Circle Background */}
      <div className="absolute size-full rounded-full bg-white"></div>

      <motion.div
        hidden={!isVisible}
        className="absolute size-full rounded-full"
        style={{
          background: 'conic-gradient(#4f46e5 0deg, transparent 0deg)'
        }}
        animate={{
          background: [
            'conic-gradient(#F2F2F4 0deg, transparent 0deg)', // Empty
            'conic-gradient(#F2F2F4 360deg, transparent 0deg)' // Full circle
          ]
        }}
        transition={{
          duration: 3, // 3 seconds for a full circle
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}

export default SliceLoader
