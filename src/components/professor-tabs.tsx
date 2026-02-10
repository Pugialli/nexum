import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function ProfessorTabs() {
  return (
    <div className="border-b py-4">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
      >
        <NavLink href={'/professor'}>Alunos</NavLink>
      </Button>
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
      >
        <NavLink href={'/professor/cadastro-aluno'}>Cadastrar Aluno</NavLink>
      </Button>
    </div>
  )
}
