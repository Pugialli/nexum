import { cn } from '@/lib/utils'
import { Label } from './ui/label'

export interface FormRadioProps {
  label: string
  name: string
  options: string[]
  value?: string
  onChange?: (value: string) => void
  errors?: Record<string, string[]> | null
  className?: string
}

export function FormRadio({
  label,
  name,
  options,
  value,
  onChange,
  errors,
  className,
}: FormRadioProps) {
  const fieldErrors = errors?.[name]

  const handleOptionClick = (option: string) => {
    if (onChange) {
      // Se clicar na opção já selecionada, desmarca
      onChange(value === option ? '' : option)
    }
  }

  return (
    <div className={cn('flex items-center justify-between rounded-lg p-3', className)}>
      <Label className="font-medium">{label}</Label>
      
      <div className="flex space-x-4">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleOptionClick(option)}
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors font-medium cursor-pointer',
              value === option
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-background hover:bg-accent hover:text-accent-foreground'
            )}
            aria-label={`Opção ${option}`}
          >
            {option}
          </button>
        ))}
        
        {/* Input hidden para enviar o valor no form */}
        <input type="hidden" name={name} value={value || ''} />
      </div>

      {fieldErrors && fieldErrors.length > 0 && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {fieldErrors[0]}
        </p>
      )}
    </div>
  )
}