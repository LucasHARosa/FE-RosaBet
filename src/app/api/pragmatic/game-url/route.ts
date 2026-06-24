import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({
    gameURL: `${process.env.NEXT_PUBLIC_PRAGMATIC_BASE_URL}/gs2c/openGame.do?gameSymbol=${body.symbol}&jurisdiction=99&lang=pt&cur=BRL&lobbyUrl=${process.env.NEXT_PUBLIC_WEBSITE_URL}casino`,
  });
}
