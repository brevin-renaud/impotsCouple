import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'
import { z } from 'zod'

// Schema de validation pour créer un article
const createArticleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  slug: z.string().min(1, 'Le slug est requis').regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets'),
  description: z.string().min(1, 'La description est requise'),
  content: z.string().min(1, 'Le contenu est requis'),
  author: z.string().optional().default('ImpotsCouple'),
  category: z.string().optional().default('Fiscalité'),
  publishedAt: z.string().nullable().optional(),
  isDraft: z.boolean().optional().default(true),
})

// Fonction pour calculer la date de publication
function calculatePublishDates(isDraft: boolean, publishedAt: string | null | undefined) {
  // Si brouillon, pas de publication
  if (isDraft) {
    return { publishedAt: null, scheduledPublishAt: null }
  }

  // Si pas de date fournie, publier immédiatement
  if (!publishedAt) {
    return { publishedAt: new Date(), scheduledPublishAt: null }
  }

  const targetDate = new Date(publishedAt)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  targetDate.setHours(0, 0, 0, 0)

  // Si la date est aujourd'hui ou dans le passé, publier immédiatement
  if (targetDate <= today) {
    return { publishedAt: new Date(), scheduledPublishAt: null }
  }

  // Si la date est dans le futur, programmer la publication à 10H
  const scheduledDate = new Date(publishedAt)
  scheduledDate.setHours(10, 0, 0, 0)
  
  return { publishedAt: null, scheduledPublishAt: scheduledDate }
}

// GET - Liste tous les articles
export async function GET() {
  try {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        author: true,
        category: true,
        publishedAt: true,
        scheduledPublishAt: true,
        createdAt: true,
        updatedAt: true,
        isDraft: true,
      },
    })
    
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Erreur GET articles:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// POST - Crée un nouvel article
export async function POST(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const body = await request.json()
    const validationResult = createArticleSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }
    
    const data = validationResult.data
    
    // Vérifier si le slug existe déjà
    const existingArticle = await prisma.article.findUnique({
      where: { slug: data.slug },
    })
    
    if (existingArticle) {
      return NextResponse.json(
        { error: 'Un article avec ce slug existe déjà' },
        { status: 409 }
      )
    }
    
    const { publishedAt, scheduledPublishAt } = calculatePublishDates(data.isDraft, data.publishedAt)
    
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        author: data.author,
        category: data.category,
        publishedAt,
        scheduledPublishAt,
        isDraft: data.isDraft,
      },
    })
    
    // Invalider le cache des pages du blog
    revalidatePath('/blog')
    revalidatePath(`/blog/${article.slug}`)
    
    return NextResponse.json({ article }, { status: 201 })
  } catch (error) {
    console.error('Erreur POST article:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
