import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ games: [], total: 0 });
}
