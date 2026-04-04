import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface SharePageProps {
  params: Promise<{ uuid: string }>
}

export const metadata: Metadata = {
  title: 'Partager vos résultats | ImpotsCouple',
  description: 'Partagez ou téléchargez vos résultats de simulation fiscale.',
  robots: {
    index: false,
    follow: false,
  },
}

// Cette page legacy n'est plus utilisée
// Les nouvelles simulations utilisent le système stateless (données dans l'URL)
export default async function SharePage({ params }: SharePageProps) {
  notFound()
}
