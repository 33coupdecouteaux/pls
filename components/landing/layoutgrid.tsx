"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);

  // Fermer avec Echap
  useEffect(() => {
    if (!selected) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const isSmall = card.thumbnail.width < 600;
          return (
            <motion.div
              key={card.id}
              className={cn(
                card.className,
                "relative rounded-xl overflow-hidden cursor-pointer group",
                isSmall ? "h-[230px] md:h-[260px]" : "h-[260px] md:h-[320px]"
              )}
              layoutId={`card-${card.id}`}
              onClick={() => setSelected(card)}
            >
              <motion.div layoutId={`image-${card.id}`} className="absolute inset-0">
                <Image
                  src={card.thumbnail.src}
                  alt={card.thumbnail.alt}
                  fill
                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                  quality={85}
                  priority={card.id === 1}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  {card.content}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              layoutId={`card-${selected.id}`}
              role="dialog"
              aria-modal="true"
              aria-label={selected.thumbnail.alt}
              className="fixed inset-4 md:inset-8 lg:inset-12 z-50 rounded-xl overflow-hidden ring-1 ring-white/15"
            >
              <motion.div layoutId={`image-${selected.id}`} className="absolute inset-0">
                <Image
                  src={selected.thumbnail.src}
                  alt={selected.thumbnail.alt}
                  fill
                  sizes="100vw"
                  quality={90}
                  className="object-cover"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70">
                <button
                  type="button"
                  aria-label="Fermer"
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 h-9 w-9 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors backdrop-blur-sm border border-white/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/20">
                  {selected.content}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};