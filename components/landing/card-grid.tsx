'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LayoutGrid } from "./layoutgrid"
import { SectionHeader } from '@/components/landing/section-header'

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const LifestyleComp = () => {
    const cards = [
        {
            id: 1,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Vue Panoramique
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Profitez d&apos;une vue imprenable sur le Golfe de Saint-Tropez depuis votre terrasse. Un cadre exceptionnel pour des moments inoubliables.
                        </p>
                    </div>
                </motion.div>
            ),
            className: "md:col-span-2",
            thumbnail: {
                src: "/cuisine.png",
                width: 1645,
                height: 625,
                alt: "Vue panoramique"
            }
        },
        {
            id: 2,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Design & Confort
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Un mobilier soigneusement sélectionné alliant élégance et confort pour une expérience de séjour unique.
                        </p>
                    </div>
                </motion.div>
            ),
            className: "col-span-1",
            thumbnail: {
                src: "/media/chair.png",
                width: 227,
                height: 303,
                alt: "Design & Confort"
            }
        },
        {
            id: 3,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Espace de Vie
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Des espaces de vie lumineux et spacieux, pensés pour votre confort et agencés avec goût.
                        </p>
                    </div>
                </motion.div>
            ),
            className: "col-span-1",
            thumbnail: {
                src: "/media/salon.png",
                width: 285,
                height: 285,
                alt: "Espace de vie"
            }
        },
        {
            id: 4,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Cuisine Équipée
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Des cuisines modernes entièrement équipées pour satisfaire les plus exigeants des chefs amateurs.
                        </p>
                    </div>
                </motion.div>
            ),
            className: "md:col-span-2",
            thumbnail: {
                src: "/media/cuisine.png",
                width: 1785,
                height: 745,
                alt: "Cuisine équipée"
            }
        }
    ]

    return (
        <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
                        <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                                <motion.div
                                        variants={fadeInUpVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                >
                                    <SectionHeader
                                        title="Un art de"
                                        highlight="vivre"
                                        description="Volumes lumineux, design épuré et services sur‑mesure face au Golfe de Saint‑Tropez."
                                        highlightClassName="font-mea-culpa text-[1.9em] md:text-[2.15em] -ml-2 pr-[0.2em] translate-y-[0.02em]"
                                        titleClassName="font-bold"
                                        className="mb-10"
                                    />
                                </motion.div>
                <motion.div 
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                                        transition={{ duration: 0.6, delay: 0.15 }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    <LayoutGrid cards={cards} />
                </motion.div>
            </div>
        </section>
    )
}

export default LifestyleComp