"use client"

import React from "react"
import { Carousel, Card } from "@/components/landing/apple-cards-carousel"
import { LiquidGlassCard } from "@/components/ui/liquid-card"
import { FadeContent } from "@/components/ui/fade-content"
import { SectionHeader } from "@/components/landing/section-header"

interface VillaData {
  title: string;
  description: string;
  features: string[];
  services: string[];
}

const VillaContent = ({ villa }: { villa: VillaData }) => {
  return (
    <div className="space-y-5">
      <LiquidGlassCard
        draggable={false}
        blurIntensity="xl"
        glowIntensity="sm"
        shadowIntensity="sm"
        borderRadius="28px"
        className="p-8 md:p-12"
      >
        <p className="text-neutral-700 dark:text-neutral-100 text-base md:text-xl font-sans max-w-3xl mx-auto leading-relaxed">
          <span className="font-semibold tracking-tight">
            {villa.title}
          </span>{" "}
          <span className="text-neutral-600 dark:text-neutral-300">
            {villa.description}
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3 text-sm uppercase tracking-wide">Caractéristiques</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
              {villa.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.25)] relative overflow-hidden bg-[linear-gradient(130deg,#9ca3af,#cbd5e1_45%,#94a3b8_70%,#67e8f9_92%,#5eead4)] after:absolute after:inset-0 after:opacity-30 after:mix-blend-overlay after:[background-image:url(data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='60'%20height='60'><filter%20id='n'><feTurbulence%20type='fractalNoise'%20baseFrequency='0.8'%20numOctaves='3'/></filter><rect%20width='60'%20height='60'%20filter='url(%23n)'/></svg>)] after:bg-[length:120px_120px]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 mb-3 text-sm uppercase tracking-wide">Services inclus</h4>
            <ul className="space-y-2 text-neutral-600 dark:text-neutral-300 text-sm md:text-base">
              {villa.services.map((service: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-400 shadow-[0_0_0_1px_rgba(255,255,255,0.4)]" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </LiquidGlassCard>

      <LiquidGlassCard
        draggable={false}
        blurIntensity="xl"
        glowIntensity="none"
        shadowIntensity="xs"
        borderRadius="28px"
        className="p-8 md:p-10"
      >
        <p className="text-neutral-700 dark:text-neutral-200 text-base md:text-lg font-sans max-w-3xl mx-auto leading-relaxed">
          Située dans un cadre d&apos;exception sur la Côte d&apos;Azur, cette propriété offre une vue imprenable sur la Méditerranée. Nos équipes locales sont disponibles 24/7 pour vous garantir un séjour inoubliable avec un service de conciergerie sur mesure.
        </p>
      </LiquidGlassCard>

      <LiquidGlassCard
        draggable={false}
        blurIntensity="xl"
        glowIntensity="sm"
        shadowIntensity="sm"
        borderRadius="28px"
        className="p-8 md:p-12"
      >
        <div className="text-center space-y-4">
          <h4 className="font-semibold text-neutral-800 dark:text-neutral-100 text-lg md:text-xl tracking-tight">Contactez-nous</h4>
          <p className="text-neutral-600 dark:text-neutral-300 text-base md:text-lg">
            Pour réserver cette villa d&apos;exception
          </p>
          <p className="relative text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-[radial-gradient(circle_at_15%_110%,rgba(255,255,255,0.4),rgba(255,255,255,0)_60%),linear-gradient(100deg,#9ca3af_0%,#d1d5db_25%,#f3f4f6_45%,#cbd5e1_60%,#94a3b8_75%,#67e8f9_92%,#5eead4_100%)] after:absolute after:inset-0 after:mix-blend-overlay after:pointer-events-none after:opacity-20 after:[background-image:url(data:image/svg+xml;utf8,<svg%20xmlns='http://www.w3.org/2000/svg'%20width='200'%20height='200'><filter%20id='n'><feTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='3'/></filter><rect%20width='200'%20height='200'%20filter='url(%23n)'/></svg>)] after:bg-[length:260px_260px]">+33 668 192 755</p>
        </div>
      </LiquidGlassCard>
    </div>
  )
}

export function CollectionStrip() {
  const cards = villaData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ))

  return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32 relative overflow-x-hidden overflow-y-visible">
      <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full h-full">
          <FadeContent>
            <SectionHeader
              badge="Sélection d'Exception 💐"
              title="Nos logements en"
              highlight="exclusivité"
              highlightClassName="font-mea-culpa text-[1.4em] sm:text-[1.55em] md:text-[1.9em] pl-1 pr-3 leading-[1.05] tracking-[0.012em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              titleClassName="text-left"
              description="Découvrez des villas d'exception sélectionnées avec exigence : vues spectaculaires, prestations haut de gamme et confidentialité totale."
              align="left"
              className="mb-6 sm:mb-8 lg:mb-12"
              descriptionClassName="max-w-4xl mb-8 sm:mb-12"
            />
          </FadeContent>
          <FadeContent delay={0.2}>
            <Carousel items={cards} />
          </FadeContent>
        </div>
      </div>
    </section>
  )
}

const villaData = [
  {
    category: "Villa de Prestige",
    title: "Villa Tumulus",
  // Local image added under public/villas; using object-cover in Card ensures proper centering
  src: "/media/chair.png",
    content: <VillaContent villa={{
      title: "Une vue époustouflante sur la Méditerranée",
      description: "Villa d'exception avec prestations de qualité. Cette propriété offre un cadre idyllique pour des vacances inoubliables en Provence-Alpes-Côte d'Azur.",
      features: [
        "Vue panoramique mer",
        "Piscine privée chauffée",
        "Jardin paysager",
        "Terrasses multiples",
        "Garage privé"
      ],
      services: [
        "Conciergerie 24/7",
        "Ménage quotidien",
        "Service traiteur",
        "Transferts aéroport",
        "Réservations restaurants"
      ]
    }} />,
  },
  {
    category: "Villa Familiale",
    title: "Villa Les Tourterelles",
  src: "/media/cuisine.png",
    content: <VillaContent villa={{
      title: "Parfaite pour les familles",
      description: "Villa spacieuse avec jardin privé, idéale pour des vacances en famille. Propreté irréprochable et prestations à la hauteur de vos exigences.",
      features: [
        "4 chambres spacieuses",
        "Salon avec cheminée",
        "Cuisine équipée",
        "Jardin pour enfants",
        "Barbecue extérieur"
      ],
      services: [
        "Équipe locale disponible",
        "Service réactif",
        "Accueil personnalisé",
        "Conseils activités",
        "Assistance 24/7"
      ]
    }} />,
  },
  {
    category: "Villa Moderne",
    title: "Villa Méditerranée",
  src: "/media/image.png",
    content: <VillaContent villa={{
      title: "Design contemporain et élégance",
      description: "Architecture moderne avec vue sur la Côte d'Azur. Un cadre idyllique pour un séjour d'exception avec des prestations haut de gamme.",
      features: [
        "Design contemporain",
        "Terrasse panoramique",
        "Piscine à débordement",
        "Cuisine moderne",
        "Suite parentale"
      ],
      services: [
        "Service d'exception",
        "Conciergerie premium",
        "Chef privé disponible",
        "Spa à domicile",
        "Activités sur mesure"
      ]
    }} />,
  },
  {
    category: "Villa Exclusive",
    title: "Villa Saint-Tropez",
  src: "/media/salon.png",
    content: <VillaContent villa={{
      title: "Au cœur du Golfe de Saint-Tropez",
      description: "Propriété d'exception dans l'un des lieux les plus prisés de la Côte d'Azur. Expérience unique et moments inoubliables garantis.",
      features: [
        "Emplacement privilégié",
        "Vue mer extraordinaire",
        "Plage privée",
        "Héliport à proximité",
        "Sécurité 24/7"
      ],
      services: [
        "Butler personnel",
        "Yacht à disposition",
        "Réservations exclusives",
        "Événements privés",
        "Service ultra-premium"
      ]
    }} />,
  },
  {
    category: "Villa Romantique",
    title: "Villa Sainte-Maxime",
  src: "/media/bedroom.png",
    content: <VillaContent villa={{
      title: "Cadre romantique exceptionnel",
      description: "Villa intime avec vue sur les collines provençales. Parfaite pour une escapade romantique ou un séjour en couple dans un cadre enchanteur.",
      features: [
        "Atmosphère romantique",
        "Jacuzzi privé",
        "Terrasse couverte",
        "Jardin méditerranéen",
        "Couchers de soleil"
      ],
      services: [
        "Service discret",
        "Dîners romantiques",
        "Massages couple",
        "Excursions privées",
        "Champagne à l'arrivée"
      ]
    }} />,
  },
  
{
    category: "Évasion pieds dans l’eau",
    title: "Villa lumineuse face à la Méditerranée",
  src: "/media/bedroom.png",
    content: <VillaContent villa={{
      title: "Cadre romantique exceptionnel",
      description: "Villa intime avec vue sur les collines provençales. Parfaite pour une escapade romantique ou un séjour en couple dans un cadre enchanteur.",
      features: [
        "Atmosphère romantique",
        "Jacuzzi privé",
        "Terrasse couverte",
        "Jardin méditerranéen",
        "Couchers de soleil"
      ],
      services: [
        "Service discret",
        "Dîners romantiques",
        "Massages couple",
        "Excursions privées",
        "Champagne à l'arrivée"
      ]
    }} />,
  },

]
