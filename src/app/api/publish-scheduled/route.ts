import { NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'

/**
 * Endpoint pour publier automatiquement les articles programmés
 * À appeler via un cron job (ex: Vercel Cron, GitHub Actions, etc.)
 * 
 * Sécurisé par un token secret dans les headers
 */
export async function POST(request: Request) {
  try {
    // Vérification du token d'authentification
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.CRON_SECRET
    
    if (!expectedToken) {
      console.error('CRON_SECRET non configuré')
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      )
    }
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const now = new Date()
    
    // Trouver tous les articles qui doivent être publiés
    // (scheduledPublishAt <= maintenant ET publishedAt = null)
    const articlesToPublish = await prisma.article.findMany({
      where: {
        isDraft: false,
        publishedAt: null,
        scheduledPublishAt: {
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        scheduledPublishAt: true,
      },
    })
    
    if (articlesToPublish.length === 0) {
      return NextResponse.json({
        message: 'Aucun article à publier',
        published: 0,
      })
    }
    
    // Publier les articles
    const result = await prisma.article.updateMany({
      where: {
        id: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          in: articlesToPublish.map((a: any) => a.id),
        },
      },
      data: {
        publishedAt: now,
        scheduledPublishAt: null, // Nettoyer la date programmée
      },
    })
    
    console.log(`${result.count} article(s) publié(s):`, articlesToPublish)
    
    return NextResponse.json({
      message: `${result.count} article(s) publié(s) avec succès`,
      published: result.count,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      articles: articlesToPublish.map((a: any) => ({
        id: a.id,
        title: a.title,
        scheduledFor: a.scheduledPublishAt,
      })),
    })
  } catch (error) {
    console.error('Erreur lors de la publication programmée:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// GET pour tester (retourne les articles programmés sans les publier)
export async function GET(request: Request) {
  try {
    // Vérification du token d'authentification
    const authHeader = request.headers.get('authorization')
    const expectedToken = process.env.CRON_SECRET
    
    if (!expectedToken) {
      console.error('CRON_SECRET non configuré')
      return NextResponse.json(
        { error: 'Configuration manquante' },
        { status: 500 }
      )
    }
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const now = new Date()
    
    const articlesToPublish = await prisma.article.findMany({
      where: {
        isDraft: false,
        publishedAt: null,
        scheduledPublishAt: {
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        scheduledPublishAt: true,
      },
    })
    
    return NextResponse.json({
      message: `${articlesToPublish.length} article(s) prêt(s) à être publié(s)`,
      count: articlesToPublish.length,
      articles: articlesToPublish,
    })
  } catch (error) {
    console.error('Erreur lors de la vérification des articles programmés:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
