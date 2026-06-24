import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { enet_code: "sr:match:001:sport:001", date: new Date().toISOString() },
    { enet_code: "sr:match:002:sport:002", date: new Date().toISOString() },
  ]);
}
