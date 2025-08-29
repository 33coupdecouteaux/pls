"use client"
import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { InViewLazy } from "@/components/in-view-lazy"
import dynamic from "next/dynamic"
// Lazy loaded sections (code-splitting) after hero
const CollectionStrip = dynamic(() => import("@/components/landing/collection-strip").then(m => m.CollectionStrip), { ssr: true, loading: () => null })
const FeaturedProducts = dynamic(() => import("@/components/landing/featured-products").then(m => m.FeaturedProducts), { ssr: true, loading: () => null })
const LifestyleComp = dynamic(() => import("@/components/landing/card-grid"), { ssr: true, loading: () => null })
const Contact = dynamic(() => import("@/components/landing/newsletter-section"), { ssr: true, loading: () => null })
const Footer = dynamic(() => import("@/components/landing/footer").then(m => m.Footer), { ssr: true, loading: () => null })

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Header />
      <HeroSection />
      <InViewLazy rootMargin="200px" minHeight={400}>
        <CollectionStrip />
      </InViewLazy>
      <InViewLazy rootMargin="200px" minHeight={400}>
        <FeaturedProducts />
      </InViewLazy>
      <InViewLazy rootMargin="200px" minHeight={400}>
        <LifestyleComp />
      </InViewLazy>
      <InViewLazy rootMargin="300px" minHeight={320}>
        <Contact />
      </InViewLazy>
      <InViewLazy rootMargin="300px" minHeight={320}>
        <Footer />
      </InViewLazy>
    </main>
  )
}
