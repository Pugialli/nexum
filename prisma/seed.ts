import { PrismaClient } from '@/lib/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { hash } from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
});

const defaultPassword = 'admin123'

const defaultPasswordHash = await hash(defaultPassword, 8)

const today = new Date()

const pugialli = await prisma.user.upsert({
  where: { email: 'joaopugialli@gmail.com' },
  update: {},
  create: {
    email: 'joaopugialli@gmail.com',
    nome: 'João Paulo Pugialli da Silva Souza',
    passwordHash: defaultPasswordHash,
    alunoDesde: today,
    telefone: '(21) 99719-8998',
    carreira: 'Tecnologia da Informação',
    role: 'PROFESSOR',
  },
})
console.log({ pugialli })