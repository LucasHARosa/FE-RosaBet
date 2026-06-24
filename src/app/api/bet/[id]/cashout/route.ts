import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  return NextResponse.json({
    _id: params.id,
    cashout_value: body.cashout_value,
    status: "CASHED_OUT",
    message: "Cashout realizado com sucesso.",
  });
}
