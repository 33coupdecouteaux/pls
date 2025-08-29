"use client";
// Logo inline version
import { LogoWH } from "@/components/icons/logo-wh";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { GlassButton } from "@/components/ui/glassbutton";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navPrimary = [
    { name: "Logements", href: "#villas" },
    { name: "Conciergerie", href: "#conciergerie" },
    { name: "Expériences", href: "#experiences" },
  ];

  const navSecondary = [
    { name: "Propriétaires", href: "#owners" },
    { name: "Contact", href: "#contact" },
    { name: "Confidentialité", href: "#" },
  ];

  return (
    <footer className="relative border-t border-neutral-700/60 text-neutral-300">
      {/* Background gradient + light accents + noise */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0d0d10,#141417,#1d1d21)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.12),transparent_62%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay bg-[length:300px_300px]"
          style={{
            backgroundImage:
              "url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 100 100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100' height='100' filter='url(%23n)'/></svg>)",
          }}
        />
        <div className="absolute inset-0 backdrop-[mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.4),rgba(0,0,0,0.6))]" />
      </div>
      <div className="mx-auto max-w-[1200px] xl:max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand / Intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4 text-white">
              <LogoWH size={42} className="text-white" />
              <span className="text-xl font-semibold tracking-tight">WelkomHOME</span>
            </div>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-sm">
              Conciergerie & locations d&apos;exception dans le Golfe de Saint-Tropez. Un accompagnement humain et des maisons rares sélectionnées avec exigence.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <motion.a
                href="https://instagram.com/welkomhome"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600/60 bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white"
              >
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </motion.a>
              <GlassButton size="sm" contentClassName="px-4 py-2 text-sm text-white" asChild>
                <a href="mailto:contact@welkomhome.eu?subject=Consultation%20WelkomHOME" aria-label="Contact WelkomHOME">
                  <span>Contact</span>
                </a>
              </GlassButton>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-8 text-sm"
          >
            <div>
              <h4 className="mb-3 font-medium text-white">Explorer</h4>
              <ul className="space-y-2">
                {navPrimary.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="inline-block text-neutral-400 transition hover:text-neutral-100"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-medium text-white">Ressources</h4>
              <ul className="space-y-2">
                {navSecondary.map((l) => (
                  <li key={l.name}>
                    <a
                      href={l.href}
                      className="inline-block text-neutral-400 transition hover:text-neutral-100"
                    >
                      {l.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.nav>

          {/* Mini CTA */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col justify-between rounded-2xl border border-neutral-700/70 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-sm backdrop-blur-sm"
            >
              <div>
                <h4 className="text-base font-medium text-neutral-100 mb-2">Vous êtes propriétaire ?</h4>
                <p className="text-sm text-neutral-400 mb-4">Confiez-nous la gestion de votre villa et optimisez son potentiel.</p>
              </div>
              <GlassButton size="sm" contentClassName="px-4 py-2 text-sm text-white" asChild>
                <a href="mailto:contact@welkomhome.eu?subject=Gestion%20villa" aria-label="Proposer une villa">
                  <span>Proposer ma villa</span>
                </a>
              </GlassButton>
            </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-4 border-t border-neutral-700/60 pt-6 md:flex-row md:justify-between"
        >
          <p className="text-xs text-neutral-500/80">&copy; {currentYear} WelkomHOME. Tous droits réservés.</p>
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500/80">
            <a href="#" className="hover:text-neutral-200 transition">Confidentialité</a>
            <a href="#" className="hover:text-neutral-200 transition">Conditions</a>
            <a href="#" className="hover:text-neutral-200 transition">Cookies</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
