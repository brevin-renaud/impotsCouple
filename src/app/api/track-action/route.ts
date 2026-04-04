import { NextRequest, NextResponse } from 'next/server'

// API de tracking désactivée - Plus de stockage en base de données

export async function POST(request: NextRequest) {
  return NextResponse.json({ success: true, message: 'Tracking désactivé - Mode stateless' })
}
