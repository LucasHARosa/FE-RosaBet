import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    _id: params.id,
    status: "PENDING",
    total_odd: 2.0,
    amount: 50.0,
    potential_gain: 100.0,
    created_at: new Date().toISOString(),
    selections: [],
  });
}
