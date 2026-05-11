'use client'

import type { ProvaDetalhada } from '@/app/api/prova/[id]/get-prova'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'
import type { Assunto } from '@/http/get-assuntos'
import type { Habilidade } from '@/http/get-habilidades'
import { AlertTriangle, BadgeCheck, Loader2, RotateCcw } from 'lucide-react'
import { useRef, useState } from 'react'
import { createProvaAction, updateProvaAction } from './actions'

const QUESTAO_INICIAL = 136
const TOTAL_QUESTOES = 45

interface ProvaFormProps {
  habilidades: Habilidade[]
  assuntos: Assunto[]
  prova?: ProvaDetalhada
}

export function ProvaForm({ habilidades, assuntos, prova }: ProvaFormProps) {
  const action = prova ? updateProvaAction : createProvaAction
  const [{ success, message }, handleSubmit, isPending] = useFormState(action)

  const [notaMaxima, setNotaMaxima] = useState(prova?.notaMaxima ?? 0)
  const [isRecalculating, setIsRecalculating] = useState(false)

  const notaMinimaRef = useRef<HTMLInputElement>(null)
  const pesosRef = {
    1: useRef<HTMLInputElement>(null),
    2: useRef<HTMLInputElement>(null),
    3: useRef<HTMLInputElement>(null),
    4: useRef<HTMLInputElement>(null),
    5: useRef<HTMLInputElement>(null),
  }
  const dificuldadesRef = useRef<string[]>(
    Array.from({ length: TOTAL_QUESTOES }, (_, i) => String(prova?.questoes[i]?.dificuldade ?? 1))
  )

  const recalcularNotaMaxima = () => {
    setIsRecalculating(true)
    const notaMinimaAtual = Number(notaMinimaRef.current?.value ?? 0)
    const pesosAtuais = {
      1: Number(pesosRef[1].current?.value ?? 1),
      2: Number(pesosRef[2].current?.value ?? 1),
      3: Number(pesosRef[3].current?.value ?? 1),
      4: Number(pesosRef[4].current?.value ?? 1),
      5: Number(pesosRef[5].current?.value ?? 1),
    }
    const dificuldades = dificuldadesRef.current.map(Number)
    const contagem = [1, 2, 3, 4, 5].map((d) => dificuldades.filter((dif) => dif === d).length)
    const resultado = contagem.reduce(
      (acc, qtd, i) => acc + qtd * pesosAtuais[(i + 1) as keyof typeof pesosAtuais],
      notaMinimaAtual
    )
    setNotaMaxima(resultado)
    setIsRecalculating(false)
  }

  const questoes = Array.from({ length: TOTAL_QUESTOES }, (_, i) => ({
    numero: QUESTAO_INICIAL + i,
    gabarito: prova?.questoes[i]?.gabarito ?? '',
    dificuldade: prova?.questoes[i]?.dificuldade ?? 1,
    habilidadeValue: prova?.questoes[i]?.habilidadeValue ?? '',
    assuntoValue: prova?.questoes[i]?.assuntoValue ?? '',
  }))

  const fieldCls = "h-10 w-full rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] outline-none transition-colors focus:border-[var(--color-secondary)] disabled:opacity-50 disabled:bg-[var(--page-bg)]"
  const labelCls = "font-mono text-[10.5px] uppercase tracking-[0.14em]"

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Erro ao salvar prova</AlertTitle>
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

      {prova && <input type="hidden" name="id" value={prova.id} />}

      {/* Dados da prova */}
      <div
        className="overflow-hidden rounded-[18px] border border-border bg-white"
        style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
      >
        <div className="border-b border-border px-6 py-4">
          <h2
            className="font-heading text-[16px] font-bold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            {prova ? 'Editar Prova' : 'Nova Prova'}
          </h2>
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls} style={{ color: '#94a3b8' }} htmlFor="ano">Ano</label>
              <input name="ano" id="ano" defaultValue={prova?.ano} className={fieldCls} style={{ color: 'oklch(0.22 0.02 240)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls} style={{ color: '#94a3b8' }} htmlFor="notaMinima">Nota Mínima</label>
              <input ref={notaMinimaRef} name="notaMinima" id="notaMinima" type="number" defaultValue={prova?.notaMinima ?? 0} className={fieldCls} style={{ color: 'oklch(0.22 0.02 240)' }} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls} style={{ color: '#94a3b8' }} htmlFor="notaMaxima">Nota Máxima</label>
              <div className="flex items-center gap-2">
                <input id="notaMaxima" type="number" value={notaMaxima} disabled className={fieldCls} style={{ color: '#94a3b8' }} />
                <button
                  type="button"
                  onClick={recalcularNotaMaxima}
                  disabled={isRecalculating}
                  title="Recalcular"
                  className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-white transition-colors hover:bg-[var(--page-bg)] disabled:opacity-50"
                  style={{ color: 'var(--color-secondary)' }}
                >
                  <RotateCcw size={14} className={isRecalculating ? 'animate-spin' : ''} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex flex-col gap-1.5">
                <label className={labelCls} style={{ color: '#94a3b8' }} htmlFor={`peso${n}`}>Peso {n}</label>
                <input
                  ref={pesosRef[n as keyof typeof pesosRef]}
                  name={`peso${n}`}
                  id={`peso${n}`}
                  type="number"
                  min={1}
                  defaultValue={prova?.[`peso${n}` as keyof typeof prova] as number ?? 1}
                  className={fieldCls}
                  style={{ color: 'oklch(0.22 0.02 240)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Questões */}
      <div
        className="overflow-hidden rounded-[18px] border border-border bg-white"
        style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
      >
        <div className="border-b border-border px-6 py-4">
          <h2
            className="font-heading text-[16px] font-bold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Questões
          </h2>
        </div>

        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[13px]">
          <thead>
            <tr>
              {['Nº', 'Gabarito', 'Dificuldade', 'Habilidade', 'Assunto'].map((col) => (
                <th
                  key={col}
                  className="border-b border-border px-4 py-3 text-left font-mono text-[10.5px] uppercase tracking-[0.14em]"
                  style={{
                    color: '#94a3b8',
                    background: 'linear-gradient(180deg, var(--page-bg), transparent)',
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questoes.map((questao, i) => (
              <tr key={questao.numero} className="transition-colors hover:bg-[var(--page-bg)]">
                <td className="border-b border-border px-4 py-2">
                  <input type="hidden" name={`questoes[${i}].numero`} value={questao.numero} />
                  <span className="font-mono text-[12px]" style={{ color: '#94a3b8' }}>{questao.numero}</span>
                </td>

                <td className="border-b border-border px-4 py-2">
                  <Select name={`questoes[${i}].gabarito`} defaultValue={questao.gabarito}>
                    <SelectTrigger className="h-8 w-20 rounded-[8px] text-[12px]">
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      {['A', 'B', 'C', 'D', 'E'].map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                <td className="border-b border-border px-4 py-2">
                  <Select
                    name={`questoes[${i}].dificuldade`}
                    defaultValue={String(questao.dificuldade)}
                    onValueChange={(val) => { dificuldadesRef.current[i] = val }}
                  >
                    <SelectTrigger className="h-8 w-20 rounded-[8px] text-[12px]">
                      <SelectValue placeholder="—" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((d) => (
                        <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                <td className="border-b border-border px-4 py-2">
                  <Select name={`questoes[${i}].habilidadeValue`} defaultValue={String(questao.habilidadeValue)}>
                    <SelectTrigger className="h-8 w-44 rounded-[8px] text-[12px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {habilidades.map((h) => (
                        <SelectItem key={h.value} value={String(h.value)}>{h.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                <td className="border-b border-border px-4 py-2">
                  <Select name={`questoes[${i}].assuntoValue`} defaultValue={questao.assuntoValue}>
                    <SelectTrigger className="h-8 w-56 rounded-[8px] text-[12px]">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {assuntos.map((a) => (
                        <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="flex h-10 w-full items-center justify-center gap-2 rounded-[10px] text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
        style={{
          background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
        }}
      >
        {isPending
          ? <Loader2 size={16} className="animate-spin" />
          : prova ? 'Salvar alterações' : 'Criar prova'}
      </button>
    </form>
  )
}
