"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

interface FadeContentProps {
  children: ReactNode
  delay?: number
  y?: number
  once?: boolean
  className?: string
}

export function FadeContent({ children, delay = 0, y = 20, once = true, className }: FadeContentProps) {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start({ opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] } })
            if (once) obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [controls, delay, once])

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={controls} className={className}>
      {children}
    </motion.div>
  )
}
