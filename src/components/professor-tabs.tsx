// components/professor-tabs.tsx
import { TabNav } from './tab-nav'

export function ProfessorTabs() {
  const tabs = [
    { href: '/professor', label: 'Alunos' },
    { href: '/professor/provas', label: 'Provas' },
    { href: '/professor/assuntos', label: 'Assuntos' },
  ]

  return <TabNav tabs={tabs} />
}