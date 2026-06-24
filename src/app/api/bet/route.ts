import { NextRequest, NextResponse } from "next/server";

const fakeBets = [
  {
    _id: "bet_001",
    status: "WON",
    total_odd: 2.5,
    amount: 50.0,
    potential_gain: 125.0,
    created_at: "2024-06-01T10:00:00Z",
    selections: [
      {
        event: "Flamengo x Palmeiras",
        market: "Resultado Final",
        selection: "Flamengo",
        odd: 2.5,
        status: "WON",
      },
    ],
  },
  {
    _id: "bet_002",
    status: "LOST",
    total_odd: 1.8,
    amount: 30.0,
    potential_gain: 54.0,
    created_at: "2024-06-02T15:30:00Z",
    selections: [
      {
        event: "Santos x Corinthians",
        market: "Resultado Final",
        selection: "Santos",
        odd: 1.8,
        status: "LOST",
      },
    ],
  },
  {
    _id: "bet_003",
    status: "PENDING",
    total_odd: 3.2,
    amount: 20.0,
    potential_gain: 64.0,
    created_at: new Date().toISOString(),
    selections: [
      {
        event: "Brasil x Argentina",
        market: "Ambas marcam",
        selection: "Sim",
        odd: 3.2,
        status: "PENDING",
      },
    ],
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const filtered = status
    ? fakeBets.filter((b) => !status || b.status === status)
    : fakeBets;

  return NextResponse.json(filtered);
}
