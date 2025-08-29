import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Mea_Culpa } from "next/font/google"
import "./globals.css"
import { TwentyFirstToolbar } from "@21st-extension/toolbar-next"
import { ReactPlugin } from "@21st-extension/react"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
})

// Script font used only for the word "confiance" in testimonials heading
const meaCulpa = Mea_Culpa({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mea-culpa",
})

export const metadata: Metadata = {
  title: "whriviera",
  description: "WelkomHOME - Découvrez la Côte d'Azur différemment. Logements exclusifs, conciergerie de luxe dans le Golfe de Saint-Tropez. Location de villas d'exception.",
  generator: "Next.js",
  alternates: {
    canonical: "https://welkomhome.eu/",
  },
  openGraph: {
    siteName: "WelkomHOME",
    title: "Conciergerie Golfe De St Tropez | WelkomHOME | France",
    description: "WelkomHOME - Découvrez la Côte d'Azur différemment. Logements exclusifs, conciergerie de luxe dans le Golfe de Saint-Tropez.",
    type: "website",
    url: "https://welkomhome.eu/",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png-EslKdscYhdWOUeP4RBajclEejxh8iO.jpeg",
        alt: "WelkomHOME - Côte d'Azur villas exclusives et conciergerie de luxe",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conciergerie Golfe De St Tropez | WelkomHOME | France",
    description: "WelkomHOME - Découvrez la Côte d'Azur différemment. Logements exclusifs, conciergerie de luxe.",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/u3195299943_une_vue_sur_lespace_toil_--ar_11_--sref_httpss.mj_f1cd1575-c301-46fa-8b30-665ae1ab22a0_3_bloom_subtle_6x.png-EslKdscYhdWOUeP4RBajclEejxh8iO.jpeg",
        alt: "WelkomHOME - Côte d'Azur villas exclusives et conciergerie de luxe",
      },
    ],
    site: "@welkomhome",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
  <html lang="fr" className={`${montserrat.variable} ${meaCulpa.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libertinus+Serif+Display&family=Mea+Culpa&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden">
  {children}
  {/** 21st.dev Toolbar (auto dev-only; extra guard keeps it out of prod bundles) */}
  {process.env.NODE_ENV === "development" && (
    <TwentyFirstToolbar
      config={{
        plugins: [ReactPlugin],
      }}
    />
  )}
      </body>
    </html>
  )
}
