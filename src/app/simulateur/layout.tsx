import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impôts PACS Mariage 2026 - Calcul en 2 Minutes',
  description:
    'Simulateur fiscal PACS et mariage 2026 : calculez gratuitement votre économie d\'impôts. Comparez célibat vs union avec quotient familial. Barème officiel, 100% anonyme.',
  alternates: {
    canonical: 'https://impotscouple.fr/simulateur',
  },
  openGraph: {
    title: 'Simulateur Impôts PACS Mariage 2026 - Calcul Gratuit',
    description:
      'Calculez votre économie d\'impôts avec le PACS ou le mariage. Simulation gratuite en 2 minutes.',
    url: 'https://impotscouple.fr/simulateur',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Simulateur Impôts PACS Mariage 2026 - Calcul Gratuit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Simulateur Impôts PACS Mariage 2026 - Calcul Gratuit',
    description: 'Calculez votre économie d\'impôts avec le PACS ou le mariage. Simulation gratuite en 2 minutes.',
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
