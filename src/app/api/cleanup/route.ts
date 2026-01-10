import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

// Endpoint pour le Cron Job de nettoyage
// À appeler quotidiennement via Vercel Cron ou une Edge Function

export async function GET(request: NextRequest) {
  try {
    // Vérification du secret (sécurité)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Non autorisé' },
        { status: 401 }
      )
    }

    // Suppression des simulations expirées
    const result = await prisma.simulation.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    })

    console.log(`[Cleanup] ${result.count} simulation(s) supprimée(s)`)

    return NextResponse.json({
      success: true,
      deleted: result.count,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Erreur lors du nettoyage:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors du nettoyage',
      },
      { status: 500 }
    )
  }
}

// Configuration pour Vercel Cron
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
