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

    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    // 1. Récupérer toutes les simulations qui ont été partagées (PDF ou lien)
    const sharedSimulationIds = await prisma.userAction.findMany({
      where: {
        actionType: {
          in: ['share_link', 'generate_pdf'],
        },
      },
      select: {
        simulationId: true,
      },
      distinct: ['simulationId'],
    })

    const sharedIds = sharedSimulationIds.map((action: { simulationId: string }) => action.simulationId)

    // 2. Supprimer les simulations NON partagées de plus de 7 jours
    const unsharedResult = await prisma.simulation.deleteMany({
      where: {
        id: {
          notIn: sharedIds.length > 0 ? sharedIds : ['none'], // Éviter une requête vide
        },
        createdAt: {
          lt: sevenDaysAgo,
        },
      },
    })

    // 3. Supprimer les simulations partagées de plus de 30 jours
    const sharedResult = await prisma.simulation.deleteMany({
      where: {
        id: {
          in: sharedIds.length > 0 ? sharedIds : ['none'], // Éviter une requête vide
        },
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    })

    // 4. Supprimer les UserActions orphelines (dont la simulation n'existe plus)
    const orphanedActionsResult = await prisma.userAction.deleteMany({
      where: {
        simulationId: {
          notIn: (
            await prisma.simulation.findMany({
              select: { id: true },
            })
          ).map((s: { id: string }) => s.id),
        },
      },
    })

    const totalDeleted = unsharedResult.count + sharedResult.count

    console.log(
      `[Cleanup] ${unsharedResult.count} simulation(s) non partagée(s) supprimée(s) (>7j), ` +
        `${sharedResult.count} simulation(s) partagée(s) supprimée(s) (>30j), ` +
        `${orphanedActionsResult.count} action(s) orpheline(s) supprimée(s)`
    )

    return NextResponse.json({
      success: true,
      deleted: {
        unshared: unsharedResult.count,
        shared: sharedResult.count,
        orphanedActions: orphanedActionsResult.count,
        total: totalDeleted,
      },
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
