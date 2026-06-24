import { NextResponse } from "next/server";
import { casinoGames } from "../_data/games";

const TYPES = ["highlights", "on_the_rise", "news", "slot", "roulette", "live_dealer", "bingo", "casual", "table", "scratch_card"] as const;

export async function GET() {
  const result = TYPES.map((type) => {
    let data = casinoGames;

    if (type === "highlights") data = casinoGames.filter((g) => g.highlights);
    else if (type === "on_the_rise") data = casinoGames.filter((g) => !!g.on_the_rise);
    else if (type === "news") data = casinoGames.filter((g) => !!g.news);
    else data = casinoGames.filter((g) => g.type === type);

    return { amountGames: data.length, label: type, data };
  });

  return NextResponse.json(result);
}
