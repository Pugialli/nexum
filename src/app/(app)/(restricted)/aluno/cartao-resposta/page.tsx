"use client"

import { useAuth } from "@/components/auth-provider"
import { FormRadio } from "@/components/form-radio"
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
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useFormState } from "@/hooks/use-form-state"
import { getAvailableProvas, type AvailableProva } from "@/http/get-provas-disponiveis"
import { cn } from "@/lib/utils"
import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { submitProvaAction } from "./actions"

export default function CartaoRespostaPage() {
  const { user } = useAuth()
  const router = useRouter()
  
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    submitProvaAction,
    () => router.push('/aluno/dashboard')
  )

  const questions = Array.from({ length: 180 - 136 + 1 }, (_, i) => 136 + i)
  const options = ["A", "B", "C", "D", "E"]

  const [answers, setAnswers] = useState<{ [key: number]: string }>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [unansweredCount, setUnansweredCount] = useState(0)
  const [selectedProva, setSelectedProva] = useState<string>("")
  const [provasDisponiveis, setProvasDisponiveis] = useState<AvailableProva[]>([])
  const [loadingProvas, setLoadingProvas] = useState(true)

  useEffect(() => {
    async function fetchProvas() {
      if (!user) return

      try {
        const provas = await getAvailableProvas(user.slug)
        setProvasDisponiveis(provas)
      } catch (error) {
        console.error('Erro ao buscar provas:', error)
      } finally {
        setLoadingProvas(false)
      }
    }

    fetchProvas()
  }, [user])

  const handleAnswerChange = (idQuestao: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [idQuestao]: value,
    }))
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const unanswered = questions.filter((q) => !answers[q])
    setUnansweredCount(unanswered.length)
    setIsModalOpen(true)
  }

  const getModalDescription = () => {
    if (unansweredCount === 0) {
      return "Você preencheu todas as questões e irá finalizar sua prova."
    }
    const questionWord = unansweredCount === 1 ? "questão" : "questões"
    return `Você não preencheu ${unansweredCount} ${questionWord}. Tem certeza que deseja finalizar sua prova?`
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-muted/40 p-4 sm:p-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Cartão de Resposta</CardTitle>
          <CardDescription>
            Selecione a prova e preencha suas respostas. Clique novamente em uma opção para desmarcá-la.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {success === false && message && (
              <Alert variant="destructive">
                <AlertTriangle className="size-4" />
                <AlertTitle>Erro ao enviar prova!</AlertTitle>
                <AlertDescription>
                  <p>{message}</p>
                  {errors?.respostas && (
                    <p className="mt-2">{errors.respostas[0]}</p>
                  )}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col gap-2">
              <Label htmlFor="prova">Prova</Label>
              {/* Input hidden para provaId - igual ao AlunoProfileForm */}
              <input type="hidden" name="provaId" value={selectedProva} />
              <Select
                value={selectedProva}
                onValueChange={setSelectedProva}
                disabled={loadingProvas || provasDisponiveis.length === 0}
              >
                <SelectTrigger
                  id="prova"
                  className={errors?.provaId ? "border-red-500" : ""}
                >
                  <SelectValue
                    placeholder={
                      loadingProvas
                        ? "Carregando..."
                        : provasDisponiveis.length === 0
                          ? "Nenhuma prova disponível"
                          : "Selecione a prova"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {provasDisponiveis.map((prova) => (
                      <SelectItem key={prova.id} value={prova.id}>
                        Prova {prova.ano}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors?.provaId && (
                <p className="text-sm text-red-500">{errors.provaId[0]}</p>
              )}
            </div>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Lembre-se que você tem 50 minutos para responder esta prova.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              {questions.map((qNumber, index) => (
                <FormRadio
                  key={qNumber}
                  label={String(qNumber)}
                  name={`question-${qNumber}`}
                  options={options}
                  value={answers[qNumber] || ''}
                  onChange={(value) => handleAnswerChange(qNumber, value)}
                  errors={errors}
                  className={cn(index % 2 !== 0 && "bg-slate-200")}
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!selectedProva || isPending}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Enviar prova"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <form onSubmit={handleSubmit}>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirmar Envio</AlertDialogTitle>
              <AlertDialogDescription>
                {getModalDescription()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            {/* Inputs hidden dentro do form do modal */}
            <input type="hidden" name="provaId" value={selectedProva} />
            {Object.entries(answers).map(([questionNumber, answer]) => (
              <input
                key={questionNumber}
                type="hidden"
                name={`question-${questionNumber}`}
                value={answer}
              />
            ))}

            <AlertDialogFooter>
              <AlertDialogCancel type="button">Voltar ao cartão-resposta</AlertDialogCancel>
              <AlertDialogAction type="submit">
                Finalizar prova
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}