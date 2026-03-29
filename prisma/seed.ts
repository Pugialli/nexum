import { PrismaClient } from '@/generated'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
const { hash } = bcrypt

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function upsertUserWithAccount(data: {
  email: string
  password: string
  nome: string
  slug: string
  avatarUrl: string
  dataNascimento?: Date
  role: 'PROFESSOR' | 'ALUNO' | 'EXALUNO'
}) {
  const passwordHash = await hash(data.password, 10)

  const user = await prisma.user.upsert({
    where: { email: data.email },
    update: {
      nome: data.nome,
      slug: data.slug,
      avatarUrl: data.avatarUrl,
      dataNascimento: data.dataNascimento,
      role: data.role,
    },
    create: {
      email: data.email,
      nome: data.nome,
      slug: data.slug,
      avatarUrl: data.avatarUrl,
      dataNascimento: data.dataNascimento,
      role: data.role,
    },
  })

  const existingAccount = await prisma.account.findFirst({
    where: { userId: user.id, providerId: 'credential' },
  })

  if (existingAccount) {
    await prisma.account.update({
      where: { id: existingAccount.id },
      data: { password: passwordHash },
    })
  } else {
    await prisma.account.create({
      data: {
        userId: user.id,
        accountId: user.id,
        providerId: 'credential',
        password: passwordHash,
      },
    })
  }

  return user
}

