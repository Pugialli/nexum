"use client";

import { useState } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CartaoRespostaPage() {
  const questions = Array.from({ length: 180 - 136 + 1 }, (_, i) => 136 + i);
  const options = ["A", "B", "C", "D", "E"];

  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(0);

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const unanswered = questions.filter((q) => !answers[q]);
    setUnansweredCount(unanswered.length);
    setIsModalOpen(true);
  };

  const getModalDescription = () => {
    if (unansweredCount === 0) {
      return "Você preencheu todas as questões e irá finalizar sua prova.";
    }
    const questionWord = unansweredCount === 1 ? "questão" : "questões";
    return `Você não preencheu ${unansweredCount} ${questionWord}. Tem certeza que deseja finalizar sua prova?`;
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-muted/40 p-4 sm:p-10">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Cartão de Resposta</CardTitle>
          <CardDescription>
            Selecione a prova e preencha suas respostas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                Lembre-se que você tem 50 minutos para responder esta prova.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              {questions.map((qNumber, index) => (
                <div
                  key={qNumber}
                  className={cn(
                    "flex items-center justify-between rounded-lg p-3",
                    index % 2 !== 0 && "bg-slate-200"
                  )}
                >
                  <div className="font-medium">{qNumber}</div>
                  <RadioGroup
                    value={answers[qNumber] || ""}
                    onValueChange={(value) => handleAnswerChange(qNumber, value)}
                    name={`question-${qNumber}`}
                    className="flex space-x-4"
                  >
                    {options.map((option) => (
                      <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option}
                          id={`q${qNumber}-${option}`}
                        />
                        <Label htmlFor={`q${qNumber}-${option}`}>{option}</Label>
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

      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Envio</AlertDialogTitle>
            <AlertDialogDescription>
              {getModalDescription()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar ao cartão-resposta</AlertDialogCancel>
            <AlertDialogAction>Finalizar prova</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
