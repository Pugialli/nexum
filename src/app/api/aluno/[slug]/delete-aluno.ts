import { prisma } from '@/lib/prisma'

export async function deleteAluno(slug: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: { slug },
    select: { id: true },
  })
  await prisma.user.delete({ where: { id: user.id } })
}
