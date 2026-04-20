'use client'

import { useRouter } from 'next/navigation'

import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import type { Assunto } from '@/http/get-assuntos'
import { CreateAssuntoForm } from '../../cadastro-assunto/assunto-form'

interface CreateAssuntoModalProps {
  onNovoAssunto?: (assunto: Assunto) => void
}

export default function CreateAssuntoModal({ onNovoAssunto }: CreateAssuntoModalProps) {
  const router = useRouter()

  return (
    <Sheet defaultOpen onOpenChange={(open) => !open && router.back()}>
      <InterceptedSheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Criar assunto</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <CreateAssuntoForm onSuccess={onNovoAssunto} />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}