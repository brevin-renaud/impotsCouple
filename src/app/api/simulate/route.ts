import { NextRequest, NextResponse } from 'next/server'
import { simulateFiscalScenarios } from '@/lib/fiscal/calculator'
import prisma from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation basique des données requises
    if (typeof body.incomeA !== 'number' || typeof body.incomeB !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: 'Les revenus sont requis',
        },
        { status: 400 }
      )
    }

    const data = body

    const results = simulateFiscalScenarios({
      incomeA: data.incomeA,
      incomeB: data.incomeB,
      partsA: data.partsA ?? 1,
      partsB: data.partsB ?? 1,
      partsCouple: data.partsCouple ?? (data.partsA ?? 1) + (data.partsB ?? 1),
    })

    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    const simulation = await prisma.simulation.create({
      data: {
        incomeA: data.incomeA,
        partsA: data.partsA ?? 1,
        incomeB: data.incomeB,
        partsB: data.partsB ?? 1,
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
