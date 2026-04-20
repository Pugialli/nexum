import { isRedirectError } from 'next/dist/client/components/redirect-error'
import { type FormEvent, useState, useTransition } from 'react'

export interface FormState<T = unknown> {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
  data?: T
}

export function useFormState<T extends FormState>(
  action: (data: FormData) => Promise<T>,
  onSuccess?: (state: T) => Promise<void> | void,
  initialState?: T,
) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<T>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    } as T,
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      try {
        const state = await action(data)

        if (state.success === true && onSuccess) {
          await onSuccess(state)
        }

        setFormState(state)
      } catch (err) {
        if (isRedirectError(err)) throw err
        throw err
      }
    })
  }

  return [formState, handleSubmit, isPending] as const
}