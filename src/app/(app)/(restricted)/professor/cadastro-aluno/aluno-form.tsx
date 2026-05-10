'use client'

import { AlertTriangle, BadgeCheck, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useFormState } from '@/hooks/use-form-state'

import { createAlunoAction } from './actions'

export function CreateAlunoForm() {
  const router = useRouter()
  const [{ success, message }, handleSubmit, isPending] =
    useFormState(createAlunoAction, () => { router.refresh() })

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
          Cadastrar aluno
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: '#94a3b8' }}>
          Preencha os dados do novo aluno para criar o acesso.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Falha ao salvar!</AlertTitle>
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

        <input type="hidden" name="slug" id="slug" />

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }} htmlFor="nome">
            Nome Completo
          </label>
          <input
            name="nome"
            id="nome"
            className="h-10 w-full rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] outline-none transition-colors focus:border-[var(--color-secondary)]"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }} htmlFor="email">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            className="h-10 w-full rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] outline-none transition-colors focus:border-[var(--color-secondary)]"
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
          {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Salvar aluno'}
        </button>
      </form>
    </div>
  )
}
