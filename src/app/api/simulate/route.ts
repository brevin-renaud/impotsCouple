import { NextRequest, NextResponse } from 'next/server'
import { simulationSchema } from '@/lib/validation/schemas'
import { simulateFiscalScenarios } from '@/lib/fiscal'
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

    // Calcul fiscal
    const results = simulateFiscalScenarios({
      incomeA: data.incomeA,
      fraisReelsA: data.fraisReelsA ?? 0,
      partsA: data.partsA ?? 0,
      pensionVerseeA: data.pensionVerseeA ?? 0,
      patrimoineImmoA: data.patrimoineImmoA ?? 0,
      epargneRetraiteA: data.epargneRetraiteA ?? 0,
      incomeB: data.incomeB,
      fraisReelsB: data.fraisReelsB ?? 0,
      partsB: data.partsB ?? 0,
      pensionVerseeB: data.pensionVerseeB ?? 0,
      patrimoineImmoB: data.patrimoineImmoB ?? 0,
      epargneRetraiteB: data.epargneRetraiteB ?? 0,
      children: data.children,
      gardeAlternee: data.gardeAlternee ?? false,
      fraisGardeEnfants: data.fraisGardeEnfants ?? 0,
      emploiDomicile: data.emploiDomicile ?? 0,
      donsAssociations: data.donsAssociations ?? 0,
    })

    // Calcul de la date d'expiration (30 jours)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 30)

    // Sauvegarde en base de données
    const simulation = await prisma.simulation.create({
      data: {
        incomeA: data.incomeA,
        fraisReelsA: data.fraisReelsA ?? 0,
        partsA: data.partsA ?? 0,
        pensionVerseeA: data.pensionVerseeA ?? 0,
        patrimoineImmoA: data.patrimoineImmoA ?? 0,
        epargneRetraiteA: data.epargneRetraiteA ?? 0,
        incomeB: data.incomeB,
        fraisReelsB: data.fraisReelsB ?? 0,
        partsB: data.partsB ?? 0,
        pensionVerseeB: data.pensionVerseeB ?? 0,
        patrimoineImmoB: data.patrimoineImmoB ?? 0,
        epargneRetraiteB: data.epargneRetraiteB ?? 0,
        children: data.children,
        gardeAlternee: data.gardeAlternee ?? false,
        fraisGardeEnfants: data.fraisGardeEnfants ?? 0,
        emploiDomicile: data.emploiDomicile ?? 0,
        donsAssociations: data.donsAssociations ?? 0,
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
