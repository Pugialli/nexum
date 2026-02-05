"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    //   const res = await fetch("/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ nome, email }),
    //   });

      setLoading(false);

    //   if (!res.ok) {
    //     const data = await res.json();
    //     setError(data.message || "Erro ao criar aluno.");
    //     return;
    //   }

    //   setSuccess(`Aluno "${nome}" criado com sucesso!`);
    //   setNome("");
    //   setEmail("");
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Cadastrar Novo Aluno</CardTitle>
          <CardDescription>
            Insira o nome e o e-mail do aluno para criar uma conta inicial.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="nome">Nome Completo</FieldLabel>
                <Input
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}

              <Field>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Cadastrando..." : "Cadastrar Aluno"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    );
  }
