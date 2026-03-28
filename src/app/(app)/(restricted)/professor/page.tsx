'use client'

import { BarChart3, FileText, PlusSquare, RotateCcw, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Dados estáticos temporários
const alunosEstaticos = [
  {
    id: 1,
    nome: 'João Silva',
    gcpMedio: '89%',
    numeroProvas: 3,
    dataIngresso: '15/03/2024',
    provas: [
      { id: 1, nome: '2025.1', concluida: true },
      { id: 2, nome: '2024.1', concluida: true },
      { id: 3, nome: '2023.1', concluida: true },
    ],
  },
  {
    id: 2,
    nome: 'Maria Santos',
    gcpMedio: '92%',
    numeroProvas: 2,
    dataIngresso: '20/02/2024',
    provas: [
      { id: 1, nome: '2025.1', concluida: true },
      { id: 2, nome: '2024.1', concluida: false },
      { id: 3, nome: '2023.1', concluida: true },
    ],
  },
  {
    id: 3,
    nome: 'Pedro Oliveira',
    gcpMedio: '78%',
    numeroProvas: 1,
    dataIngresso: '05/04/2024',
    provas: [
      { id: 1, nome: '2025.1', concluida: false },
      { id: 2, nome: '2024.1', concluida: false },
      { id: 3, nome: '2023.1', concluida: true },
    ],
  },
]

export default function Home() {
  const [modalAberto, setModalAberto] = useState(false)
  const [alertAberto, setAlertAberto] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState<typeof alunosEstaticos[0] | null>(null)
  const [provaParaDeletar, setProvaParaDeletar] = useState<{ alunoId: number, provaId: number } | null>(null)

  const abrirModalProvas = (aluno: typeof alunosEstaticos[0]) => {
    setAlunoSelecionado(aluno)
    setModalAberto(true)
  }

  const abrirConfirmacaoDeletar = (alunoId: number, provaId: number) => {
    setProvaParaDeletar({ alunoId, provaId })
    setAlertAberto(true)
  }

  const confirmarDeletar = () => {
    if (provaParaDeletar) {
      console.log(`Deletar prova ${provaParaDeletar.provaId} do aluno ${provaParaDeletar.alunoId}`)
      // Aqui você implementará a lógica de deletar
    }
    setAlertAberto(false)
    setProvaParaDeletar(null)
  }

  return (
    <>
      <div className="space-y-8 p-8">
        <h1 className="text-2xl font-bold">Alunos</h1>

        <Button size="lg" asChild>
          <Link href={`/professor/cadastro-aluno`}>
            <PlusSquare className="size-6" />
            Novo aluno
          </Link>
        </Button>

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
              {alunosEstaticos.map((aluno) => (
                <TableRow key={aluno.id}>
                  <TableCell className="font-medium">{aluno.nome}</TableCell>
                  <TableCell>{aluno.gcpMedio}</TableCell>
                  <TableCell>{aluno.numeroProvas}</TableCell>
                  <TableCell>{aluno.dataIngresso}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        title="Resetar senha"
                      >
                        <Link href={`/professor/resetar-senha/${aluno.id}`}>
                          <RotateCcw className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        title="Dashboard"
                      >
                        <Link href={`/professor/dashboard/${aluno.id}`}>
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
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Provas - {alunoSelecionado?.nome}</DialogTitle>
            <DialogDescription>
              Lista de todas as provas disponíveis para este aluno
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {alunoSelecionado?.provas.map((prova) => (
              <div
                key={prova.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{prova.nome}</p>
                    <p className="text-sm text-muted-foreground">
                      {prova.concluida ? 'Concluída' : 'Não concluída'}
                    </p>
                  </div>
                </div>
                {prova.concluida && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => abrirConfirmacaoDeletar(alunoSelecionado.id, prova.id)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Deletar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={alertAberto} onOpenChange={setAlertAberto}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação é irreversível. Tem certeza que deseja deletar esta prova? 
              Todas as questões do aluno serão removidas e ele poderá fazer a prova novamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmarDeletar} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}