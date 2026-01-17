import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import prisma from '@/lib/db/prisma'
import { ResultsDisplay } from './ResultsDisplay'
import type { SimulationResult } from '@/lib/fiscal/calculator'

interface ResultsPageProps {
  params: Promise<{ uuid: string }>
}

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  return {
    title: 'Résultats de votre simulation fiscale',
    description: 'Découvrez l\'impact fiscal du PACS et du mariage sur votre situation.',
    robots: {
      index: false, // Ne pas indexer les résultats individuels
      follow: false,
    },
  }
}

async function getSimulation(uuid: string) {
  // Validation UUID
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!uuidRegex.test(uuid)) {
    return null
  }

  try {
    const simulation = await prisma.simulation.findUnique({
      where: { id: uuid },
    })

    if (!simulation) return null

    // Vérifier expiration
    if (new Date() > simulation.expiresAt) {
      await prisma.simulation.delete({ where: { id: uuid } })
      return null
    }

    return simulation
  } catch {
    return null
  }
}

export default async function ResultsPage({ params }: ResultsPageProps) {
  const { uuid } = await params
  const simulation = await getSimulation(uuid)

  if (!simulation) {
    notFound()
  }

  const results = simulation.results as unknown as SimulationResult

  return (
    <ResultsDisplay
      uuid={uuid}
      results={results}
      inputs={{
        incomeA: simulation.incomeA,
        incomeB: simulation.incomeB,
      }}
    />
  )
}
