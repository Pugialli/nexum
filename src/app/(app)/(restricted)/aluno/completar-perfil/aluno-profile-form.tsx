"use client"

import { AlertTriangle, ChevronDown, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { useAuth } from "@/components/auth-provider"
import { FormInput } from "@/components/form-input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useFormState } from "@/hooks/use-form-state"
import { updateAlunoAction } from "./actions"

interface Carreira {
  label: string
  value: string
}

interface AlunoProfileFormProps {
  mode: "complete" | "edit"
  initialData?: {
    nome?: string
    email?: string
    telefone?: string
    dataNascimento?: string
    carreira?: string
    slug?: string
    resetPassword?: boolean
  }
}

export function AlunoProfileForm({ mode, initialData }: AlunoProfileFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    updateAlunoAction,
    () => router.push('/'),
  )

  const [carreiras, setCarreiras] = useState<Carreira[]>([])
  const [loadingCarreiras, setLoadingCarreiras] = useState(true)
  const [carreiraError, setCarreiraError] = useState(false)
  const [selectedCarreira, setSelectedCarreira] = useState(initialData?.carreira || "")
  const [carreiraOpen, setCarreiraOpen] = useState(false)

  const isEditMode = mode === "edit"
  const shouldShowPasswordFields = mode === "complete" || initialData?.resetPassword === true
  const isPasswordChangeDisabled = mode === "complete" || initialData?.resetPassword === true
  const [showPasswordFields, setShowPasswordFields] = useState(shouldShowPasswordFields)

  useEffect(() => {
    async function fetchCarreiras() {
      try {
        const res = await fetch("/api/domains/carreiras")
        if (!res.ok) throw new Error()
        const data = await res.json()
        setCarreiras(data)
      } catch {
        setCarreiraError(true)
      } finally {
        setLoadingCarreiras(false)
      }
    }
    fetchCarreiras()
  }, [])

  useEffect(() => {
    if (initialData?.carreira) setSelectedCarreira(initialData.carreira)
  }, [initialData?.carreira])

  useEffect(() => {
    setShowPasswordFields(shouldShowPasswordFields)
  }, [shouldShowPasswordFields])

  const selectedCarreiraLabel = carreiras.find((c) => c.value === selectedCarreira)?.label

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
          {isEditMode ? 'Editar Perfil' : 'Complete seu Cadastro'}
        </h2>
        <p className="mt-1 text-[13px]" style={{ color: '#94a3b8' }}>
          {isEditMode
            ? 'Atualize suas informações pessoais na Nexum Academy.'
            : 'Faltam apenas algumas informações para finalizar seu cadastro.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-7">
        {success === false && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>{isEditMode ? 'Erro ao atualizar perfil!' : 'Erro ao completar cadastro!'}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}
        {carreiraError && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription>Erro ao carregar as opções de carreira.</AlertDescription>
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
            label="Data de Nascimento"
            errors={errors}
            name="dataNascimento"
            id="dataNascimento"
            type="date"
            defaultValue={initialData?.dataNascimento || ""}
            required
          />
          <FormInput
            label="Telefone"
            errors={errors}
            name="telefone"
            id="telefone"
            type="tel"
            placeholder="(XX) XXXXX-XXXX"
            defaultValue={initialData?.telefone || ""}
          />
        </div>

        {/* Carreira */}
        <div className="flex flex-col gap-1.5">
          <label
            className="font-mono text-[10.5px] uppercase tracking-[0.14em]"
            style={{ color: '#94a3b8' }}
          >
            Carreira
          </label>
          <input type="hidden" name="carreira" value={selectedCarreira} />
          <div className="relative">
            <button
              type="button"
              onClick={() => setCarreiraOpen((v) => !v)}
              disabled={loadingCarreiras}
              className="flex h-10 w-full items-center justify-between rounded-[10px] border border-border bg-white px-3.5 text-[13.5px] transition-colors disabled:opacity-50"
              style={{
                color: selectedCarreiraLabel ? 'oklch(0.22 0.02 240)' : '#94a3b8',
                borderColor: errors?.carreira ? 'oklch(0.465 0.155 10)' : undefined,
              }}
            >
              {loadingCarreiras
                ? 'Carregando...'
                : selectedCarreiraLabel || 'Selecione sua carreira de interesse'}
              <ChevronDown size={14} className="shrink-0" style={{ color: '#94a3b8' }} />
            </button>

            {carreiraOpen && (
              <div
                className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 max-h-48 overflow-y-auto rounded-[12px] border border-border bg-white py-1"
                style={{ boxShadow: '0 4px 24px -4px rgba(15,23,42,0.12)' }}
              >
                {carreiras.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => { setSelectedCarreira(c.value); setCarreiraOpen(false) }}
                    className="flex w-full items-center px-3.5 py-2.5 text-left text-[13.5px] transition-colors hover:bg-[var(--page-bg)]"
                    style={{ color: 'oklch(0.22 0.02 240)' }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors?.carreira && (
            <p className="font-mono text-[11px]" style={{ color: 'oklch(0.465 0.155 10)' }}>
              {errors.carreira[0]}
            </p>
          )}
        </div>

        {/* Alterar senha (apenas edit) */}
        {isEditMode && (
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              role="checkbox"
              aria-checked={showPasswordFields}
              onClick={() => !isPasswordChangeDisabled && setShowPasswordFields((v) => !v)}
              disabled={isPasswordChangeDisabled}
              className="flex h-4 w-4 items-center justify-center rounded-[4px] border transition-colors disabled:cursor-not-allowed disabled:opacity-50"
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
            <span className="text-[13px]" style={{ color: 'oklch(0.36 0.015 240)' }}>
              Alterar senha
              {initialData?.resetPassword && (
                <span className="ml-2 font-mono text-[10.5px]" style={{ color: 'var(--color-primary)' }}>
                  (obrigatório)
                </span>
              )}
            </span>
          </div>
        )}

        {showPasswordFields && (
          <>
            <FormInput
              label="Senha"
              errors={errors}
              name="password"
              id="password"
              hidable
              required={mode === "complete" || initialData?.resetPassword === true}
            />
            <FormInput
              label="Confirmar Senha"
              errors={errors}
              name="confirmPassword"
              id="confirmPassword"
              hidable
              required={mode === "complete" || initialData?.resetPassword === true}
            />
          </>
        )}

        <button
          type="submit"
          disabled={isPending || loadingCarreiras}
          className="flex h-10 items-center justify-center gap-2 rounded-[10px] text-[14px] font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{
            background: 'linear-gradient(180deg, var(--color-primary) 0%, oklch(0.58 0.19 35) 100%)',
            boxShadow: '0 1px 0 rgba(255,255,255,0.25) inset, 0 8px 22px -10px var(--color-primary)',
          }}
        >
          {isPending
            ? <Loader2 size={16} className="animate-spin" />
            : isEditMode ? 'Salvar alterações' : 'Finalizar cadastro'}
        </button>
      </form>
    </div>
  )
}
