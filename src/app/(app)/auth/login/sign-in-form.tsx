'use client'

import { AlertTriangle, Loader2, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/auth/client'
import { FormInput } from '@/components/form-input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    })

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
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite seu email e senha para acessar o Nexum Academy.
          </CardDescription>
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Falha ao logar!</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormInput
            label="E-mail"
            errors={{}}
            icon={Mail}
            name="email"
            id="email"
            type="email"
          />
          <FormInput
            label="Senha"
            errors={{}}
            icon={Lock}
            name="password"
            id="password"
            hidable
          />
          <Button size="lg" type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Esqueceu sua senha? Fale com seu professor.
          </p>
        </CardContent>
      </Card>
    </form>
  )
}