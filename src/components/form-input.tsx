import { Input, type InputProps } from './ui/input'

export interface FormInputProps extends InputProps {
  label: string
  errors?: Record<string, string[]> | null
}

export function FormInput({ label, errors, name, id, ...props }: FormInputProps) {
  const fieldName = (name || id) as string
  const fieldErrors = fieldName && errors?.[fieldName]

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
        style={{ color: '#94a3b8' }}
      >
        {label}
      </label>
      <Input id={id} name={name} {...props} />
      {fieldErrors && fieldErrors.length > 0 && (
        <p className="font-mono text-[11px]" style={{ color: 'oklch(0.465 0.155 10)' }}>
          {fieldErrors[0]}
        </p>
      )}
    </div>
  )
}
