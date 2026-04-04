import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'

interface ResultsPageProps {
  params: Promise<{ uuid: string }>
}

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  return {
    title: 'Résultats de votre simulation fiscale',
    description: 'Découvrez l\'impact fiscal du PACS et du mariage sur votre situation.',
    robots: {
      index: false,
      follow: false,
    },
  }
}

// Cette page legacy redirige vers la nouvelle page stateless
// Les anciens liens UUID ne fonctionnent plus (migration vers stateless)
export default async function ResultsPage({ params }: ResultsPageProps) {
  const { uuid } = await params
  
  // Redirection vers la page d'erreur avec message explicatif
  notFound()
}
