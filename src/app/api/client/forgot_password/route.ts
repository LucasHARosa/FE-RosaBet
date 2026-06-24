import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "E-mail de recuperação enviado." });
}
