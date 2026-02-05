import { Input, type InputProps } from './ui/input'
import { Label } from './ui/label'

export interface FormInputProps extends InputProps {
  label: string
  errors?: Record<string, string[]> | null
}

export function FormInput({ label, errors, name, id, ...props }: FormInputProps) {
  const fieldName = (name || id) as string
  const fieldErrors = fieldName && errors?.[fieldName]

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-lg font-normal text-foreground">
        {label}
      </Label>
      <Input id={id} name={name} {...props} />

      {fieldErrors && fieldErrors.length > 0 && (
        <p className="text-xs font-medium text-red-500 dark:text-red-400">
          {fieldErrors[0]}
        </p>
      )}
    </div>
  )
}