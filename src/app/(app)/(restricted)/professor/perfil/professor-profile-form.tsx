"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/components/auth-provider"
import { FormInput } from "@/components/form-input"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
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
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Edite seu Perfil</CardTitle>
          <CardDescription>
            Atualize suas informações pessoais na Nexum Academy.
          </CardDescription>
          {success === false && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Erro ao atualizar perfil!</AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              placeholder="Ex: Mestrado em Matemática pela UFRJ"
              defaultValue={initialData?.formacao || ""}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="changePassword"
              checked={showPasswordFields}
              onCheckedChange={(checked) => setShowPasswordFields(checked === true)}
            />
            <Label
              htmlFor="changePassword"
              className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Alterar senha
              {initialData?.resetPassword && (
                <span className="ml-2 text-xs text-orange-600">
                  (Alteração obrigatória)
                </span>
              )}
            </Label>
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

          <Button size="lg" type="submit" disabled={isPending}>
            {isPending ? <Loader2 className="size-4 animate-spin" /> : "Salvar Alterações"}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}