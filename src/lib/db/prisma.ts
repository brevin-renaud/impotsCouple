/* eslint-disable @typescript-eslint/no-explicit-any */
// Prisma Client with connection pooling for serverless
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Réutiliser le client en prod ET en dev pour éviter l'épuisement du pool
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

// Toujours réutiliser le client (évite MaxClientsInSessionMode en serverless)
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
export { prisma }
