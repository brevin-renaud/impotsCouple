import { NextRequest, NextResponse } from 'next/server'
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
    
    const article = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        author: data.author,
        category: data.category,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
        isDraft: data.isDraft,
      },
    })
    
    return NextResponse.json({ article }, { status: 201 })
  } catch (error) {
    console.error('Erreur POST article:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
