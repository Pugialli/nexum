
export type DifficultyLabel = 'Muito fácil' | 'Fácil' | 'Médio' | 'Difícil' | 'Muito difícil'

const DIFFICULTY_MAP: Record<number, DifficultyLabel> = {
  1: 'Muito fácil',
  2: 'Fácil',
  3: 'Médio',
  4: 'Difícil',
  5: 'Muito difícil',
}

export function toDifficultyLabel(value: number): DifficultyLabel {
  return DIFFICULTY_MAP[value] ?? 'Médio'
}