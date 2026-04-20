import { prisma } from "@/lib/prisma";

export async function getCarreiras() {
  return await prisma.domainCarreira.findMany({
    select: {
      label: true,
      value: true,
    },
    orderBy: {
      label: "asc",
    },
  })
}