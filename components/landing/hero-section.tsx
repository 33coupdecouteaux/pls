"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
// Animated custom icons (liquid glass upgrade)
import { AlarmClockIcon } from "@/components/icons/alarm-clock"
import { ShieldCheckIcon } from "@/components/icons/shield-check"
import { PartyPopperIcon } from "@/components/icons/party-popper"
import { Reveal } from "./reveal"
import { FadeContent } from "@/components/ui/fade-content"
import { LiquidGlassCard } from "@/components/ui/liquid-card"
import dynamic from "next/dynamic"
const Spotlight = dynamic(() => import("@/components/ui/spotlight-new").then(m => m.Spotlight), { ssr: false, loading: () => <></> })
// Hero background image
import heroBg from "@/public/backgroundAbout.png"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const prefersReducedMotion = useReducedMotion()

  // Lightened parallax: minimal scale delta to avoid delaying LCP
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.985])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -30])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    if (prefersReducedMotion) {
      return <>{text}</>
    }
    return (
      <span aria-label={text}>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: delay + index * 0.012,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section ref={containerRef} className="relative h-screen w-full min-w-full overflow-hidden pt-16 sm:pt-20 flex items-center justify-center" style={{width: '100vw', minWidth: '100vw'}}>
      <div className="absolute inset-0 w-full h-full">
        {/* Spotlight effect */}
        <div className="absolute inset-0 z-[4] pointer-events-none">
          <Spotlight />
        </div>
        {/* Background Image with Cinematic Effects */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ scale: imageScale, y: imageY }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <Image
            src={heroBg}
            alt="Vue mer Côte d'Azur et villa de luxe WelkomHOME"
            fill
            className="object-cover"
            priority
          sizes="100vw"
          quality={60}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+X2ioAAAAASUVORK5CYII="
          onError={(e) => {
            const parent = (e.target as HTMLImageElement).parentElement;
            if (parent) parent.style.background = 'linear-gradient(135deg,#0f172a,#1e293b)';
          }}
        />
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full h-full flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 max-w-screen-2xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl text-center text-white -mt-[6vh] md:-mt-[7vh] xl:-mt-[8vh]">
          <FadeContent>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm tracking-wide uppercase font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_4px_16px_-2px_rgba(0,0,0,0.4)] mb-8 relative overflow-hidden">
              <span className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.18)_50%,rgba(255,255,255,0)_100%)] animate-[shine_4s_ease-in-out_infinite]" />
              <span className="relative">Séjours d’exception • Saint‑Tropez 🌴</span>
            </div>
          </FadeContent>
          <Reveal>
            {/* Enlarged heading sizes & adjusted negative top margin to avoid clipping */}
            <h1 className="font-bold leading-[0.95] tracking-tight mb-4 sm:mb-6 px-2 text-[2rem] xs:text-[2.4rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem] xl:text-[5.25rem] 2xl:text-[6rem]">
              <AnimatedText text="Découvrez la Côte d'Azur" delay={0.5} />
              <br />
              <span className="relative inline-block italic font-light">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-300/0 via-emerald-300/15 to-emerald-300/0 blur-lg rounded-lg" />
                <span className="relative bg-clip-text text-transparent bg-[linear-gradient(100deg,#ffffff_0%,#E2FBEA_40%,#ffffff_80%)]">
                  <AnimatedText text="différemment" delay={1.1} />
                </span>
                <span className="relative ml-1">.</span>
                <span className="block h-[3px] mt-3 w-32 sm:w-40 md:w-56 mx-auto bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full animate-pulse" />
              </span>
            </h1>
          </Reveal>
          <FadeContent delay={0.15}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-3xl mx-auto px-2">
              Vivez le Golfe de Saint‑Tropez comme un initié : expériences privées, moments rares, sérénité totale.
            </p>
          </FadeContent>
          
        </div>
      </motion.div>

      {/* Info Strip */}
      <motion.div
        className="absolute bottom-2 sm:bottom-4 md:bottom-6 lg:bottom-10 left-0 right-0 z-20 flex justify-center px-4 sm:px-6"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="relative group w-full max-w-5xl">
          {/* Glow ring */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-white/15 via-white/5 to-white/15 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-700" />
          <LiquidGlassCard
            draggable={false}
            expandable={false}
            blurIntensity="xl"
            glowIntensity="md"
            shadowIntensity="md"
            borderRadius="28px"
            className="mx-3 sm:mx-6 mb-2 sm:mb-4 px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-white/90 backdrop-saturate-150 w-full max-w-[1000px]"
          >
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 text-[11px] xs:text-xs sm:text-sm md:text-base w-full">
              <FeatureItem label="Disponibilité 24/7" icon={<AlarmClockIcon className="text-neutral-300" size={24} />} />
              <FeatureItem label="Confidentialité" icon={<ShieldCheckIcon className="text-neutral-300" size={24} />} />
              <FeatureItem label="Exclusifs" labelFull="Logements exclusifs" icon={<PartyPopperIcon className="text-neutral-300" size={24} />} />
            </div>
          </LiquidGlassCard>
        </div>
      </motion.div>
    </section>
  )
}

// Sub components
const FeatureItem = ({ label, labelFull, icon }: { label: string; labelFull?: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-2 group/feat relative">
    <span className="relative inline-flex items-center justify-center p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-white/15 dark:bg-white/10 border border-white/30 shadow-inner backdrop-blur-md transition-transform group-hover/feat:scale-105">
      {icon}
    </span>
    <span className="text-[11px] xs:text-xs sm:text-sm font-medium tracking-tight text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
      <span className="sm:hidden">{label}</span>
      <span className="hidden sm:inline">{labelFull || label}</span>
    </span>
  </div>
)

const Divider = ({ className = "" }: { className?: string }) => (
  <div className={`h-8 w-px bg-gradient-to-b from-white/10 via-white/40 to-white/10 ${className}`} />
)
