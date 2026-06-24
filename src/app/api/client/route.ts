import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/api/_data/users";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const newUser = createUser({
    name: body.name,
    email: body.email || body.username,
    username: body.username || body.email,
    cpf: body.cpf,
    password: body.password,
    phone: body.phone,
    birthDate: body.birthDate || body.birth_date,
  });

  return NextResponse.json({ token: newUser.token }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");
  const body = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  return NextResponse.json({ ...body, updated: true });
}
