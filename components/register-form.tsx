"use client"

import { registerSchema } from "@/lib/validators/register"
import { signIn } from "next-auth/react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

type Errors = Partial<Record<string, string>>

export function RegisterForm() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefone: "",
    carreira: "",
  })

  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors({})

    const result = registerSchema.safeParse(form)

    if (!result.success) {
      const fieldErrors: Errors = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }

    setLoading(true)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    })

    setLoading(false)

    if (!res.ok) {
      setErrors({ email: "Erro ao criar conta" })
      return
    }

    await signIn("credentials", {
      email: result.data.email,
      password: result.data.password,
      callbackUrl: "/",
    })
  }

  function handleGoogleRegister() {
    signIn("google", {
      callbackUrl: "/complete-profile",
    })
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Criar conta</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="nome">Nome</FieldLabel>
              <Input id="nome" value={form.nome} onChange={handleChange} />
              {errors.nome && (
                <p className="text-sm text-red-500">{errors.nome}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword">
                Confirmar senha
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
              <Input
                id="telefone"
                value={form.telefone}
                onChange={handleChange}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="carreira">Carreira</FieldLabel>
              <Input
                id="carreira"
                value={form.carreira}
                onChange={handleChange}
              />
            </Field>

            <Field orientation="horizontal">
              <Button type="submit" disabled={loading}>
                {loading ? "Criando..." : "Criar conta"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleRegister}
                disabled={loading}
              >
                Registrar com Google
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
