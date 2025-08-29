"use client"

import React, { ElementType } from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  badge?: string
  title: string
  highlight?: string
  description?: string
  align?: "center" | "left"
  className?: string
  badgeClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  highlightGradientClass?: string
  highlightClassName?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div'
  ariaLevel?: number
}

/**
 * SectionHeader
 * Un composant réutilisable pour harmoniser les en-têtes de section (badge, titre, mot en surbrillance, description).
 * Les trois sections ciblées (villas, témoignages, newsletter/contact) partagent désormais la même taille et typographie.
 */
export function SectionHeader({
  badge,
  title,
  highlight,
  description,
  align = "center",
  className,
  badgeClassName,
  titleClassName,
  descriptionClassName,
  // Nouveau gradient neutre + accent discret (gris profonds -> léger cyan/vert doux) utilisable partout
  // Beige sculpté sans aucune dominante froide
  highlightGradientClass = "bg-[linear-gradient(110deg,#b9ab99_0%,#cbbca8_18%,#dfd1c0_36%,#ece1d4_52%,#f3e9dc_60%,#e4d6c4_74%,#cdbaa5_88%,#b9a894_100%)]",
  highlightClassName,
  as: HeadingTag = 'h2',
  ariaLevel,
}: SectionHeaderProps) {
  const wrapperAlign = align === "center" ? "text-center mx-auto" : "text-left"

  return (
    <div className={cn("max-w-3xl", wrapperAlign, className)}>
      {badge && (
        <div
          className={cn(
            // Centering: remove gap unless extra elements are injected; use min-h for consistent vertical centering
            "inline-flex justify-center items-center text-center mb-5 px-5 py-2 rounded-full bg-neutral-900/5 dark:bg-white/10 backdrop-blur-md border border-neutral-800/20 dark:border-white/20 text-[10px] md:text-xs tracking-wide uppercase font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_16px_-4px_rgba(0,0,0,0.35)] min-h-[34px]",
            badgeClassName,
            align === "left" && "mx-0"
          )}
        >
          <span className="text-neutral-600 dark:text-neutral-200 leading-none">
            {badge}
          </span>
        </div>
      )}
      {React.createElement(
        HeadingTag as ElementType,
        {
          className: cn(
            // Further bump line-height (1.2 -> 1.28) to give more vertical room for large script descenders (e.g. long 'f')
            "text-[1.83rem] md:text-[2.85rem] font-bold tracking-normal text-neutral-900 dark:text-neutral-50 leading-[1.28] overflow-visible",
            titleClassName,
            align === "left" ? "pr-3" : "pr-0 mx-auto"
          ),
          role: HeadingTag === 'div' ? 'heading' : undefined,
          'aria-level': HeadingTag === 'div' && ariaLevel ? ariaLevel : undefined
        },
        <>
          {title} {highlight && (
    <span className="relative inline-block pr-[1.2em] align-baseline overflow-visible">
              <span
                className={cn(
      // Increase line-height & bottom padding generously so descenders are never cut (especially tall swash 'f')
      "italic font-light bg-clip-text text-transparent inline-block align-baseline text-[0.83em] leading-[1.22] pb-[0.25em] whitespace-nowrap",
                  highlightGradientClass,
                  highlightClassName,
                  "after:absolute after:inset-0 after:mix-blend-overlay after:opacity-[0.15] after:pointer-events-none after:[background-image:url(data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='160'%20height='160'%20viewBox='0%200%20100%20100'><filter%20id='n'><feTurbulence%20type='fractalNoise'%20baseFrequency='0.8'%20numOctaves='3'%20stitchTiles='stitch'%20/></filter><rect%20width='100'%20height='100'%20filter='url(%23n)'/></svg>)] after:bg-[length:220px_220px]"
                )}
              >
                {highlight}
              </span>
            </span>
          )}
        </>
      )}
  {description && (
        <p
          className={cn(
            "text-base md:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-2xl",
            descriptionClassName,
            align === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
