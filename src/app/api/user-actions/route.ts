import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const { simulationId, actionType } = await request.json()

    // Validation
    if (!simulationId || !actionType) {
      return NextResponse.json(
        { error: 'simulationId et actionType sont requis' },
        { status: 400 }
      )
    }

    if (!['share_link', 'generate_pdf'].includes(actionType)) {
      return NextResponse.json(
        { error: 'actionType doit être share_link ou generate_pdf' },
        { status: 400 }
      )
    }

    // Vérifier que la simulation existe
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
    })

    if (!simulation) {
      return NextResponse.json(
        { error: 'Simulation non trouvée' },
        { status: 404 }
      )
    }

    // Enregistrer l'action
    const userAction = await prisma.userAction.create({
      data: {
        simulationId,
        actionType,
      },
    })

    return NextResponse.json({ success: true, action: userAction })
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'action:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
