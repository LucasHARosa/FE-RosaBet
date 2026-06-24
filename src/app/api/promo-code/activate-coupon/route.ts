import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validCodes = ["ROSABET10", "BONUS100", "FREEBET30"];

  if (validCodes.includes(body.code?.toUpperCase())) {
    return NextResponse.json({ activated: true, message: "Cupom ativado com sucesso!" });
  }

  return NextResponse.json({ message: "Cupom inválido ou expirado." }, { status: 400 });
}
