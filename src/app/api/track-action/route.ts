import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { z } from 'zod'

const ActionSchema = z.object({
  simulationId: z.string().uuid(),
  actionType: z.enum(['share_link', 'generate_pdf']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { simulationId, actionType } = ActionSchema.parse(body)

    // Vérifier que la simulation existe
    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
    })

    if (!simulation) {
      return NextResponse.json(
        { error: 'Simulation not found' },
        { status: 404 }
      )
    }

    // Enregistrer l'action
    await prisma.userAction.create({
      data: {
        simulationId,
        actionType,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.issues },
        { status: 400 }
      )
    }

    console.error('Error tracking action:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
