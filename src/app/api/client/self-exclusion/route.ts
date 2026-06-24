import { NextResponse } from "next/server";

export async function PUT() {
  return NextResponse.json({ applied: true, message: "Auto-exclusão solicitada com sucesso." });
}
