import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'
import { z } from 'zod'

interface RouteParams {
  params: Promise<{ id: string }>
}

// Schema de validation pour mettre à jour un article
const updateArticleSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').optional(),
  slug: z.string().min(1, 'Le slug est requis').regex(/^[a-z0-9-]+$/, 'Le slug ne peut contenir que des lettres minuscules, chiffres et tirets').optional(),
  description: z.string().min(1, 'La description est requise').optional(),
  content: z.string().min(1, 'Le contenu est requis').optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  publishedAt: z.string().nullable().optional(),
  isDraft: z.boolean().optional(),
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

// GET - Récupère un article par ID
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    
    const article = await prisma.article.findUnique({
      where: { id },
    })
    
    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ article })
  } catch (error) {
    console.error('Erreur GET article:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// PUT - Met à jour un article
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    const body = await request.json()
    const validationResult = updateArticleSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }
    
    const data = validationResult.data
    
    // Vérifier si l'article existe
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })
    
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }
    
    // Si le slug est modifié, vérifier qu'il n'existe pas déjà
    if (data.slug && data.slug !== existingArticle.slug) {
      const slugExists = await prisma.article.findUnique({
        where: { slug: data.slug },
      })
      
      if (slugExists) {
        return NextResponse.json(
          { error: 'Un article avec ce slug existe déjà' },
          { status: 409 }
        )
      }
    }
    
    // Calculer les dates de publication si nécessaire
    const updateData: any = {
      ...(data.title && { title: data.title }),
      ...(data.slug && { slug: data.slug }),
      ...(data.description && { description: data.description }),
      ...(data.content && { content: data.content }),
      ...(data.author && { author: data.author }),
      ...(data.category && { category: data.category }),
    }

    // Si isDraft ou publishedAt sont modifiés, recalculer les dates
    if (data.isDraft !== undefined || data.publishedAt !== undefined) {
      const isDraft = data.isDraft !== undefined ? data.isDraft : existingArticle.isDraft
      const publishedAtInput = data.publishedAt !== undefined ? data.publishedAt : (existingArticle.scheduledPublishAt || existingArticle.publishedAt)?.toISOString().split('T')[0]
      
      const { publishedAt, scheduledPublishAt } = calculatePublishDates(isDraft, publishedAtInput)
      updateData.publishedAt = publishedAt
      updateData.scheduledPublishAt = scheduledPublishAt
      updateData.isDraft = isDraft // Toujours mettre à jour isDraft
    }
    
    const article = await prisma.article.update({
      where: { id },
      data: updateData,
    })
    
    return NextResponse.json({ article })
  } catch (error) {
    console.error('Erreur PUT article:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

// DELETE - Supprime un article
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const authenticated = await isAuthenticated()
    
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }
    
    const { id } = await params
    
    // Vérifier si l'article existe
    const existingArticle = await prisma.article.findUnique({
      where: { id },
    })
    
    if (!existingArticle) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      )
    }
    
    await prisma.article.delete({
      where: { id },
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur DELETE article:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
