import { NextResponse } from 'next/server'

// API de tracking désactivée - Plus de stockage en base de données
// Les simulations sont maintenant 100% stateless

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    message: 'Tracking désactivé - Mode stateless actif',
  })
}
