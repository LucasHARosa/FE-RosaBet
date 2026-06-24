import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      _id: "notif_001",
      title: "Bem-vinda à RosaBet! 🌹",
      message: "Sua conta foi criada com sucesso. Aproveite 100% de bônus no seu primeiro depósito!",
      read: false,
      created_at: new Date().toISOString(),
    },
    {
      _id: "notif_002",
      title: "Aposta encerrada",
      message: "Sua aposta em Flamengo x Palmeiras foi encerrada. Você ganhou R$125,00!",
      read: true,
      created_at: "2024-06-01T12:00:00Z",
    },
  ]);
}

export async function PUT() {
  return NextResponse.json({ updated: true });
}
