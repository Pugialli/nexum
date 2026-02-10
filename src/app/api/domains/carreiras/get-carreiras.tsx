import { prisma } from "@/lib/prisma";

export async function getCarreiras() {
  return await prisma.domainCarreira.findMany({
    select: {
      carreiraLabel: true,
      carreiraValue: true,
    },
    orderBy: {
      carreiraLabel: "asc",
    },
  })
}