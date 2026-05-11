'use client'

import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
        window.dispatchEvent(new CustomEvent('assunto:criado', { detail: state.data }))
        onSuccess?.(state.data)
      }
      router.back()
    })

  return (
    <div
      className="overflow-hidden rounded-[18px] border border-border bg-white"
      style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
    >
      {/* Header */}
      <div className="border-b border-border px-7 py-5">
        <h2
          className="font-heading text-[20px] font-extrabold tracking-tight"
          style={{ color: 'oklch(0.22 0.02 240)' }}
        >
          Cadastrar assunto
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: '#94a3b8' }}>
          Defina o ID e o nome do novo assunto.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
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

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }} htmlFor="value">
            ID do assunto
          </label>
          <input
            name="value"
            id="value"
            placeholder="ex: AL-01"
            className="h-10 w-full rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] outline-none transition-colors focus:border-[var(--color-secondary)] placeholder:text-[#94a3b8]"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }} htmlFor="label">
            Nome
          </label>
          <input
            name="label"
            id="label"
            placeholder="ex: Álgebra Linear"
            className="h-10 w-full rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] outline-none transition-colors focus:border-[var(--color-secondary)] placeholder:text-[#94a3b8]"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{
            background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
          }}
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Salvar assunto'}
        </button>
      </form>
    </div>
  )
}
