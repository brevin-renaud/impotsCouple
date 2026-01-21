import { NextRequest, NextResponse } from 'next/server'
import { login, ADMIN_TOKEN_COOKIE } from '@/lib/admin/auth'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json(
        { error: 'Mot de passe requis' },
        { status: 400 }
      )
    }
    
    const token = login(password)
    
    if (!token) {
      return NextResponse.json(
        { error: 'Mot de passe incorrect' },
        { status: 401 }
      )
    }
    
    // Créer la réponse avec le cookie
    const response = NextResponse.json({ success: true })
    
    response.cookies.set(ADMIN_TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 heures
      path: '/',
    })
    
    return response
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
