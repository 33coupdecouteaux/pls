"use client"
import React, { useEffect, useRef, useState } from "react"

interface InViewLazyProps {
  children: React.ReactNode
  rootMargin?: string
  minHeight?: number | string
  idle?: boolean
}

export function InViewLazy({ children, rootMargin = "100px", minHeight = 120, idle = true }: InViewLazyProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (visible) return

    const trigger = () => setVisible(true)

    if (idle && "requestIdleCallback" in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
        // idle callback placeholder
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trigger()
            observer.disconnect()
          }
        })
      },
      { root: null, rootMargin, threshold: 0 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [visible, rootMargin, idle])

  return (
    <div ref={ref} style={{ minHeight: !visible ? minHeight : undefined }}>
      {visible ? children : null}
    </div>
  )
}
