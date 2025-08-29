"use client";

import { GlassButton } from "@/components/ui/glassbutton";
import { CalendarCheckIcon } from "@/components/icons/calendar-check";
import { InstagramIcon } from "@/components/icons/instagram";

export default function Contact() {
    const contactMethods = [
        {
            icon: <CalendarCheckIcon size={24} />,
            title: "Book a consultation",
            desc: "Planifiez un échange personnalisé sur votre projet de location ou de séjour.",
            link: {
                name: "Schedule a call",
                href: "mailto:contact@welkomhome.eu?subject=Consultation%20WelkomHOME"
            }
        },
        {
            icon: <InstagramIcon size={24} />,
            title: "Follow us on Instagram",
            desc: "Inspiration, nouveautés et coulisses de nos villas.",
            link: {
                name: "@welkomhome",
                href: "https://instagram.com/welkomhome"
            }
        }
    ]

    return (
    <section className="py-16 sm:py-20 lg:py-24 xl:py-32" id="contact">
        <div className="max-w-[1200px] xl:max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 text-gray-600 gap-8 sm:gap-12 md:flex md:items-start lg:gap-16">
            <div className="max-w-md mb-8 md:mb-0">
                <h3 className="text-gray-800 text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    Contact & Réseaux
                </h3>
                <p className="mt-3 text-sm sm:text-base lg:text-lg">
                    Nous sommes à votre écoute pour toute question concernant votre propriété ou votre séjour sur la Côte d&apos;Azur.
                </p>
            </div>
            <div className="flex-1">
                <ul className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 lg:gap-8">
                        {
                            contactMethods.map((item, idx) => (
                                <li key={idx} className="p-4 sm:p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                                    <div className="w-12 h-12 rounded-full border flex items-center justify-center text-gray-700 mb-4">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-gray-800 text-base sm:text-lg font-medium mb-2">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm sm:text-base mb-4">
                                        {item.desc}
                                    </p>
                                    <a
                                        href={item.link.href}
                                        target={item.link.href.startsWith('http') ? '_blank' : undefined}
                                        rel={item.link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="inline-block"
                                    >
                                        <GlassButton
                                            size="sm"
                                            contentClassName="flex items-center gap-2 text-neutral-900"
                                            aria-label={item.link.name.replace(/\s*→$/, '')}
                                        >
                                            <span>{item.link.name}</span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </GlassButton>
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

// Compatibilité avec l'ancien import nommé { NewsletterSection }
export const NewsletterSection = Contact