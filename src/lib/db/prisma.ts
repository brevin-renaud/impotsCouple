/* eslint-disable @typescript-eslint/no-explicit-any */
// Prisma Client with connection pooling for serverless
const { PrismaClient } = require('@prisma/client')

const globalForPrisma = globalThis as unknown as {
  prisma: any | undefined
}

// Réutiliser le client en prod ET en dev pour éviter l'épuisement du pool
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})

// Toujours réutiliser le client (évite MaxClientsInSessionMode en serverless)
globalForPrisma.prisma = prisma

export default prisma
export { prisma }
