// components/professor-tabs.tsx
import { TabNav } from './tab-nav'

export function ProfessorTabs() {
  const tabs = [
    { href: '/professor', label: 'Alunos' },
    { href: '/professor/cadastro-aluno', label: 'Cadastrar Aluno' },
  ]

  return <TabNav tabs={tabs} />
}