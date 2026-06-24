import { NextResponse } from "next/server";

export async function PUT() {
  return NextResponse.json({ verified: true, message: "E-mail confirmado com sucesso." });
}
