import { NavLink } from './nav-link'
import { Button } from './ui/button'

export function ProfessorTabs() {
  return (
    <div>
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
