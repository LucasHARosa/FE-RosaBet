import { NextRequest, NextResponse } from "next/server";
import { findUserByCredentials } from "@/app/api/_data/users";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  const user = findUserByCredentials(username, password);

  if (!user) {
    return NextResponse.json(
      { message: "Usuário ou senha inválidos." },
      { status: 401 }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _omit, ...safeUser } = user;

  return NextResponse.json({ user: safeUser });
}
