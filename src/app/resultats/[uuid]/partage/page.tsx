import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import prisma from '@/lib/db/prisma'
import { SharePageClient } from './SharePageClient'
import type { SimulationResult } from '@/lib/fiscal/calculator'

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
  openGraph: {
    title: 'Résultats de simulation fiscale - ImpotsCouple',
    description: 'Découvrez les résultats de cette simulation PACS/Mariage.',
    type: 'website',
    images: [
      {
        url: 'https://impotscouple.fr/social-image.png',
        width: 1200,
        height: 630,
        alt: 'Résultats de simulation fiscale - ImpotsCouple',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Résultats de simulation fiscale - ImpotsCouple',
    description: 'Découvrez les résultats de cette simulation PACS/Mariage.',
    images: ['https://impotscouple.fr/social-image.png'],
  },
}

async function getSimulation(uuid: string) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(uuid)) {
    return null
  }

  try {
    const simulation = await prisma.simulation.findUnique({
      where: { id: uuid },
    })

    if (!simulation) return null

    // Vérifier expiration selon la nouvelle logique
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // Vérifier si la simulation a été partagée
    const sharedAction = await prisma.userAction.findFirst({
      where: {
        simulationId: uuid,
        actionType: {
          in: ['share_link', 'generate_pdf'],
        },
      },
    })

    const isShared = !!sharedAction
    const expirationDate = isShared ? thirtyDaysAgo : sevenDaysAgo

    if (simulation.createdAt < expirationDate) {
      await prisma.simulation.delete({ where: { id: uuid } })
      return null
    }

    return simulation
  } catch {
    return null
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const { uuid } = await params
  const simulation = await getSimulation(uuid)

  if (!simulation) {
    notFound()
  }

  const results = simulation.results as unknown as SimulationResult

  return (
    <SharePageClient
      uuid={uuid}
      results={results}
      inputs={{
        incomeA: simulation.incomeA,
        incomeB: simulation.incomeB,
      }}
    />
  )
}
