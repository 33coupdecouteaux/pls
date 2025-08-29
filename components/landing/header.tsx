"use client"

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar"
import Image from "next/image"
import { useState } from "react"
import { ConciergerieModal } from "./conciergerie-modal"
import NavAuthButton from "@/components/auth/nav-auth-button"

export function Header() {
  const navItems = [
    {
      name: "Nos biens",
  link: "/nos-biens",
    },
    {
      name: "Nous rejoindre",
      link: "#services",
    },
    {
      name: "Blog",
      link: "#blog",
    },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="relative w-full">
      <Navbar className="z-50">
        {/* Desktop Navigation */}
        <NavBody>
          <WelkomHomeLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavAuthButton />
            <ConciergerieModal />
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <WelkomHomeLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-3 py-3 rounded-lg text-white/90 dark:text-black/90 text-lg font-medium transition-all duration-300 hover:bg-white/10 dark:hover:bg-black/10 hover:text-white dark:hover:text-black"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="w-full border-t border-white/20 dark:border-black/20 pt-4 mt-2">
              <div className="flex w-full flex-col gap-3">
                <div className="w-full">
                  <NavAuthButton className="w-full justify-center text-sm py-3" />
                </div>
                <div className="w-full">
                  <ConciergerieModal className="w-full text-sm py-3" />
                </div>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}

const WelkomHomeLogo = () => {
  return (
    <a
      href="#"
  className="relative z-20 mr-3 sm:mr-5 lg:mr-6 flex items-center space-x-1 px-1 py-1 text-sm font-normal text-black"
      aria-label="Accueil WelkomHOME"
    >
      <Image
        src="/wh.svg"
        alt="WelkomHOME Logo"
        width={36}
        height={36}
        className="object-contain"
        priority
      />
      <span className="font-bold text-white dark:text-black text-sm leading-none tracking-tight">WelkomHOME</span>
    </a>
  )
}
