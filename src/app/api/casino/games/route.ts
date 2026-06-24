import { NextRequest, NextResponse } from "next/server";
import { casinoGames } from "../_data/games";

const specialFilters: Record<string, (g: (typeof casinoGames)[0]) => boolean> = {
  HIGHLIGHTS: (g) => g.highlights,
  ON_THE_RISE: (g) => !!g.on_the_rise,
  NEWS: (g) => !!g.news,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = (searchParams.get("type") || "").toUpperCase();

  if (!type) return NextResponse.json(casinoGames);

  const specialFilter = specialFilters[type];
  const filtered = specialFilter
    ? casinoGames.filter(specialFilter)
    : casinoGames.filter((g) => g.type.toUpperCase() === type);

  return NextResponse.json(filtered);
}
