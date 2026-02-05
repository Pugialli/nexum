'use client'

import { AlertTriangle, Loader2, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { FormInput } from '@/components/form-input'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useFormState } from '@/hooks/use-form-state'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => router.push('/'),
  )

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Digite seu email e senha para acessar o Nexum Academy.
          </CardDescription>
          {success === false && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Falha ao logar!</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <FormInput
            label="E-mail"
            errors={errors}
            icon={Mail}
            name="email"
            id="email"
            type="email"
          />
          <FormInput
            label="Senha"
            errors={errors}
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
