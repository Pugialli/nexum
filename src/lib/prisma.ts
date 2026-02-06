import { PrismaClient } from '@prisma/client'

// Define a engine correta ANTES de criar o PrismaClient
if (typeof window === 'undefined' && !process.env.PRISMA_QUERY_ENGINE_LIBRARY) {
  process.env.PRISMA_QUERY_ENGINE_LIBRARY = `${process.cwd()}/node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node`
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma