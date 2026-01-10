import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://fiscalcouple.fr"),
  title: {
    default: "FiscalCouple - Simulateur PACS vs Mariage | Optimisez vos impôts",
    template: "%s | FiscalCouple",
  },
  description:
    "Calculez et comparez gratuitement l'impact fiscal du célibat, PACS et mariage. Simulateur anonyme et 100% gratuit pour optimiser votre situation fiscale en France.",
  keywords: [
    "simulateur impôts",
    "PACS",
    "mariage",
    "impôt sur le revenu",
    "quotient familial",
    "optimisation fiscale",
    "France",
    "calcul impôt couple",
  ],
  authors: [{ name: "FiscalCouple" }],
  creator: "FiscalCouple",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://fiscalcouple.fr",
    siteName: "FiscalCouple",
    title: "FiscalCouple - Simulateur PACS vs Mariage",
    description:
      "Calculez et comparez gratuitement l'impact fiscal du célibat, PACS et mariage en France.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FiscalCouple - Simulateur fiscal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FiscalCouple - Simulateur PACS vs Mariage",
    description:
      "Calculez et comparez gratuitement l'impact fiscal du célibat, PACS et mariage.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
