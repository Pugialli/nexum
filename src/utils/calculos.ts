import type { Prova } from "@/generated"

interface CalcularNotaProps {
  prova: Prova
}

export function calcularNota({ prova }: CalcularNotaProps) {
  const nota = prova.notaMinima

  // Nota = (Nota Mínima) + [Questões => (Peso Questão * Acerto Questão)]

  return nota
}