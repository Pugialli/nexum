"use client";

import { AlertTriangle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Carreira {
  label: string
  value: string
}

export function CompleteProfileForm() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
    dataNascimento: "",
    telefone: "",
    carreira: "",
  });
  const [carreiras, setCarreiras] = useState<Carreira[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCarreiras, setLoadingCarreiras] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nome: user.nome || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    async function fetchCarreiras() {
      try {
        const res = await fetch("/api/domains/carreiras");

        if (!res.ok) {
          throw new Error("Erro ao buscar carreiras");
        }

        const data = await res.json();
        setCarreiras(data);
      } catch (err) {
        console.error("Erro ao carregar carreiras:", err);
        setError("Erro ao carregar as opções de carreira.");
      } finally {
        setLoadingCarreiras(false);
      }
    }

    fetchCarreiras();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, carreira: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/profile/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Erro ao completar o cadastro.");
        return;
      }

      // Redirect to home or dashboard on success
      router.push("/");
    } catch (err) {
      setError("Erro ao completar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Complete seu Cadastro</CardTitle>
          <CardDescription>
            Faltam apenas algumas informações para finalizar seu cadastro na
            Nexum Academy.
          </CardDescription>
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="size-4" />
              <AlertTitle>Erro ao completar cadastro!</AlertTitle>
              <AlertDescription>
                <p>{error}</p>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} disabled />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="dataNascimento">Data de Nascimento</Label>
              <Input
                id="dataNascimento"
                type="date"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={formData.telefone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              value={formData.password}
              onChange={handleChange}
              hidable
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              hidable
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="carreira">Carreira</Label>
            <Select
              value={formData.carreira}
              onValueChange={handleSelectChange}
              disabled={loadingCarreiras}
            >
              <SelectTrigger id="carreira">
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
          </div>

          <Button size="lg" type="submit" disabled={loading || loadingCarreiras}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Finalizar Cadastro"
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}