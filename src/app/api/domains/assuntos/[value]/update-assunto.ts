import { prisma } from "@/lib/prisma"

export interface UpdateAssuntoProps {
  value: string
  label: string
}

export async function updateAssunto({ value, label }: UpdateAssuntoProps) {
  return await prisma.domainAssuntos.update({
    where: {
      value,
    },
    data: {
      label,
    },
  })
}