import { prisma } from '@/lib/prisma'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),

  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        const bcrypt = await import('bcryptjs')
        return bcrypt.hash(password, 10)
      },
      verify: async ({ hash, password }) => {
        const bcrypt = await import('bcryptjs')
        return bcrypt.compare(password, hash)
      },
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: implementar envio de email (Resend, Nodemailer, etc.)
      console.log(`Enviar email de verificação para ${user.email}: ${url}`)
    },
  },

  // Campos extras do modelo User que o Better Auth deve preservar
  user: {
    additionalFields: {
      nome: { type: 'string', required: true },
      slug: { type: 'string', required: true },
      role: { type: 'string', defaultValue: 'ALUNO' },
      passwordHash: { type: 'string', required: false },
      resetPassword: { type: 'boolean', defaultValue: false },
      avatarUrl: { type: 'string', required: false },
      dataNascimento: { type: 'date', required: false },
      telefone: { type: 'string', required: false },
      carreiraValue: { type: 'string', required: false },
      idProfessor: { type: 'string', required: false },
      alunoDesde: { type: 'date', required: false },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24,     // renova se usada dentro de 1 dia do vencimento
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,            // cache do cookie por 5 minutos
    },
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user