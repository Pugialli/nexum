import { NavLink } from './nav-link'
import { Button } from './ui/button'

export async function AlunoTabs() {
  return (
    <div className="border-b py-4">
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
      >
        <NavLink href={'/aluno/dashboard'}>Dashboard</NavLink>
      </Button>
    </div>
  )
}
