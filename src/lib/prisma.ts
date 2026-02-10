import { PrismaClient } from '@prisma/client'

// Define a engine correta baseado no sistema operacional
if (typeof window === 'undefined' && !process.env.PRISMA_QUERY_ENGINE_LIBRARY) {
  // Detecta se está no Linux (Firebase Studio) ou Windows (desenvolvimento local)
  const isLinux = process.platform === 'linux'
  
  if (isLinux) {
    // Firebase Studio usa OpenSSL 3.0.x
    process.env.PRISMA_QUERY_ENGINE_LIBRARY = `${process.cwd()}/node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node`
  }
  // No Windows, deixa o Prisma detectar automaticamente
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma