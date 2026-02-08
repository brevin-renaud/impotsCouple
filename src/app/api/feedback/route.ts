import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db/prisma'
import { z } from 'zod'

const feedbackSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional().nullable(),
})

// POST - Créer un avis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validationResult = feedbackSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validationResult.error.flatten() },
        { status: 400 }
      )
    }

    const { rating, comment } = validationResult.data

    const feedback = await prisma.feedback.create({
      data: {
        rating,
        comment: comment?.trim() || null,
      },
    })

    return NextResponse.json({ success: true, id: feedback.id }, { status: 201 })
  } catch (error) {
    console.error('Erreur POST feedback:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
