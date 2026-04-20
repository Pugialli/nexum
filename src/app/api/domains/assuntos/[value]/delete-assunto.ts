import { prisma } from "@/lib/prisma"

export async function deleteAssunto(value: string) {
  return await prisma.domainAssuntos.delete({
    where: {
      value,
    },
  })
}