async function main() {
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

  const assuntos = [
    { value: 'AC-01', label: 'Análise Combinatória' },
    { value: 'AC-02', label: 'Probabilidade' },
    { value: 'GE-01', label: 'Áreas de Figuras Planas' },
    { value: 'GE-02', label: 'Cilindros' },
    { value: 'GE-03', label: 'Circunferência e Círculo' },
    { value: 'GE-04', label: 'Relações Métricas no Triângulo Retângulo' },
    { value: 'GE-05', label: 'Visão Espacial' },
    { value: 'AL-01', label: 'Conjuntos Numéricos' },
    { value: 'AL-02', label: 'Sistemas Lineares' },
    { value: 'FN-01', label: 'Função Afim' },
    { value: 'FN-02', label: 'Função Exponencial' },
    { value: 'FN-03', label: 'Função Logarítmica' },
    { value: 'FN-04', label: 'Função Quadrática' },
    { value: 'FN-05', label: 'Função Trigonométrica' },
    { value: 'FN-06', label: 'Gráficos' },
    { value: 'ES-01', label: 'Estatística' },
    { value: 'ES-02', label: 'Média Aritmética' },
    { value: 'MA-01', label: 'Escala' },
    { value: 'MA-02', label: 'Matemática Financeira' },
    { value: 'MA-03', label: 'Porcentagem' },
    { value: 'MA-04', label: 'Progressão Geométrica' },
    { value: 'MA-05', label: 'Razão e Proporção' },
    { value: 'MA-06', label: 'Sistema Métrico Decimal' },
  ]

  const habilidades = [
    { value: 1, descricao: 'Reconhecer, no contexto social, diferentes significados e representações dos números e operações - naturais, inteiros, racionais ou reais.' },
    { value: 2, descricao: 'Identificar padrões numéricos ou princípios de contagem.' },
    { value: 3, descricao: 'Resolver situação-problema envolvendo conhecimentos numéricos.' },
    { value: 4, descricao: 'Avaliar a razoabilidade de um resultado numérico na construção de argumentos sobre afirmações quantitativas.' },
    { value: 5, descricao: 'Avaliar propostas de intervenção na realidade utilizando conhecimentos numéricos.' },
    { value: 6, descricao: 'Interpretar a localização e a movimentação de pessoas/objetos no espaço tridimensional e sua representação no espaço bidimensional.' },
    { value: 7, descricao: 'Identificar características de figuras planas ou espaciais.' },
    { value: 8, descricao: 'Resolver situação-problema que envolva conhecimentos geométricos de espaço e forma.' },
    { value: 9, descricao: 'Utilizar conhecimentos geométricos de espaço e forma na seleção de argumentos propostos como solução de problemas do cotidiano.' },
    { value: 10, descricao: 'Identificar relações entre grandezas e unidades de medida.' },
    { value: 11, descricao: 'Utilizar a noção de escalas na leitura de representação de situação do cotidiano.' },
    { value: 12, descricao: 'Resolver situação-problema que envolva medidas de grandezas.' },
    { value: 13, descricao: 'Avaliar o resultado de uma medição na construção de um argumento consistente.' },
    { value: 14, descricao: 'Avaliar proposta de intervenção na realidade utilizando conhecimentos geométricos relacionados a grandezas e medidas.' },
    { value: 15, descricao: 'Identificar a relação de dependência entre grandezas.' },
    { value: 16, descricao: 'Resolver situação-problema envolvendo a variação de grandezas, direta ou inversamente proporcionais.' },
    { value: 17, descricao: 'Analisar informações envolvendo a variação de grandezas como recurso para a construção de argumentação.' },
    { value: 18, descricao: 'Avaliar propostas de intervenção na realidade envolvendo variação de grandezas.' },
    { value: 19, descricao: 'Identificar representações algébricas que expressem a relação entre grandezas.' },
    { value: 20, descricao: 'Interpretar gráfico cartesiano que represente relações entre grandezas.' },
    { value: 21, descricao: 'Resolver situação-problema cuja modelagem envolva conhecimentos algébricos.' },
    { value: 22, descricao: 'Utilizar conhecimentos algébricos/geométricos como recurso para a construção de argumentação.' },
    { value: 23, descricao: 'Avaliar propostas de intervenção na realidade utilizando conhecimentos algébricos.' },
    { value: 24, descricao: 'Utilizar informações expressas em gráficos ou tabelas para fazer inferências.' },
    { value: 25, descricao: 'Resolver problema com dados apresentados em tabelas ou gráficos.' },
    { value: 26, descricao: 'Analisar informações expressas em gráficos ou tabelas como recurso para a construção de argumentos.' },
    { value: 27, descricao: 'Calcular medidas de tendência central ou de dispersão de um conjunto de dados expressos em uma tabela de frequências de dados agrupados (não em classes) ou em gráficos.' },
    { value: 28, descricao: 'Resolver situação-problema que envolva conhecimentos de estatística e probabilidade.' },
    { value: 29, descricao: 'Utilizar conhecimentos de estatística e probabilidade como recurso para a construção de argumentação.' },
    { value: 30, descricao: 'Avaliar propostas de intervenção na realidade utilizando conhecimentos de estatística e probabilidade.' },
  ]

  const assuntoMap: Record<string, string> = {
    'Função Afim': 'FN-01',
    'Estatística': 'ES-01',
    'Razão e Proporção': 'MA-05',
    'Análise Combinatória': 'AC-01',
    'Probabilidade': 'AC-02',
    'Conjuntos Numéricos': 'AL-01',
    'Matemática Financeira': 'MA-02',
    'Circunferência e Círculo': 'GE-03',
    'Relações Métricas no Triângulo Retângulo': 'GE-04',
    'Função Trigonométrica': 'FN-05',
    'Áreas de Figuras Planas': 'GE-01',
    'Função Logarítmica': 'FN-03',
    'Cilindros': 'GE-02',
    'Gráficos': 'FN-06',
    'Média Aritmética': 'ES-02',
    'Sistema Métrico Decimal': 'MA-06',
    'Sistemas Lineares': 'AL-02',
    'Visão Espacial': 'GE-05',
    'Porcentagem': 'MA-03',
    'Progressão Geométrica': 'MA-04',
    'Escala': 'MA-01',
    'Função Quadrática': 'FN-04',
    'Função Exponencial': 'FN-02',
  }

  const questoesData = [
    { numero: 136, gabarito: 'C', dificuldade: 3, habilidade: 25, assunto: 'Função Afim' },
    { numero: 137, gabarito: 'E', dificuldade: 1, habilidade: 27, assunto: 'Estatística' },
    { numero: 138, gabarito: 'C', dificuldade: 4, habilidade: 16, assunto: 'Razão e Proporção' },
    { numero: 139, gabarito: 'E', dificuldade: 4, habilidade: 2, assunto: 'Análise Combinatória' },
    { numero: 140, gabarito: 'B', dificuldade: 5, habilidade: 30, assunto: 'Probabilidade' },
    { numero: 141, gabarito: 'E', dificuldade: 3, habilidade: 19, assunto: 'Razão e Proporção' },
    { numero: 142, gabarito: 'D', dificuldade: 4, habilidade: 3, assunto: 'Conjuntos Numéricos' },
    { numero: 143, gabarito: 'A', dificuldade: 5, habilidade: 5, assunto: 'Matemática Financeira' },
    { numero: 144, gabarito: 'D', dificuldade: 4, habilidade: 12, assunto: 'Circunferência e Círculo' },
    { numero: 145, gabarito: 'C', dificuldade: 4, habilidade: 8, assunto: 'Relações Métricas no Triângulo Retângulo' },
    { numero: 146, gabarito: 'A', dificuldade: 2, habilidade: 15, assunto: 'Função Trigonométrica' },
    { numero: 147, gabarito: 'A', dificuldade: 5, habilidade: 22, assunto: 'Áreas de Figuras Planas' },
    { numero: 148, gabarito: 'D', dificuldade: 3, habilidade: 17, assunto: 'Função Afim' },
    { numero: 149, gabarito: 'E', dificuldade: 5, habilidade: 28, assunto: 'Probabilidade' },
    { numero: 150, gabarito: 'C', dificuldade: 4, habilidade: 21, assunto: 'Função Logarítmica' },
    { numero: 151, gabarito: 'D', dificuldade: 4, habilidade: 12, assunto: 'Cilindros' },
    { numero: 152, gabarito: 'B', dificuldade: 3, habilidade: 24, assunto: 'Função Afim' },
    { numero: 153, gabarito: 'B', dificuldade: 4, habilidade: 15, assunto: 'Gráficos' },
    { numero: 154, gabarito: 'C', dificuldade: 1, habilidade: 27, assunto: 'Média Aritmética' },
    { numero: 155, gabarito: 'E', dificuldade: 4, habilidade: 9, assunto: 'Áreas de Figuras Planas' },
    { numero: 156, gabarito: 'B', dificuldade: 2, habilidade: 19, assunto: 'Função Afim' },
    { numero: 157, gabarito: 'D', dificuldade: 3, habilidade: 16, assunto: 'Razão e Proporção' },
    { numero: 158, gabarito: 'C', dificuldade: 3, habilidade: 10, assunto: 'Sistema Métrico Decimal' },
    { numero: 159, gabarito: 'C', dificuldade: 3, habilidade: 4, assunto: 'Sistemas Lineares' },
    { numero: 160, gabarito: 'C', dificuldade: 2, habilidade: 23, assunto: 'Função Afim' },
    { numero: 161, gabarito: 'A', dificuldade: 3, habilidade: 29, assunto: 'Probabilidade' },
    { numero: 162, gabarito: 'C', dificuldade: 3, habilidade: 6, assunto: 'Visão Espacial' },
    { numero: 163, gabarito: 'A', dificuldade: 5, habilidade: 13, assunto: 'Razão e Proporção' },
    { numero: 164, gabarito: 'B', dificuldade: 3, habilidade: 28, assunto: 'Média Aritmética' },
    { numero: 165, gabarito: 'B', dificuldade: 4, habilidade: 3, assunto: 'Análise Combinatória' },
    { numero: 166, gabarito: 'A', dificuldade: 5, habilidade: 26, assunto: 'Função Afim' },
    { numero: 167, gabarito: 'B', dificuldade: 3, habilidade: 4, assunto: 'Porcentagem' },
    { numero: 168, gabarito: 'B', dificuldade: 4, habilidade: 20, assunto: 'Gráficos' },
    { numero: 169, gabarito: 'A', dificuldade: 3, habilidade: 2, assunto: 'Progressão Geométrica' },
    { numero: 170, gabarito: 'D', dificuldade: 1, habilidade: 18, assunto: 'Razão e Proporção' },
    { numero: 171, gabarito: 'D', dificuldade: 2, habilidade: 7, assunto: 'Visão Espacial' },
    { numero: 172, gabarito: 'D', dificuldade: 2, habilidade: 8, assunto: 'Áreas de Figuras Planas' },
    { numero: 173, gabarito: 'C', dificuldade: 5, habilidade: 13, assunto: 'Cilindros' },
    { numero: 174, gabarito: 'E', dificuldade: 4, habilidade: 11, assunto: 'Escala' },
    { numero: 175, gabarito: 'A', dificuldade: 2, habilidade: 25, assunto: 'Gráficos' },
    { numero: 176, gabarito: 'D', dificuldade: 2, habilidade: 1, assunto: 'Conjuntos Numéricos' },
    { numero: 177, gabarito: 'B', dificuldade: 5, habilidade: 22, assunto: 'Função Quadrática' },
    { numero: 178, gabarito: 'B', dificuldade: 2, habilidade: 1, assunto: 'Conjuntos Numéricos' },
    { numero: 179, gabarito: 'C', dificuldade: 4, habilidade: 21, assunto: 'Função Exponencial' },
    { numero: 180, gabarito: 'E', dificuldade: 4, habilidade: 14, assunto: 'Cilindros' },
  ]

  // Seed Carreiras
  for (const carreira of carreiras) {
    await prisma.domainCarreira.upsert({
      where: { value: carreira.value },
      update: { label: carreira.label },
      create: { label: carreira.label, value: carreira.value },
    })
  }

  // Seed Assuntos
  for (const assunto of assuntos) {
    await prisma.domainAssuntos.upsert({
      where: { value: assunto.value },
      update: { label: assunto.label },
      create: { label: assunto.label, value: assunto.value },
    })
  }

  // Seed Habilidades
  for (const habilidade of habilidades) {
    await prisma.habilidade.upsert({
      where: { value: habilidade.value },
      update: { descricao: habilidade.descricao },
      create: { value: habilidade.value, descricao: habilidade.descricao },
    })
  }

  // Seed Usuários
  const user = await upsertUserWithAccount({
    email: 'assis@nexum.com.br',
    password: 'nexum2026',
    nome: 'Felipe Assis',
    slug: 'assis-0226',
    avatarUrl: 'https://hexag.online/wp-content/uploads/2026/01/Felipe-Assis.png',
    dataNascimento: new Date('1990-12-28'),
    role: 'PROFESSOR',
  })

  const professorDev = await upsertUserWithAccount({
    email: 'professor_dev@nexum.com.br',
    password: 'nexum123',
    nome: 'João Paulo Pugialli',
    slug: 'professor-dev-0226',
    avatarUrl: 'https://github.com/Pugialli.png',
    dataNascimento: new Date('1993-01-03'),
    role: 'PROFESSOR',
  })

  const alunoDev = await upsertUserWithAccount({
    email: 'aluno_dev@nexum.com.br',
    password: 'nexum123',
    nome: 'Amanda Porto Padilha',
    slug: 'aluno-dev-0226',
    avatarUrl: 'https://github.com/Padilha04.png',
    role: 'ALUNO',
  })

  // Seed Prova 2024.1
  const prova2024_1 = await prisma.prova.upsert({
    where: { id: 'prova-2024-1' },
    update: {
      ano: '2024.1',
      notaMinima: 150,
      notaMaxima: 300,
      peso1: 1,
      peso2: 2,
      peso3: 3,
      peso4: 4,
    },
    create: {
      id: 'prova-2024-1',
      ano: '2024.1',
      notaMinima: 150,
      notaMaxima: 300,
      peso1: 1,
      peso2: 2,
      peso3: 3,
      peso4: 4,
    },
  })

  // Seed Questões
  for (const questao of questoesData) {
    await prisma.questao.create({
      data: {
        numero: questao.numero,
        gabarito: questao.gabarito,
        dificuldade: questao.dificuldade,
        habilidadeValue: questao.habilidade,
        assuntoValue: assuntoMap[questao.assunto],
        idProva: prova2024_1.id,
      },
    })
  }

  console.log('Carreiras criadas com sucesso:', carreiras.length)
  console.log('Assuntos criados com sucesso:', assuntos.length)
  console.log('Habilidades criadas com sucesso:', habilidades.length)
  console.log('Prova criada:', prova2024_1.ano)
  console.log('Questões criadas com sucesso:', questoesData.length)
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