import { NextRequest, NextResponse } from 'next/server'

// API de partage désactivée - Les simulations sont maintenant dans l'URL
// Redirige vers la nouvelle méthode stateless

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  const { uuid } = await params

  return NextResponse.json(
    {
      success: false,
      error: 'Cette API est obsolète. Les simulations utilisent maintenant un système stateless via URL.',
      migration: 'Les anciennes simulations stockées ne sont plus accessibles. Veuillez créer une nouvelle simulation.',
    },
    { status: 410 } // Gone
  )
}
