'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface MotionWrapperProps {
  children: ReactNode
  initial?: any
  animate?: any
  transition?: any
  className?: string
}

export function MotionDiv({ children, ...props }: MotionWrapperProps) {
  return <motion.div {...props}>{children}</motion.div>
}

export function MotionSection({ children, ...props }: MotionWrapperProps) {
  return <motion.section {...props}>{children}</motion.section>
}