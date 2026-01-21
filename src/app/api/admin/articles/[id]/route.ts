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
    
    const article = await prisma.article.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug }),
        ...(data.description && { description: data.description }),
        ...(data.content && { content: data.content }),
        ...(data.author && { author: data.author }),
        ...(data.category && { category: data.category }),
        ...(data.publishedAt !== undefined && { 
          publishedAt: data.publishedAt ? new Date(data.publishedAt) : null 
        }),
        ...(data.isDraft !== undefined && { isDraft: data.isDraft }),
      },
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
