import { prisma } from '@/lib/prisma'

export async function deleteProva(id: string) {
  await prisma.prova.delete({ where: { id } })
}
