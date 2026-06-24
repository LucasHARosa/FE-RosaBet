import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { _id: "rule_001", title: "Termos e Condições", category: "legal" },
    { _id: "rule_002", title: "Política de Privacidade (LGPD)", category: "legal" },
    { _id: "rule_003", title: "Regras de Apostas", category: "betting" },
    { _id: "rule_004", title: "Regras de Bônus", category: "bonus" },
    { _id: "rule_005", title: "Jogo Responsável", category: "responsible" },
  ]);
}
