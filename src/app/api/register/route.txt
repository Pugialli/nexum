import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
// import { getServerSession } from "next-auth/next"
// import { handler as authOptions } from "@/app/api/auth/[...nextauth]/route"

const createUserSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Email inválido." }),
});

export async function POST(request: NextRequest) {
  // TODO: Add authentication to ensure only professors can access this.
  // const session = await getServerSession(authOptions);
  // if (session?.user?.role !== 'PROFESSOR') {
  //   return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  // }

  try {
    const body = await request.json();
    const validation = createUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const { nome, email } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Usuário com este email já existe." },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        nome,
        email,
        role: "ALUNO",
        alunoDesde: new Date(),
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Ocorreu um erro no servidor." },
      { status: 500 }
    );
  }
}
