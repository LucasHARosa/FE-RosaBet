import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  return NextResponse.json({
    _id: `wdl_${Date.now()}`,
    status: "PENDING",
    amount: body.value || body.amount,
    method: "PIX",
    pix_key: body.pix_key,
    created_at: new Date().toISOString(),
    message: "Solicitação de saque realizada. Processamento em até 24h.",
  });
}
