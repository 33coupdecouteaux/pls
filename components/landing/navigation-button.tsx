import type React from "react"
import { cn } from "@/lib/utils"

interface NavigationButtonProps {
  href?: string
  children: React.ReactNode
  disabled?: boolean
}

export const NavigationButton = ({ href, children, disabled }: NavigationButtonProps) => {
  const baseClasses = "text-subtitle font-semibold opacity-30 transition-opacity ease-quad-out"

  if (href && !disabled) {
    return (
      <a href={href} className={`${baseClasses} hover:opacity-100`}>
        {children}
      </a>
    )
  }

  return (
    <button disabled className={cn(baseClasses, "cursor-not-allowed opacity-10")}>
      {children}
    </button>
  )
}
