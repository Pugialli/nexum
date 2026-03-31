'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { GetAlunosProfessor } from "@/http/get-alunos";
import { BarChart3, FileText, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface TabelaAlunosProps {
  alunos: GetAlunosProfessor[]
}

export function TabelaAlunos({ alunos }: TabelaAlunosProps) {
  const [modalAberto, setModalAberto] = useState(false)
  const [alertAberto, setAlertAberto] = useState(false)
  const [alunoSelecionado, setAlunoSelecionado] = useState<typeof alunos[0] | null>(null)
  const [provaParaDeletar, setProvaParaDeletar] = useState<{ alunoId: number, provaId: number } | null>(null)

  const abrirModalProvas = (aluno: typeof alunos[0]) => {
    setAlunoSelecionado(aluno)
    setModalAberto(true)
  }

  // const abrirConfirmacaoDeletar = (alunoId: number, provaId: number) => {
  //   setProvaParaDeletar({ alunoId, provaId })
  //   setAlertAberto(true)
  // }

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
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      title="Resetar senha"
                    >
                      <Link href={`/professor/resetar-senha/${aluno.slug}`}>
                        <RotateCcw className="size-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      title="Dashboard"
                    >
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
                      {/* {prova.concluida ? 'Concluída' : 'Não concluída'} */}
                    </p>
                  </div>
                </div>
                {/* {prova.concluida && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => abrirConfirmacaoDeletar(alunoSelecionado.id, prova.id)}
                  >
                    <Trash2 className="size-4 mr-2" />
                    Deletar
                  </Button>
                )} */}
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