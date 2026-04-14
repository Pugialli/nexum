import { prisma } from "@/lib/prisma";

export async function getAssuntos() {
  return await prisma.domainAssuntos.findMany({
    select: {
      label: true,
      value: true,
    },
    orderBy: {
      label: "asc",
    },
  })
}