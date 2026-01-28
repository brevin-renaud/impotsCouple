import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://impotscouple.fr"),
  title: {
    default: "Simulateur PACS Mariage 2026 - Calcul Impôts Couple Gratuit | ImpotsCouple",
    template: "%s | ImpotsCouple - Simulateur Fiscal",
  },
  description:
    "Simulateur gratuit PACS et mariage 2026 : calculez vos économies d'impôts en couple. Comparez célibat vs union, quotient familial, déclaration commune. Outil anonyme et fiable basé sur le barème fiscal officiel français.",
  authors: [{ name: "ImpotsCouple", url: "https://impotscouple.fr" }],
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
    description:
      "Calculez gratuitement l'avantage fiscal du PACS ou mariage. Comparez célibat vs union en 2 minutes. Simulation anonyme basée sur le barème officiel 2026.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ImpotsCouple - Simulateur fiscal PACS et Mariage 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ImpotsCouple",
    creator: "@ImpotsCouple",
    title: "Simulateur PACS Mariage 2026 - Économisez sur vos impôts",
    description:
      "Calculez en 2 minutes si le PACS ou le mariage peut vous faire économiser des impôts. Gratuit et anonyme.",
    images: ["/og-image.png"],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} font-sans antialiased bg-stone-50`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
