"use client";
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent as AnimatedModalContent,
  ModalFooter,
  useModal,
} from "./animated-modal";
import { GlassButton } from "../ui/glassbutton";
import { motion } from "motion/react";
import Image from "next/image";

const GlassModalTrigger = ({ className = "" }: { className?: string }) => {
  const { setOpen } = useModal();
  
  return (
    <div className={className} onClick={() => setOpen(true)}>
      <GlassButton size="sm">
        🏖️ Réserver
      </GlassButton>
    </div>
  );
};

export function ConciergerieModal({ className = "" }: { className?: string }) {
  const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Villa luxe Saint-Tropez
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Piscine à débordement Côte d'Azur
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3553&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Architecture moderne méditerranéenne
    "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Terrasse avec vue mer
    "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Jardin méditerranéen luxe
  ];
  return (
    <Modal>
      <GlassModalTrigger className={className} />
      <ConciergerieModalContent />
    </Modal>
  );
}

const ConciergerieModalContent = () => {
  const { setOpen } = useModal();
  
  const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Villa luxe Saint-Tropez
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Piscine à débordement Côte d'Azur
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=3553&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Architecture moderne méditerranéenne
    "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Terrasse avec vue mer
    "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Jardin méditerranéen luxe
  ];

  return (
    <ModalBody>
      <AnimatedModalContent className="px-4 sm:px-6 lg:px-8">
          <h4 className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6 sm:mb-8">
            Votre séjour d&apos;exception dans le{" "}
            <span className="px-1 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900 dark:border-blue-700 border border-blue-200">
              Golfe de Saint-Tropez
            </span>{" "}
            vous attend! 🏖️
          </h4>
          <div className="flex justify-center items-center mb-6 sm:mb-8">
            {images.map((image, idx) => (
              <motion.div
                key={"images" + idx}
                style={{
                  rotate: Math.random() * 20 - 10,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                }}
                whileTap={{
                  scale: 1.1,
                  rotate: 0,
                  zIndex: 100,
                }}
                className="rounded-xl -mr-2 sm:-mr-4 mt-2 sm:mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
              >
                <Image
                  src={image}
                  alt="Villas de luxe Côte d'Azur"
                  width={500}
                  height={500}
                  className="rounded-lg h-16 w-16 sm:h-20 sm:w-20 md:h-40 md:w-40 object-cover shrink-0"
                />
              </motion.div>
            ))}
          </div>
          <div className="py-6 sm:py-8 lg:py-10 flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-4 sm:gap-y-6 items-start justify-start max-w-sm sm:max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <VillaIcon className="mr-1.5 sm:mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                Villas d&apos;exception
              </span>
            </div>
            <div className="flex items-center justify-center">
              <ConciergIcon className="mr-1.5 sm:mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                Service conciergerie
              </span>
            </div>
            <div className="flex items-center justify-center">
              <YachtIcon className="mr-1.5 sm:mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                Locations de yachts
              </span>
            </div>
            <div className="flex items-center justify-center">
              <ChefIcon className="mr-1.5 sm:mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                Chef privé
              </span>
            </div>
            <div className="flex items-center justify-center">
              <SpaIcon className="mr-1.5 sm:mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                Soins bien-être
              </span>
            </div>
            <div className="flex items-center justify-center">
              <TransportIcon className="mr-1.5 sm:mr-2 text-neutral-700 dark:text-neutral-300 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-neutral-700 dark:text-neutral-300 text-xs sm:text-sm">
                Transport VIP
              </span>
            </div>
          </div>
        </AnimatedModalContent>
        <ModalFooter className="gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 flex-col sm:flex-row">
          <GlassButton 
            size="sm"
            className="w-full sm:w-auto min-w-[120px] opacity-70 hover:opacity-100"
            onClick={() => setOpen(false)}
          >
            Fermer
          </GlassButton>
          <GlassButton 
            size="sm"
            className="w-full sm:w-auto min-w-[140px] bg-blue-500/20 hover:bg-blue-500/30 border-blue-400/30"
            onClick={() => window.open('mailto:contact@welkomhome.eu?subject=Demande%20de%20réservation%20WelkomHOME', '_blank')}
          >
            Nous contacter
          </GlassButton>
        </ModalFooter>
      </ModalBody>
    );
};

const VillaIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" />
      <path d="M13 7h4" />
      <path d="M17 7v1a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-1m4 0v1a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-1" />
    </svg>
  );
};

const ConciergIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12v-7a1 1 0 0 1 1 -1h4m4 0h4a1 1 0 0 1 1 1v7" />
      <path d="M3 12h18l2 8h-22z" />
      <path d="M10 7c0 .328 .239 .645 .643 .066a3.4 3.4 0 0 1 2.714 0c.404 .579 .643 .262 .643 -.066" />
    </svg>
  );
};

const YachtIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M2 20a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1" />
      <path d="M4 18l-1 -3h18l-1 3" />
      <path d="M11 12h7l-7 -9v9" />
      <path d="M8 7l-2 5" />
    </svg>
  );
};

const ChefIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3c1.918 0 3.52 1.35 3.91 3.151a4 4 0 0 1 2.09 3.849v8a3 3 0 0 1 -3 3h-6a3 3 0 0 1 -3 -3v-8c0 -1.657 1.007 -3.085 2.445 -3.713c.386 -1.839 1.955 -3.287 3.555 -3.287z" />
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16a3.5 3.5 0 0 0 4 0" />
    </svg>
  );
};

const SpaIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M12 9c0 -3 -1 -5 -3 -7" />
      <path d="M15 15c3 0 5 -1 7 -3" />
      <path d="M9 15c-3 0 -5 -1 -7 -3" />
      <path d="M12 15c0 3 1 5 3 7" />
    </svg>
  );
};

const TransportIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
    </svg>
  );
};
