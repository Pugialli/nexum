import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await hash('nexum2026', 10)
  const passwordAdminHash = await hash('nexum123', 10)

  const carreiras = [
    { label: 'Pedagogia', value: 'pedagogia' },
    { label: 'Direito', value: 'direito' },
    { label: 'Administração', value: 'administracao' },
    { label: 'Enfermagem', value: 'enfermagem' },
    { label: 'Psicologia', value: 'psicologia' },
    { label: 'Contabilidade', value: 'contabilidade' },
    { label: 'Sistemas de Informação / TI', value: 'sistemas-de-informacao-ti' },
    { label: 'Educação Física', value: 'educacao-fisica' },
    { label: 'Fisioterapia', value: 'fisioterapia' },
    { label: 'Medicina', value: 'medicina' },
    { label: 'Engenharia', value: 'engenharia' },
    { label: 'Medicina Veterinária', value: 'medicina-veterinaria' },
    { label: 'Odontologia', value: 'odontologia' },
    { label: 'Nutrição', value: 'nutricao' },
    { label: 'Farmácia', value: 'farmacia' },
    { label: 'Serviço Social', value: 'servico-social' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Arquitetura e Urbanismo', value: 'arquitetura-e-urbanismo' },
    { label: 'Design', value: 'design' },
    { label: 'Economia', value: 'economia' },
  ]

  for (const carreira of carreiras) {
    await prisma.domainCarreira.upsert({
      where: { carreiraValue: carreira.value },
      update: {
        carreiraLabel: carreira.label,
      },
      create: {
        carreiraLabel: carreira.label,
        carreiraValue: carreira.value,
      },
    })
  }

  const user = await prisma.user.upsert({
    where: { email: 'assis@nexum.com.br' },
    update: {
      nome: 'Felipe Assis',
      email: 'assis@nexum.com.br',
      slug: 'assis-0226',
      avatarUrl: 'https://hexag.online/wp-content/uploads/2026/01/Felipe-Assis.png',
      dataNascimento: new Date('1990-12-28'),
      passwordHash,
      role: 'PROFESSOR',
    },
    create: {
      nome: 'Felipe Assis',
      email: 'assis@nexum.com.br',
      slug: 'assis-0226',
      avatarUrl: 'https://hexag.online/wp-content/uploads/2026/01/Felipe-Assis.png',
      dataNascimento: new Date('1990-12-28'),
      passwordHash,
      role: 'PROFESSOR',
    },
  })

  const professorDev = await prisma.user.upsert({
    where: { email: 'professor_dev@nexum.com.br' },
    update: {
      nome: 'João Paulo Pugialli',
      email: 'professor_dev@nexum.com.br',
      slug: 'professor-dev-0226',
      avatarUrl: 'https://github.com/Pugialli.png',
      dataNascimento: new Date('1993-01-03'),
      passwordHash: passwordAdminHash,
      role: 'PROFESSOR',
    },
    create: {
      nome: 'João Paulo Pugialli',
      email: 'professor_dev@nexum.com.br',
      slug: 'professor-dev-0226',
      avatarUrl: 'https://github.com/Pugialli.png',
      dataNascimento: new Date('1993-01-03'),
      passwordHash: passwordAdminHash,
      role: 'PROFESSOR',
    },
  })
  
  const alunoDev = await prisma.user.upsert({
    where: { email: 'aluno_dev@nexum.com.br' },
    update: {
      nome: 'Amanda Porto Padilha',
      email: 'aluno_dev@nexum.com.br',
      slug: 'aluno-dev-0226',
      avatarUrl: 'https://github.com/Padilha04.png',
      passwordHash: passwordAdminHash,
      role: 'ALUNO',
    },
    create: {
      nome: 'Amanda Porto Padilha',
      email: 'aluno_dev@nexum.com.br',
      slug: 'aluno-dev-0226',
      avatarUrl: 'https://github.com/Padilha04.png',
      passwordHash: passwordAdminHash,
      role: 'ALUNO',
    },
  })

  console.log('Carreiras criadas com sucesso:', carreiras.length)
  console.log('Usuário criado:', user.email)
  console.log('Usuário criado:', professorDev.email)
  console.log('Usuário criado:', alunoDev.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })