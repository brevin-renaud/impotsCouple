/* eslint-disable @typescript-eslint/no-explicit-any */
// Prisma Client - Ce fichier nécessite que prisma generate ait été exécuté
// Si vous voyez une erreur, exécutez: npx prisma generate

let prisma: any

try {
  // Import Prisma 5
  const { PrismaClient } = require('@prisma/client')
  
  const globalForPrisma = globalThis as unknown as {
    prisma: any | undefined
  }

  prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
  }
} catch {
  // Mock Prisma pour le développement sans base de données
  console.warn('⚠️ Prisma Client non disponible. Exécutez: npx prisma generate')
  
  prisma = {
    simulation: {
      create: async (data: any) => {
        console.log('[Mock] Création simulation:', data)
        return { id: crypto.randomUUID(), ...data.data }
      },
      findUnique: async () => {
        console.log('[Mock] Recherche simulation')
        return null
      },
      delete: async () => {
        console.log('[Mock] Suppression simulation')
        return {}
      },
      deleteMany: async () => {
        console.log('[Mock] Suppression simulations expirées')
        return { count: 0 }
      },
    },
  }
}

export default prisma
