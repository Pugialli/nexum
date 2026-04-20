import { prisma } from "@/lib/prisma"

export async function getAssuntos() {
  const assuntos = await prisma.domainAssuntos.findMany({
    select: {
      label: true,
      value: true,
      _count: {
        select: { questaos: true }
      }
    },
    orderBy: { label: "asc" },
  })

  return assuntos.map((a) => ({
    value: a.value,
    label: a.label,
    numQuestoes: a._count.questaos,
  }))
}