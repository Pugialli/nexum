'use client'

import type { ProvaDetalhada } from '@/app/api/prova/[id]/get-prova'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
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
    const contagem = [1, 2, 3, 4, 5].map(
      (d) => dificuldades.filter((dif) => dif === d).length
    )
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Dados da Prova</h2>

        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="ano">Ano</FieldLabel>
            <Input name="ano" id="ano" defaultValue={prova?.ano} />
          </Field>

          <Field>
            <FieldLabel htmlFor="notaMinima">Nota Mínima</FieldLabel>
            <Input
              ref={notaMinimaRef}
              name="notaMinima"
              id="notaMinima"
              type="number"
              defaultValue={prova?.notaMinima ?? 0}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="notaMaxima">Nota Máxima</FieldLabel>
            <div className="flex gap-2 items-center">
              <Input
                id="notaMaxima"
                type="number"
                value={notaMaxima}
                disabled
                className="bg-muted"
              />
              <Button
                type="button"
                variant="outline"
                onClick={recalcularNotaMaxima}
                disabled={isRecalculating}
                title="Recalcular nota máxima"
              >
                <RotateCcw className={`size-4 ${isRecalculating ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <Field key={n}>
              <FieldLabel htmlFor={`peso${n}`}>Peso {n}</FieldLabel>
              <Input
                ref={pesosRef[n as keyof typeof pesosRef]}
                name={`peso${n}`}
                id={`peso${n}`}
                type="number"
                min={1}
                defaultValue={prova?.[`peso${n}` as keyof typeof prova] as number ?? 1}
              />
            </Field>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Questões</h2>

        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Nº</th>
                <th className="px-4 py-3 text-left font-medium">Gabarito</th>
                <th className="px-4 py-3 text-left font-medium">Dificuldade</th>
                <th className="px-4 py-3 text-left font-medium">Habilidade</th>
                <th className="px-4 py-3 text-left font-medium">Assunto</th>
              </tr>
            </thead>
            <tbody>
              {questoes.map((questao, i) => (
                <tr key={questao.numero} className="border-b last:border-0">
                  <td className="px-4 py-2">
                    <input type="hidden" name={`questoes[${i}].numero`} value={questao.numero} />
                    <span className="text-muted-foreground">{questao.numero}</span>
                  </td>

                  <td className="px-4 py-2">
                    <Select name={`questoes[${i}].gabarito`} defaultValue={questao.gabarito}>
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        {['A', 'B', 'C', 'D', 'E'].map((g) => (
                          <SelectItem key={g} value={g}>{g}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="px-4 py-2">
                    <Select
                      name={`questoes[${i}].dificuldade`}
                      defaultValue={String(questao.dificuldade)}
                      onValueChange={(val) => {
                        dificuldadesRef.current[i] = val
                      }}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="—" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((d) => (
                          <SelectItem key={d} value={String(d)}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="px-4 py-2">
                    <Select name={`questoes[${i}].habilidadeValue`} defaultValue={String(questao.habilidadeValue)}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {habilidades.map((h) => (
                          <SelectItem key={h.value} value={String(h.value)}>{h.value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>

                  <td className="px-4 py-2">
                    <Select name={`questoes[${i}].assuntoValue`} defaultValue={questao.assuntoValue}>
                      <SelectTrigger className="w-48">
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

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : prova ? (
          'Salvar alterações'
        ) : (
          'Criar prova'
        )}
      </Button>
    </form>
  )
}