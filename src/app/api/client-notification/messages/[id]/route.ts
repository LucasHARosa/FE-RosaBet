import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    _id: params.id,
    title: "Mensagem",
    body: "Conteúdo da mensagem.",
    status: "READ",
    created_at: new Date().toISOString(),
  });
}
