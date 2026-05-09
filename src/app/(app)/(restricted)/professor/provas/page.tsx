import { BadgeCheck } from 'lucide-react'

import { loggedUser } from '@/auth/auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getProvas } from '@/http/get-provas'

import { TabelaProvas } from './tabela-provas'

const messages = {
  created: 'Prova criada com sucesso',
  updated: 'Prova atualizada com sucesso',
}

interface ProvasPageProps {
  searchParams: Promise<{ success?: keyof typeof messages }>
}

export default async function Provas({ searchParams }: ProvasPageProps) {
  const user = await loggedUser()
  const { success } = await searchParams
  const { provas } = user ? await getProvas() : { provas: [] }
  const successMessage = success ? messages[success] : null

  const abertas = provas.filter((p) => p.statusProva).length
  const fechadas = provas.length - abertas

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-7 sm:py-8">
      {successMessage && (
        <Alert variant="success" className="mb-6">
          <BadgeCheck className="size-4" />
          <AlertTitle>Sucesso!</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {/* Stat cards */}
      <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Total de provas */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-primary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                Total de provas
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'var(--color-primary)' }}>
                {provas.length}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                  cadastradas
                </small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'var(--color-primary)' }}>
              <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 44 L14 36 L26 40 L38 24 L50 30 L62 14 L74 20 L74 56 L2 56 Z" fill="currentColor" fillOpacity=".1" />
              <circle cx="74" cy="20" r="3" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Provas abertas */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'var(--color-secondary)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                Provas abertas
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'var(--color-secondary)' }}>
                {abertas}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                  disponíveis
                </small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'var(--color-secondary)' }}>
              <rect x="2"  y="34" width="8" height="22" rx="2" fill="currentColor" fillOpacity=".25" />
              <rect x="14" y="26" width="8" height="30" rx="2" fill="currentColor" fillOpacity=".4" />
              <rect x="26" y="20" width="8" height="36" rx="2" fill="currentColor" fillOpacity=".55" />
              <rect x="38" y="14" width="8" height="42" rx="2" fill="currentColor" fillOpacity=".7" />
              <rect x="50" y="22" width="8" height="34" rx="2" fill="currentColor" fillOpacity=".85" />
              <rect x="62" y="10" width="8" height="46" rx="2" fill="currentColor" />
            </svg>
          </div>
        </div>

        {/* Provas fechadas */}
        <div className="relative overflow-hidden rounded-[18px] border border-border bg-white p-5">
          <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: 'oklch(0.465 0.155 10)' }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[10.5px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>
                Provas fechadas
              </p>
              <p className="font-heading text-[36px] font-extrabold leading-none tracking-tight" style={{ color: 'oklch(0.465 0.155 10)' }}>
                {fechadas}
                <small className="ml-2 font-mono text-[11px] font-semibold tracking-[0.04em]" style={{ color: '#94a3b8' }}>
                  encerradas
                </small>
              </p>
            </div>
            <svg className="shrink-0" width="76" height="56" viewBox="0 0 76 56" fill="none" style={{ color: 'oklch(0.465 0.155 10)' }}>
              <circle cx="38" cy="28" r="20" fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="6" />
              <path d="M38 8 a 20 20 0 0 1 17.32 30" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <TabelaProvas provas={provas} />
    </div>
  )
}
