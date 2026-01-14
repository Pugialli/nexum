"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

export default function CartaoRespostaPage() {
  const questions = Array.from({ length: 180 - 136 + 1 }, (_, i) => 136 + i);
  const options = ["A", "B", "C", "D", "E"];

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-muted/40 p-4 sm:p-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Cartão de Resposta</CardTitle>
          <CardDescription>Selecione a prova e preencha suas respostas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <Label htmlFor="prova">Prova</Label>
              <Select>
                <SelectTrigger id="prova">
                  <SelectValue placeholder="Selecione a prova" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="2017.1">Prova 2017.1</SelectItem>
                    <SelectItem value="2017.2">Prova 2017.2</SelectItem>
                    <SelectItem value="2018.1">Prova 2018.1</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Alert variant="destructive" className="bg-yellow-100/80 dark:bg-yellow-900/40 border-yellow-300/80 dark:border-yellow-800/60 text-yellow-800 dark:text-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Lembre-se que você tem 50 minutos para responder esta prova.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {questions.map((qNumber) => (
                <div key={qNumber} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="font-medium">{qNumber}</div>
                  <RadioGroup name={`question-${qNumber}`} className="flex space-x-4">
                    {options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${qNumber}-${option}`} className="peer" />
                        <Label
                          htmlFor={`q${qNumber}-${option}`}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full">
              Enviar prova
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
