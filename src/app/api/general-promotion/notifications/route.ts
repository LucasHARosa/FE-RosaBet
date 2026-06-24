import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      _id: "promo_001",
      title: "Bônus de Boas-Vindas 100%",
      description: "Ganhe 100% de bônus no seu primeiro depósito até R$500.",
      image: null,
      active: true,
      type: "WELCOME",
    },
    {
      _id: "promo_002",
      title: "Freebet de R$30",
      description: "Aposte grátis R$30 no futebol neste fim de semana.",
      image: null,
      active: true,
      type: "FREEBET",
    },
  ]);
}
