import { prisma } from '@/lib/prisma'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const auth = betterAuth({
  trustedOrigins: [process.env.BETTER_AUTH_URL ?? 'http://localhost:9002'],

  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

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

  user: {
    fields: {
      name: 'nome',
      image: 'avatarUrl',
    },
    additionalFields: {
      slug: { type: 'string', required: true },
      role: { type: 'string', defaultValue: 'ALUNO' },
      resetPassword: { type: 'boolean', defaultValue: false },
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    // cookieCache: {
    //   enabled: true,
    //   maxAge: 60 * 5,
    // },
  },
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user