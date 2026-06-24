import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      _id: "msg_001",
      title: "Bem-vinda à RosaBet!",
      body: "Aproveite 100% de bônus no primeiro depósito.",
      status: "UNREAD",
      created_at: new Date().toISOString(),
    },
    {
      _id: "msg_002",
      title: "Sua aposta foi ganha!",
      body: "Parabéns! Você ganhou R$125,00 na aposta de Flamengo.",
      status: "READ",
      created_at: "2024-06-01T12:00:00Z",
    },
  ]);
}
