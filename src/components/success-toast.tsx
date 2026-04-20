'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

export function SuccessToast({ message }: { message: string }) {
  useEffect(() => {
    toast.success(message)
  }, [message])

  return null
}