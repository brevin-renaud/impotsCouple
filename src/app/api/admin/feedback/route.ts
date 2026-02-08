import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'

// GET - Liste tous les avis (admin)
export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const limit = 20
    const ratingFilter = searchParams.get('rating')

    const where = ratingFilter ? { rating: parseInt(ratingFilter, 10) } : {}

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.feedback.count({ where }),
    ])

    // Statistiques globales
    const stats = await prisma.feedback.aggregate({
      _avg: { rating: true },
      _count: { id: true },
    })

    const ratingDistribution = await prisma.feedback.groupBy({
      by: ['rating'],
      _count: { id: true },
      orderBy: { rating: 'desc' },
    })

    return NextResponse.json({
      feedbacks,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        average: stats._avg.rating ? Math.round(stats._avg.rating * 10) / 10 : 0,
        total: stats._count.id,
        distribution: ratingDistribution.map((r: { rating: number; _count: { id: number } }) => ({
          rating: r.rating,
          count: r._count.id,
        })),
      },
    })
  } catch (error) {
    console.error('Erreur GET feedbacks:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
