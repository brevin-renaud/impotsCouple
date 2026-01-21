import { NextRequest, NextResponse } from 'next/server'
import { simulationSchema } from '@/lib/validation/schemas'
import { simulateFiscalScenarios } from '@/lib/fiscal/calculator'
import prisma from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation avec Zod
    const validationResult = simulationSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Calcul fiscal avec le nouveau calculateur simplifié
    const results = simulateFiscalScenarios({
      incomeA: data.incomeA,
      incomeB: data.incomeB,
      partsA: data.partsA ?? 1,
      partsB: data.partsB ?? 1,
    })

    // Calcul de la date d'expiration (30 jours)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Sauvegarde en base de données (simplifiée)
    const simulation = await prisma.simulation.create({
      data: {
        incomeA: data.incomeA,
        partsA: data.partsA ?? 0,
        incomeB: data.incomeB,
        partsB: data.partsB ?? 0,
        results: results as object,
        expiresAt,
      },
    })

    return NextResponse.json({
      success: true,
      uuid: simulation.id,
      results,
    })
  } catch (error) {
    console.error('Erreur lors de la simulation:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue lors de la simulation',
      },
      { status: 500 }
    )
  }
}
