import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    available: true,
    bonus_percentage: 100,
    max_bonus: 500,
    min_deposit: 20,
  });
}
