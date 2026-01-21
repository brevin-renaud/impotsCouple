import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_TOKEN_COOKIE = 'admin_token'
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000 // 24 heures

// Génère un token simple basé sur le timestamp et le mot de passe
function generateToken(): string {
  const timestamp = Date.now()
  const payload = `${ADMIN_PASSWORD}:${timestamp}`
  // Simple hash en base64 (en production, utiliser un vrai JWT)
  return Buffer.from(payload).toString('base64')
}

// Vérifie si un token est valide
function verifyToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    const [password, timestampStr] = decoded.split(':')
    const timestamp = parseInt(timestampStr, 10)
    
    // Vérifier le mot de passe
    if (password !== ADMIN_PASSWORD) {
      return false
    }
    
    // Vérifier l'expiration
    if (Date.now() - timestamp > TOKEN_EXPIRY) {
      return false
    }
    
    return true
  } catch {
    return false
  }
}

// Vérifie si l'utilisateur est authentifié comme admin
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_TOKEN_COOKIE)
  
  if (!token) {
    return false
  }
  
  return verifyToken(token.value)
}

// Vérifie le mot de passe et retourne un token si valide
export function login(password: string): string | null {
  if (password === ADMIN_PASSWORD) {
    return generateToken()
  }
  return null
}

// Constantes exportées pour utilisation dans les routes
export { ADMIN_TOKEN_COOKIE }
