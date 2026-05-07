import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'

export async function GET(request: NextRequest) {
  try {
    // Vérification auth admin
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30', 10)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Statistiques globales
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = prisma as any
    const totalSimulations = await db.simulation.count({
      where: {
        createdAt: { gte: startDate },
      },
    })

    // Vérifier si la table UserAction existe en essayant de compter
    let totalShares = 0
    let totalPDFs = 0
    let actions: any[] = []

    try {
      totalShares = await db.userAction.count({
        where: {
          actionType: 'share_link',
          createdAt: { gte: startDate },
        },
      })

      totalPDFs = await db.userAction.count({
        where: {
          actionType: 'generate_pdf',
          createdAt: { gte: startDate },
        },
      })

      // Actions par jour
      actions = await db.userAction.findMany({
        where: {
          createdAt: { gte: startDate },
        },
        orderBy: {
          createdAt: 'asc',
        },
      })
    } catch (error) {
      console.error('UserAction table not available yet:', error)
      // Continue avec des valeurs par défaut
    }

    const simulations = await db.simulation.findMany({
      where: {
        createdAt: { gte: startDate },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Grouper par jour
    const dailyStats: Record<string, { date: string; simulations: number; shares: number; pdfs: number }> = {}

    // Initialiser tous les jours
    for (let i = 0; i < days; i++) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      dailyStats[dateStr] = { date: dateStr, simulations: 0, shares: 0, pdfs: 0 }
    }

    // Compter les simulations
    simulations.forEach((sim: { createdAt: Date }) => {
      const dateStr = sim.createdAt.toISOString().split('T')[0]
      if (dailyStats[dateStr]) {
        dailyStats[dateStr].simulations++
      }
    })

    // Compter les actions
    actions.forEach((action) => {
      const dateStr = action.createdAt.toISOString().split('T')[0]
      if (dailyStats[dateStr]) {
        if (action.actionType === 'share_link') {
          dailyStats[dateStr].shares++
        } else if (action.actionType === 'generate_pdf') {
          dailyStats[dateStr].pdfs++
        }
      }
    })

    const dailyData = Object.values(dailyStats).reverse()

    // Taux de conversion
    const shareRate = totalSimulations > 0 ? ((totalShares / totalSimulations) * 100).toFixed(1) : '0'
    const pdfRate = totalSimulations > 0 ? ((totalPDFs / totalSimulations) * 100).toFixed(1) : '0'

    return NextResponse.json({
      summary: {
        totalSimulations,
        totalShares,
        totalPDFs,
        shareRate: `${shareRate}%`,
        pdfRate: `${pdfRate}%`,
      },
      dailyData,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
