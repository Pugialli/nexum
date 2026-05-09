"use client"

import type { AvailableProva } from "@/app/api/aluno/[slug]/provas-disponiveis/get-provas-disponiveis"
import { useAuth } from "@/components/auth-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useFormState } from "@/hooks/use-form-state"
import { getAvailableProvas } from "@/http/get-provas-disponiveis"
import { AlertTriangle, ChevronDown, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { submitProvaAction } from "./actions"

const OPTIONS = ["A", "B", "C", "D", "E"]
const QUESTIONS = Array.from({ length: 180 - 136 + 1 }, (_, i) => 136 + i)

export default function CartaoRespostaPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    submitProvaAction,
    () => router.push('/aluno/dashboard')
  )

  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [unansweredCount, setUnansweredCount] = useState(0)
  const [selectedProva, setSelectedProva] = useState("")
  const [provasDisponiveis, setProvasDisponiveis] = useState<AvailableProva[]>([])
  const [loadingProvas, setLoadingProvas] = useState(true)
  const [selectOpen, setSelectOpen] = useState(false)

  useEffect(() => {
    async function fetchProvas() {
      if (!user) return
      try {
        const provas = await getAvailableProvas(user.slug)
        setProvasDisponiveis(provas)
      } catch {
        // silently fail
      } finally {
        setLoadingProvas(false)
      }
    }
    fetchProvas()
  }, [user])

  const handleAnswerChange = (idQuestao: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [idQuestao]: prev[idQuestao] === value ? '' : value }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUnansweredCount(QUESTIONS.filter((q) => !answers[q]).length)
    setIsModalOpen(true)
  }

  const selectedLabel = provasDisponiveis.find((p) => p.id === selectedProva)
    ? `Prova ${provasDisponiveis.find((p) => p.id === selectedProva)!.ano}`
    : loadingProvas
    ? 'Carregando...'
    : provasDisponiveis.length === 0
    ? 'Nenhuma prova disponível'
    : 'Selecione a prova'

  return (
    <div className="mx-auto w-full max-w-[860px] px-4 py-6 sm:px-7 sm:py-8">
      {/* Card */}
      <div
        className="overflow-hidden rounded-[18px] border border-border bg-white"
        style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
      >
        {/* Card header */}
        <div className="border-b border-border px-5 py-4 sm:px-7 sm:py-5">
          <h2
            className="font-heading text-[20px] font-extrabold tracking-tight"
            style={{ color: 'oklch(0.22 0.02 240)' }}
          >
            Cartão de Resposta
          </h2>
          <p className="mt-1 text-[13px]" style={{ color: '#94a3b8' }}>
            Selecione a prova e marque suas respostas. Clique novamente para desmarcar.
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="p-4 sm:p-7">
          <div className="flex flex-col gap-6">
            {/* Error alert */}
            {success === false && message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Erro ao enviar prova!</AlertTitle>
                <AlertDescription>
                  {message}
                  {errors?.respostas && <p className="mt-1">{errors.respostas[0]}</p>}
                </AlertDescription>
              </Alert>
            )}

            {/* Prova select */}
            <div className="flex flex-col gap-1.5">
              <label
                className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
                style={{ color: '#94a3b8' }}
              >
                Prova
              </label>
              <input type="hidden" name="provaId" value={selectedProva} />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSelectOpen((v) => !v)}
                  disabled={loadingProvas || provasDisponiveis.length === 0}
                  className="flex h-10 w-full items-center justify-between rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] transition-colors disabled:opacity-50"
                  style={{
                    color: selectedProva ? 'oklch(0.22 0.02 240)' : '#94a3b8',
                    borderColor: errors?.provaId ? 'oklch(0.465 0.155 10)' : undefined,
                  }}
                >
                  {selectedLabel}
                  <ChevronDown size={14} className="shrink-0" style={{ color: '#94a3b8' }} />
                </button>

                {selectOpen && (
                  <div
                    className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-[12px] border border-border bg-white py-1"
                    style={{ boxShadow: '0 4px 24px -4px rgba(15,23,42,0.12)' }}
                  >
                    {provasDisponiveis.map((prova) => (
                      <button
                        key={prova.id}
                        type="button"
                        onClick={() => { setSelectedProva(prova.id); setSelectOpen(false) }}
                        className="flex w-full items-center px-3.5 py-2.5 text-left text-[13.5px] transition-colors hover:bg-[var(--page-bg)]"
                        style={{ color: 'oklch(0.22 0.02 240)' }}
                      >
                        Prova {prova.ano}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {errors?.provaId && (
                <p className="font-mono text-[11px]" style={{ color: 'oklch(0.465 0.155 10)' }}>
                  {errors.provaId[0]}
                </p>
              )}
            </div>

            {/* Warning */}
            <div
              className="flex items-start gap-3 rounded-[12px] border px-4 py-3"
              style={{
                background: 'oklch(0.98 0.025 85)',
                borderColor: 'oklch(0.88 0.08 85)',
              }}
            >
              <AlertTriangle size={15} className="mt-px shrink-0" style={{ color: 'oklch(0.62 0.14 60)' }} />
              <div>
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em]" style={{ color: 'oklch(0.52 0.1 60)' }}>
                  Atenção
                </p>
                <p className="mt-0.5 text-[13px]" style={{ color: 'oklch(0.42 0.08 60)' }}>
                  Você tem 135 minutos para responder esta prova.
                </p>
              </div>
            </div>

            {/* Questions */}
            <div
              className="overflow-hidden rounded-[14px] border border-border"
              style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
            >
              {/* Column headers */}
              <div
                className="grid items-center border-b border-border px-4 py-2.5"
                style={{
                  gridTemplateColumns: '56px 1fr 1fr 1fr 1fr 1fr',
                  background: 'linear-gradient(180deg, var(--page-bg), transparent)',
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>#</span>
                {OPTIONS.map((o) => (
                  <span key={o} className="text-center font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: '#94a3b8' }}>{o}</span>
                ))}
              </div>

              {QUESTIONS.map((qNumber, index) => (
                <div
                  key={qNumber}
                  className="grid items-center px-4 py-2"
                  style={{
                    gridTemplateColumns: '56px 1fr 1fr 1fr 1fr 1fr',
                    borderBottom: index < QUESTIONS.length - 1 ? '1px solid var(--border)' : undefined,
                    background: index % 2 !== 0 ? 'var(--page-bg)' : 'white',
                  }}
                >
                  <span className="font-mono text-[13px] font-semibold" style={{ color: 'oklch(0.36 0.015 240)' }}>
                    {qNumber}
                  </span>
                  {OPTIONS.map((opt) => {
                    const selected = answers[qNumber] === opt
                    return (
                      <div key={opt} className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => handleAnswerChange(qNumber, opt)}
                          className="flex h-8 w-8 items-center justify-center rounded-full font-mono text-[12px] font-semibold transition-all"
                          style={
                            selected
                              ? {
                                  background: 'var(--color-primary)',
                                  color: '#fff',
                                  boxShadow: '0 2px 8px -2px var(--color-primary)',
                                }
                              : {
                                  border: '1.5px solid oklch(0.88 0.01 240)',
                                  color: '#94a3b8',
                                  background: 'white',
                                }
                          }
                        >
                          {opt}
                        </button>
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!selectedProva || isPending}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-[10px] text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
              style={{
                background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
                boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
              }}
            >
              {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Enviar prova'}
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation dialog */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar envio</AlertDialogTitle>
              <AlertDialogDescription>
                {unansweredCount === 0
                  ? 'Você preencheu todas as questões e irá finalizar sua prova.'
                  : `Você não preencheu ${unansweredCount} ${unansweredCount === 1 ? 'questão' : 'questões'}. Tem certeza que deseja finalizar?`}
              </AlertDialogDescription>
            </AlertDialogHeader>

            <input type="hidden" name="provaId" value={selectedProva} />
            {Object.entries(answers).map(([questionNumber, answer]) => (
              <input key={questionNumber} type="hidden" name={`question-${questionNumber}`} value={answer} />
            ))}

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Voltar ao cartão</AlertDialogCancel>
              <AlertDialogAction type="submit">Finalizar prova</AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
