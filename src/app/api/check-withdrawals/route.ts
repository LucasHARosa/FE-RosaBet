import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const value = body.value || 0;

  if (value < 1) {
    return NextResponse.json({ message: "Valor mínimo de saque é R$1,00." }, { status: 400 });
  }
  if (value > 10000) {
    return NextResponse.json({ message: "Valor máximo de saque é R$10.000,00." }, { status: 400 });
  }

  return NextResponse.json({ approved: true, value, message: "Saque aprovado." });
}
