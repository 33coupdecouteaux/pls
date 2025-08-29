"use client"

import { motion } from "framer-motion"
import { Star, MapPin } from "lucide-react"
import { Reveal } from "./reveal"
import { LiquidGlassCard } from "@/components/ui/liquid-card"
import { DotPattern } from "@/components/ui/grid-dot"
import { SectionHeader } from "./section-header"

const testimonials = [
  {
    id: "1",
    name: "Nadia",
    location: "Provence-Alpes-Côte d'Azur",
    villa: "Villa Tumulus",
    rating: 5,
    text: "Nous avons passé un séjour merveilleux, tant le lieu est d'exception ! Une vue époustouflante sur la méditerranée et des prestations de qualité en corrélation avec nos exigences. Nous repartons la tête pleine de souvenirs inoubliables!!!",
    image: "https://static.wixstatic.com/media/39f71a_cf03e9ee407443b3998d47edecb4069a~mv2.jpg/v1/fit/w_487,h_365,q_90,enc_avif,quality_auto/39f71a_cf03e9ee407443b3998d47edecb4069a~mv2.jpg"
  },
  {
    id: "2", 
    name: "Jordan",
    location: "Le Raincy, France",
    villa: "Villa Les Tourterelles",
    rating: 5,
    text: "Shirley et Yoan ont été disponibles et très réactifs à chaque demande. Ils sont de plus très sympathiques et accueillants. Les prestations sont à la hauteur et la propreté était irréprochable dans le logement. Nous vous les conseillons les yeux fermés. Nous referons appel à eux pour nos prochaines vacances dans le sud!",
    image: "https://static.wixstatic.com/media/39f71a_5e33d212b4e9437c979291e5e968fd58~mv2.jpg/v1/fit/w_548,h_365,q_90,enc_avif,quality_auto/39f71a_5e33d212b4e9437c979291e5e968fd58~mv2.jpg"
  },
  {
    id: "3",
    name: "Marie & Philippe",
    location: "Paris, France",
    villa: "Villa Méditerranée",
    rating: 5,
    text: "Un service d'exception dans un cadre idyllique. La villa était parfaitement entretenue et la vue sur la Côte d'Azur absolument magnifique. WelkomHOME a rendu nos vacances inoubliables.",
    image: "https://static.wixstatic.com/media/39f71a_4035a429d2a147dba6835f5cfda5fd51~mv2.jpg/v1/fill/w_1645,h_625,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/site.jpg"
  },
]

export function FeaturedProducts() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 transition-colors ${i < rating ? 'text-amber-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.4)]' : 'text-neutral-300/60 dark:text-neutral-600'}`} 
      />
    ))
  }

  return (
  <section className="py-16 sm:py-20 lg:py-24 xl:py-32 relative" id="testimonials">
      {/* Grid dot background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Dots */}
        <DotPattern
          width={26}
          height={26}
          cr={1}
          cx={2}
          cy={2}
          className="fill-neutral-400/70 dark:fill-neutral-600/60 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)] opacity-90" />
        {/* Noise */}
        <div
          className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none [background-image:url(data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='220'%20height='220'><filter%20id='n'><feTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'/></filter><rect%20width='220'%20height='220'%20filter='url(%23n)'%20opacity='0.35'/></svg>)] [background-size:300px_300px]"/>
      </div>
      <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <Reveal>
          <SectionHeader
            badge="Témoignages"
            title="Ils nous ont fait"
            highlight="confiance"
            highlightClassName="font-mea-culpa text-[1.5em] sm:text-[1.75em] md:text-[2.05em] pl-1 pr-3 -ml-0.5 leading-[1.04] tracking-[0.012em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            titleClassName="text-center"
            description="Découvrez les témoignages de nos clients qui ont vécu des expériences exceptionnelles dans nos villas exclusives."
            align="center"
            className="mb-8 sm:mb-12 lg:mb-16"
          />
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.08}>
                <LiquidGlassCard
                  draggable={false}
                  blurIntensity="lg"
                  glowIntensity="xs"
                  shadowIntensity="xs"
                  borderRadius="24px"
                  className="h-full group p-5 md:p-6 transition-all duration-500"
                >
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="relative inline-block text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full text-neutral-500 dark:text-neutral-400 border border-white/10 bg-[linear-gradient(120deg,rgba(185,171,153,0.18),rgba(203,188,168,0.18)_40%,rgba(223,209,192,0.16)_65%,rgba(236,225,212,0.18)_85%,rgba(201,186,165,0.18))] after:absolute after:inset-0 after:opacity-20 after:mix-blend-overlay after:rounded-full after:[background-image:url(data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='120'%20height='120'><filter%20id='n'><feTurbulence%20type='fractalNoise'%20baseFrequency='0.9'%20numOctaves='2'/></filter><rect%20width='120'%20height='120'%20filter='url(%23n)'/></svg>)] after:bg-[length:180px_180px]">
                        {testimonial.villa}
                      </span>
                    </div>
                    <p className="text-neutral-700 dark:text-neutral-200 italic leading-relaxed text-xs md:text-sm">
                      &quot;{testimonial.text}&quot;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-white/10 dark:border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-0.5 tracking-tight text-sm md:text-base">
                        {testimonial.name}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] md:text-xs text-neutral-600 dark:text-neutral-400">
                        <MapPin className="w-3 h-3 opacity-70" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-wide text-neutral-500 dark:text-neutral-500">Note</div>
                      <div className="text-xs font-semibold bg-clip-text text-transparent bg-[linear-gradient(120deg,#6f6255,#8a7a6a_35%,#a3907e_60%,#c4b29f_82%,#e0d3c5)]">{testimonial.rating}/5</div>
                    </div>
                  </div>
                </LiquidGlassCard>
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
