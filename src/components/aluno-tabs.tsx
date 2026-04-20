import { TabNav } from './tab-nav'

export function AlunoTabs() {
  const tabs = [
    { href: '/aluno/dashboard', label: 'Dashboard' },
    { href: '/aluno/caderno-erros', label: 'Caderno de Erros' },
  ]

  return <TabNav tabs={tabs} />
}
