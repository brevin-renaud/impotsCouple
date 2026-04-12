import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsightsGate } from "@/components/analytics/SpeedInsightsGate";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://impotscouple.fr"),
  title: {
    default: "Simulateur PACS Mariage 2026 - Calcul Impôts Couple Gratuit | ImpotsCouple",
    template: "%s - Simulation gratuite",
  },
  description:
    "Simulateur gratuit PACS et mariage 2026 : calculez vos économies d'impôts en couple. Comparez célibat vs union, quotient familial, déclaration commune. Outil anonyme et fiable basé sur le barème fiscal officiel français.",
  authors: [{ name: "ImpotsCouple", url: "https://impotscouple.fr" }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
  creator: "ImpotsCouple",
  publisher: "ImpotsCouple",
  alternates: {
    canonical: "https://impotscouple.fr",
    languages: {
      "fr-FR": "https://impotscouple.fr",
    },
  },
  category: "Finance",
  classification: "Simulateur fiscal gratuit",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://impotscouple.fr",
    siteName: "ImpotsCouple - Simulateur PACS Mariage",
    title: "Simulateur PACS Mariage 2026 - Calculez vos économies d'impôts",
    images: [
      {
        url: "https://impotscouple.fr/social-image.png",
        width: 1200,
        height: 630,
        alt: "Simulateur PACS Mariage 2026 - Économisez sur vos impôts",
      },
    ],
    description:
      "Calculez gratuitement l'avantage fiscal du PACS ou mariage. Comparez célibat vs union en 2 minutes. Simulation anonyme basée sur le barème officiel 2026.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ImpotsCouple",
    creator: "@ImpotsCouple",
    title: "Simulateur PACS Mariage 2026 - Économisez sur vos impôts",
    images: [
      "https://impotscouple.fr/social-image.png",
    ],
    description:
      "Calculez en 2 minutes si le PACS ou le mariage peut vous faire économiser des impôts. Gratuit et anonyme.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-verification-google",
  },
  other: {
    "geo.region": "FR",
    "geo.placename": "France",
    "content-language": "fr-FR",
    "google-adsense-account": "ca-pub-6220317370024875",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6220317370024875"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-stone-50`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsightsGate />
      </body>
    </html>
  );
}
