import { prisma } from "@/lib/prisma";

export async function getHabilidades() {
  return await prisma.domainHabilidade.findMany({
    select: {
      value: true,
      descricao: true,
    },
    orderBy: {
      value: "asc",
    },
  })
}