"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/components/auth-provider"
import { FormInput } from "@/components/form-input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useFormState } from "@/hooks/use-form-state"
import { useState } from "react"
import { updateProfessorAction } from "./actions"

interface ProfessorProfileFormProps {
  initialData?: {
    nome?: string
    email?: string
    telefone?: string
    formacao?: string
    slug?: string
    resetPassword?: boolean
  }
}

export function ProfessorProfileForm({ initialData }: ProfessorProfileFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    updateProfessorAction,
    () => router.push('/'),
  )

  const [showPasswordFields, setShowPasswordFields] = useState(false)

  return (
    <div
      className="overflow-hidden rounded-[18px] border border-border bg-white"
      style={{ boxShadow: '0 1px 0 rgba(15,23,42,0.02)' }}
    >
      {/* Header */}
      <div className="border-b border-border px-7 py-5">
        <h2
          className="font-heading text-[20px] font-extrabold tracking-tight"
          style={{ color: 'oklch(0.22 0.02 240)' }}
        >
          Editar Perfil
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: '#94a3b8' }}>
          Atualize suas informações pessoais na Nexum Academy.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro ao atualizar perfil!</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <input type="hidden" name="slug" value={initialData?.slug || user?.slug || ""} />

        <FormInput
          label="Nome Completo"
          errors={errors}
          name="nome"
          id="nome"
          type="text"
          defaultValue={initialData?.nome || user?.nome || ""}
          required
        />

        <FormInput
          label="Email"
          errors={errors}
          name="email"
          id="email"
          type="email"
          defaultValue={initialData?.email || user?.email || ""}
          required
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Telefone"
            errors={errors}
            name="telefone"
            id="telefone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
            defaultValue={initialData?.telefone || ""}
          />
          <FormInput
            label="Formação"
            errors={errors}
            name="formacao"
            id="formacao"
            type="text"
            placeholder="Ex: Mestrado em Matemática"
            defaultValue={initialData?.formacao || ""}
          />
        </div>

        {/* Alterar senha */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            role="checkbox"
            aria-checked={showPasswordFields}
            onClick={() => setShowPasswordFields((v) => !v)}
            className="flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors"
            style={
              showPasswordFields
                ? { background: 'var(--color-secondary)', borderColor: 'var(--color-secondary)' }
                : { background: 'white', borderColor: '#E2E8F0' }
            }
          >
            {showPasswordFields && (
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <label
            className="cursor-pointer text-[13px]"
            style={{ color: 'oklch(0.36 0.015 240)' }}
            onClick={() => setShowPasswordFields((v) => !v)}
          >
            Alterar senha
            {initialData?.resetPassword && (
              <span className="ml-2 font-mono text-[10.5px]" style={{ color: 'var(--color-primary)' }}>
                (obrigatório)
              </span>
            )}
          </label>
        </div>

        {showPasswordFields && (
          <>
            <FormInput
              label="Senha"
              errors={errors}
              name="password"
              id="password"
              hidable
              required={initialData?.resetPassword === true}
            />
            <FormInput
              label="Confirmar Senha"
              errors={errors}
              name="confirmPassword"
              id="confirmPassword"
              hidable
              required={initialData?.resetPassword === true}
            />
          </>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{
            background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
          }}
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : 'Salvar alterações'}
        </button>
      </form>
    </div>
  )
}
