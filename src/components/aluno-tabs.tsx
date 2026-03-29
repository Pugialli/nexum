import { TabNav } from './tab-nav'

export function AlunoTabs() {
  const tabs = [
    { href: '/aluno/dashboard', label: 'Dashboard' },
    // { href: '/aluno/cartao-resposta', label: 'Cartão Resposta' },
  ]

  return <TabNav tabs={tabs} />
}
