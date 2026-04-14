'use server'

import { createProva } from '@/http/create-prova'
import { updateProva } from '@/http/update-prova'
import { provaSchema } from '@/lib/validators/prova'
import { HTTPError } from 'ky'
import { redirect } from 'next/navigation'

export async function createProvaAction(data: FormData) {
  const raw = Object.fromEntries(data)

  const questoes = Array.from({ length: 45 }, (_, i) => ({
    numero: Number(raw[`questoes[${i}].numero`]),
    gabarito: raw[`questoes[${i}].gabarito`],
    dificuldade: Number(raw[`questoes[${i}].dificuldade`]),
    habilidadeValue: Number(raw[`questoes[${i}].habilidadeValue`]),
    assuntoValue: raw[`questoes[${i}].assuntoValue`],
  }))

  const result = provaSchema.safeParse({ ...raw, questoes })

  if (!result.success) {
    return { success: false, message: null, errors: result.error.flatten().fieldErrors }
  }

  try {
    await createProva(result.data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }
    return { success: false, message: 'Erro inesperado, tente novamente em alguns minutos', errors: null }
  }

  redirect('/professor/provas?success=created')
}

export async function updateProvaAction(data: FormData) {
  const raw = Object.fromEntries(data)
  const id = raw.id as string

  const questoes = Array.from({ length: 45 }, (_, i) => ({
    numero: Number(raw[`questoes[${i}].numero`]),
    gabarito: raw[`questoes[${i}].gabarito`],
    dificuldade: Number(raw[`questoes[${i}].dificuldade`]),
    habilidadeValue: Number(raw[`questoes[${i}].habilidadeValue`]),
    assuntoValue: raw[`questoes[${i}].assuntoValue`],
  }))

  const result = provaSchema.safeParse({ ...raw, questoes })

  if (!result.success) {
    return { success: false, message: null, errors: result.error.flatten().fieldErrors }
  }

  try {
    await updateProva(id, result.data)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()
      return { success: false, message, errors: null }
    }
    return { success: false, message: 'Erro inesperado, tente novamente em alguns minutos', errors: null }
  }

  redirect('/professor/provas?success=updated')
}