import { prisma } from "@/lib/prisma"

export interface CreateAssuntoProps {
  value: string
  label: string
}

export async function createAssunto({ value, label }: CreateAssuntoProps) {
  return await prisma.domainAssuntos.create({
    data: {
      value,
      label,
    },
  })
}