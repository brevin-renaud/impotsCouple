import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Simulateur Impôts Mariage et PACS 2026 - Calcul Quotient Familial Gratuit',
  description:
    'Simulez vos impôts en couple : mariage, PACS ou célibat. Calcul du quotient familial, imposition commune, économie réelle. Barème officiel 2026, gratuit et 100% anonyme.',
  keywords: [
    'simulateur impôts mariage',
    'simulation impôts mariage',
    'calculateur quotient familial',
    'simulation impôts couple',
    'calcul impôts PACS mariage',
    'imposition commune calcul',
    'simulateur fiscal gratuit',
  ],
  alternates: {
    canonical: 'https://impotscouple.fr/simulateur',
  },
  openGraph: {
    title: 'Simulateur Impôts Mariage et PACS 2026 - Calcul Quotient Familial',
    description:
      'Calculez vos impôts avec le mariage ou le PACS : quotient familial, imposition commune, économie réelle. Simulation gratuite en 2 minutes.',
    url: 'https://impotscouple.fr/simulateur',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Simulateur Impôts Mariage et PACS 2026 - Calcul Gratuit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur Impôts Mariage et PACS 2026 - Calcul Gratuit',
    description: 'Calculez vos impôts avec le mariage ou le PACS : quotient familial, imposition commune. Gratuit et anonyme.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

export default function SimulateurLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
