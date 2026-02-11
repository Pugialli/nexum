"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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

  const isEditMode = mode === "edit"
  
  // Determina se os campos de senha devem ser mostrados
  const shouldShowPasswordFields = mode === "complete" || initialData?.resetPassword === true
  const isPasswordChangeDisabled = mode === "complete" || initialData?.resetPassword === true
  
  const [showPasswordFields, setShowPasswordFields] = useState(shouldShowPasswordFields)

  useEffect(() => {
    async function fetchCarreiras() {
      try {
        const res = await fetch("/api/domains/carreiras")

        if (!res.ok) {
          throw new Error("Erro ao buscar carreiras")
        }

        const data = await res.json()
        setCarreiras(data)
      } catch (err) {
        console.error("Erro ao carregar carreiras:", err)
        setCarreiraError(true)
      } finally {
        setLoadingCarreiras(false)
      }
    }

    fetchCarreiras()
  }, [])

  // Atualiza a carreira selecionada quando os dados iniciais mudarem
  useEffect(() => {
    if (initialData?.carreira) {
      setSelectedCarreira(initialData.carreira)
    }
  }, [initialData?.carreira])

  // Atualiza showPasswordFields quando shouldShowPasswordFields mudar
  useEffect(() => {
    setShowPasswordFields(shouldShowPasswordFields)
  }, [shouldShowPasswordFields])

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">
            {isEditMode ? "Edite seu Perfil" : "Complete seu Cadastro"}
          </CardTitle>
          <CardDescription>
            {isEditMode
              ? "Atualize suas informações pessoais na Nexum Academy."
              : "Faltam apenas algumas informações para finalizar seu cadastro na Nexum Academy."}
          </CardDescription>
          {success === false && message && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>
                {isEditMode ? "Erro ao atualizar perfil!" : "Erro ao completar cadastro!"}
              </AlertTitle>
              <AlertDescription>
                <p>{message}</p>
              </AlertDescription>
            </Alert>
          )}
          {carreiraError && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Erro!</AlertTitle>
              <AlertDescription>
                <p>Erro ao carregar as opções de carreira.</p>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Campo hidden para slug */}
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

          {/* Checkbox "Alterar senha" - apenas no modo edit */}
          {isEditMode && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="changePassword"
                checked={showPasswordFields}
                onCheckedChange={(checked) => setShowPasswordFields(checked === true)}
                disabled={isPasswordChangeDisabled}
              />
              <Label
                htmlFor="changePassword"
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                  isPasswordChangeDisabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                Alterar senha
                {initialData?.resetPassword && (
                  <span className="ml-2 text-xs text-orange-600">
                    (Alteração obrigatória)
                  </span>
                )}
              </Label>
            </div>
          )}

          {/* Campos de senha */}
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

          <div className="grid gap-2">
            <Label htmlFor="carreira">Carreira</Label>
            <input type="hidden" name="carreira" value={selectedCarreira} />
            <Select
              value={selectedCarreira}
              onValueChange={setSelectedCarreira}
              disabled={loadingCarreiras}
            >
              <SelectTrigger
                id="carreira"
                className={errors?.carreira ? "border-red-500" : ""}
              >
                <SelectValue
                  placeholder={
                    loadingCarreiras
                      ? "Carregando..."
                      : "Selecione sua carreira de interesse"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {carreiras.map((carreira) => (
                    <SelectItem key={carreira.value} value={carreira.value}>
                      {carreira.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors?.carreira && (
              <p className="text-sm text-red-500">{errors.carreira[0]}</p>
            )}
          </div>

          <Button
            size="lg"
            type="submit"
            disabled={isPending || loadingCarreiras}
          >
            {isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : isEditMode ? (
              "Salvar Alterações"
            ) : (
              "Finalizar Cadastro"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}