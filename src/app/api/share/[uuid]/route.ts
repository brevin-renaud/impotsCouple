import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    const { uuid } = await params

    // Validation basique du format UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(uuid)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Format UUID invalide',
        },
        { status: 400 }
      )
    }

    // Recherche de la simulation
    const simulation = await prisma.simulation.findUnique({
      where: { id: uuid },
    })

    if (!simulation) {
      return NextResponse.json(
        {
          success: false,
          error: 'Simulation non trouvée ou expirée',
        },
        { status: 404 }
      )
    }

    // Vérifier si la simulation a été partagée
    const hasBeenShared = await prisma.userAction.findFirst({
      where: {
        simulationId: uuid,
        actionType: {
          in: ['share_link', 'generate_pdf'],
        },
      },
    })

    // Calculer la date d'expiration
    const now = new Date()
    const expirationDays = hasBeenShared ? 30 : 7
    const expirationDate = new Date(simulation.createdAt)
    expirationDate.setDate(expirationDate.getDate() + expirationDays)

    // Vérification de l'expiration
    if (now > expirationDate) {
      // Suppression de la simulation expirée
      await prisma.simulation.delete({
        where: { id: uuid },
      })

      return NextResponse.json(
        {
          success: false,
          error: 'Cette simulation a expiré',
        },
        { status: 410 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        incomeA: simulation.incomeA,
        fraisReelsA: simulation.fraisReelsA,
        partsA: simulation.partsA,
        incomeB: simulation.incomeB,
        fraisReelsB: simulation.fraisReelsB,
        partsB: simulation.partsB,
        children: simulation.children,
        gardeAlternee: simulation.gardeAlternee,
        results: simulation.results,
        createdAt: simulation.createdAt,
      },
    })
  } catch (error) {
    console.error('Erreur lors de la récupération:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue',
      },
      { status: 500 }
    )
  }
}
