'use client'

import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/use-form-state'
import type { Assunto } from '@/http/get-assuntos'
import { createAssuntoAction } from './actions'

interface CreateAssuntoFormProps {
  onSuccess?: (assunto: Assunto) => void
}

export function CreateAssuntoForm({ onSuccess }: CreateAssuntoFormProps) {
  const router = useRouter()

  const [{ success, message }, handleSubmit, isPending] =
    useFormState(createAssuntoAction, (state) => {
      if (state.data) {
        window.dispatchEvent(
          new CustomEvent('assunto:criado', { detail: state.data })
        )
        onSuccess?.(state.data)
      }
      router.back()
    })

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Falha ao criar assunto!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <Field>
        <FieldLabel htmlFor="value">ID do assunto</FieldLabel>
        <Input name="value" id="value" placeholder="ex: AL-01" />
      </Field>

      <Field>
        <FieldLabel htmlFor="label">Nome</FieldLabel>
        <Input name="label" id="label" placeholder="ex: Álgebra Linear" />
      </Field>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Salvar assunto'}
      </Button>
    </form>
  )
}