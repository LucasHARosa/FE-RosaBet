import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Senha redefinida com sucesso." });
}
