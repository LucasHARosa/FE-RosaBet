import { NextResponse } from "next/server";

export async function PUT() {
  return NextResponse.json({ message: "Código reenviado para o seu e-mail." });
}
