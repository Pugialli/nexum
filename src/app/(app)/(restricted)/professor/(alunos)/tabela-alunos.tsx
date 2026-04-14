'use client'

import type { ProvaSumary } from '@/app/api/prova/get-provas'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { deleteProvaAluno } from "@/http/delete-prova-aluno"
import type { GetAlunosProfessor } from "@/http/get-alunos"
import { getProvas } from "@/http/get-provas"
import { BarChart3, FileText, Loader2, RotateCcw, Trash2 } from "lucide-react"
import Link from "next/link"
import { useCallback, useState } from "react"

export interface TabelaAlunosProps {
  alunos: GetAlunosProfessor[]
}

interface ProvaComStatus extends ProvaSumary {
  vinculada: boolean   // se já existe ProvaAluno para este aluno
}

export function TabelaAlunos({ alunos }: TabelaAlunosProps) {
  const [modalAberto, setModalAberto] = useState(false)
  const [alertAberto, setAlertAberto] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState<GetAlunosProfessor | null>(null)
  const [provasModal, setProvasModal] = useState<ProvaComStatus[]>([])
  const [carregandoProvas, setCarregandoProvas] = useState(false)
  const [deletando, setDeletando] = useState(false)
  const [provaParaDeletar, setProvaParaDeletar] = useState<{
    provaId: string
    nomeProva: string
  } | null>(null)

  // Abre o modal buscando TODAS as provas do banco e marcando
  // quais já estão vinculadas ao aluno via provaAlunos
  const abrirModalProvas = useCallback(async (aluno: GetAlunosProfessor) => {
    setAlunoSelecionado(aluno)
    setModalAberto(true)
    setCarregandoProvas(true)

    try {
      const { provas: todasProvas } = await getProvas()

      // IDs das provas que o aluno já possui
      const idsVinculadas = new Set(aluno.provas.map((p) => p.id))

      const provasComStatus: ProvaComStatus[] = todasProvas.map((prova) => ({
        ...prova,
        vinculada: idsVinculadas.has(prova.id),
      }))

      setProvasModal(provasComStatus)
    } catch {
      // toast.error('Erro ao carregar provas.')
    } finally {
      setCarregandoProvas(false)
    }
  }, [])

  const abrirConfirmacaoDeletar = (provaId: string, nomeProva: string) => {
    setProvaParaDeletar({ provaId, nomeProva })
    setAlertAberto(true)
  }

  const confirmarDeletar = async () => {
    if (!provaParaDeletar || !alunoSelecionado) return

    setDeletando(true)
    try {
      await deleteProvaAluno(alunoSelecionado.slug, provaParaDeletar.provaId)

      // Atualiza o estado local do modal imediatamente
      setProvasModal((prev) =>
        prev.map((p) =>
          p.id === provaParaDeletar.provaId ? { ...p, vinculada: false } : p
        )
      )

      // toast.success('Prova removida com sucesso.')
    } catch {
      // toast.error('Erro ao remover a prova.')
    } finally {
      setDeletando(false)
      setAlertAberto(false)
      setProvaParaDeletar(null)
    }
  }

  return (
    <>
      {/* ── Tabela principal ── */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>GCP Médio</TableHead>
              <TableHead>Nº de Provas</TableHead>
              <TableHead>Data de Ingresso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alunos.map((aluno) => (
              <TableRow key={aluno.slug}>
                <TableCell className="font-medium">{aluno.nome}</TableCell>
                <TableCell>{aluno.gcpMedio}</TableCell>
                <TableCell>{aluno.provas.length}</TableCell>
                <TableCell>{aluno.dataIngresso}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild title="Resetar senha">
                      <Link href={`/professor/resetar-senha/${aluno.slug}`}>
                        <RotateCcw className="size-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild title="Dashboard">
                      <Link href={`/professor/aluno/${aluno.slug}/dashboard`}>
                        <BarChart3 className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => abrirModalProvas(aluno)}
                      title="Provas"
                    >
                      <FileText className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* ── Modal de provas ── */}
      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Provas — {alunoSelecionado?.nome}</DialogTitle>
            <DialogDescription>
              Todas as provas cadastradas. Remova o vínculo de uma prova para
              que o aluno possa refazê-la.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
            {carregandoProvas ? (
              <div className="flex items-center justify-center py-10 text-muted-foreground gap-2">
                <Loader2 className="size-5 animate-spin" />
                <span>Carregando provas...</span>
              </div>
            ) : provasModal.length === 0 ? (
              <p className="py-6 text-center text-sm text-muted-foreground">
                Nenhuma prova cadastrada.
              </p>
            ) : (
              provasModal.map((prova) => (
                <div
                  key={prova.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{prova.ano}</p>
                      <div className="mt-1">
                        <Badge variant={prova.vinculada ? 'secondary' : 'default'}>
                          {prova.vinculada ? 'Realizada' : 'Não realizada'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {prova.vinculada && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => abrirConfirmacaoDeletar(prova.id, prova.ano)}
                    >
                      <Trash2 className="size-4 mr-2" />
                      Remover
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Alert de confirmação ── */}
      <AlertDialog open={alertAberto} onOpenChange={setAlertAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover prova?</AlertDialogTitle>
            <AlertDialogDescription>
              Você está prestes a remover o vínculo de{' '}
              <strong>{provaParaDeletar?.nomeProva}</strong> para{' '}
              <strong>{alunoSelecionado?.nome}</strong>. Todas as respostas
              serão apagadas e o aluno poderá refazer a prova.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deletando}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmarDeletar}
              disabled={deletando}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletando ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Trash2 className="size-4 mr-2" />
              )}
              Confirmar remoção
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}