'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/auth/client'
import { FormInput } from '@/components/form-input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export function SignInForm() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsPending(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString() ?? ''
    const password = formData.get('password')?.toString() ?? ''

    const { error: signInError } = await authClient.signIn.email({ email, password })

    setIsPending(false)

    if (signInError) {
      setError('Email ou senha incorretos.')
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader className="items-center gap-3 pb-2">
          <Image
            src="/images/horizontal_gray_orange.svg"
            alt="Nexum Academy"
            width={140}
            height={32}
            priority
          />
          <div className="text-center">
            <h2 className="text-foreground">Bem-vindo de volta</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Digite seu email e senha para entrar.
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <FormInput
            label="E-mail"
            errors={error ? { email: [' '] } : {}}
            name="email"
            id="email"
            type="email"
            placeholder="seu@email.com"
          />
          <FormInput
            label="Senha"
            errors={error ? { password: [' '] } : {}}
            name="password"
            id="password"
            hidable
            placeholder="••••••••"
          />

          {error && (
            <p className="text-xs text-destructive">{error}</p>
          )}

          <Button size="lg" type="submit" disabled={isPending} className="w-full mt-1">
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Esqueceu sua senha? Fale com seu professor.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}
