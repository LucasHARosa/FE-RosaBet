import { NextRequest, NextResponse } from "next/server";
import { findUserByToken } from "@/app/api/_data/users";

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  const body = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const user = findUserByToken(token);
  if (!user) {
    return NextResponse.json({ message: "Token inválido." }, { status: 401 });
  }

  Object.assign(user, body);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _omit, ...safeUser } = user;
  return NextResponse.json(safeUser);
}
