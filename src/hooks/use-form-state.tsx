import { type FormEvent, useState, useTransition } from 'react'

export interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null | Record<string, string[]>
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)
    startTransition(async () => {
      const state = await action(data)

      if (state.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(state)
    })

    // requestFormReset(form)
  }

  return [formState, handleSubmit, isPending] as const
}
