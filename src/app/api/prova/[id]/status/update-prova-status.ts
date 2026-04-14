import type { Prova } from "@/generated"
import { prisma } from "@/lib/prisma"

interface UpdateProvaStatusProps {
  id: string
}
export async function updateProvaStatus({ id }: UpdateProvaStatusProps): Promise<Prova> {
  const prova = await prisma.prova.findUniqueOrThrow({ where: { id } })

  return await prisma.prova.update({
    where: { id },
    data: { statusProva: !prova.statusProva },
  })
}