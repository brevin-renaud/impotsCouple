import { NextRequest, NextResponse } from 'next/server'
import { simulateFiscalScenarios } from '@/lib/fiscal/calculator'

// Cette API est conservée pour des calculs serveur si nécessaire
// mais le flux principal est maintenant 100% stateless via URL

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

    // Retourne uniquement les résultats calculés (pas de sauvegarde en DB)
    return NextResponse.json({
      success: true,
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
