'use client'

import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'

import { Field, FieldLabel } from '@/components/ui/field'
import { createAlunoAction } from './actions'

export function CreateAlunoForm() {
  const [{ success, message }, handleSubmit, isPending] =
    useFormState(createAlunoAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao salvar um novo aluno!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}
      <Input
        name="slug"
        id="slug"
        type="hidden"
      />

      <Field>
        <FieldLabel htmlFor="nome">Nome Completo</FieldLabel>
        <Input name="nome" id="nome" />
      </Field>

      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input name="email" id="email" />
      </Field>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Salvar aluno'
        )}
      </Button>
    </form>
  )
}
