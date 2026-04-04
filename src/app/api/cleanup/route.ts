import { NextRequest, NextResponse } from 'next/server'

// API de nettoyage désactivée - Plus de stockage en base de données
// Les simulations sont maintenant 100% stateless via URL

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Cleanup désactivé - Mode stateless actif, aucune donnée stockée en base',
    timestamp: new Date().toISOString(),
  })
}

// Configuration pour Vercel Cron (peut être supprimé de vercel.json)
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
