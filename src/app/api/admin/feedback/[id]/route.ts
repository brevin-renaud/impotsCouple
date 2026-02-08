import { NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin/auth'
import prisma from '@/lib/db/prisma'

interface RouteParams {
  params: Promise<{ id: string }>
}

// DELETE - Supprimer un avis
export async function DELETE(_request: Request, { params }: RouteParams) {
  try {
    const authenticated = await isAuthenticated()

    if (!authenticated) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { id } = await params

    await prisma.feedback.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erreur DELETE feedback:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
