import { NextRequest, NextResponse } from "next/server";
import { findUserByCPF } from "@/app/api/_data/users";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cpf } = body;

  const existingUser = findUserByCPF(cpf);

  if (existingUser) {
    return NextResponse.json(
      { message: "CPF já cadastrado." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    cpf,
    available: true,
    message: "CPF disponível para cadastro.",
  });
}
