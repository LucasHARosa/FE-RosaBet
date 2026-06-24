import { CasinoType } from "@/interfaces/casino";
import { filterByType } from "../api";
import BodyCasinoFilter from "./body";

export default async function MarketPage({ params }: PageProps) {
  const type = params.filter.toLowerCase() as CasinoType;

  if (isCasinoType(type)) {
    const data = await filterByType(type);
    return <BodyCasinoFilter data={data} title={params.filter} />;
  } else {
    return <h1>Infelizmente não foi possível encontrar a página solicitada</h1>;
  }
}

function isCasinoType(type: CasinoType) {
  return [
    "highlights",
    "on_the_rise",
    "news",
    "slot",
    "bingo",
    "live_dealer",
    "casual",
    "roulette",
    "table",
    "scratch_card",
    "virtual"
  ].includes(type);
}

interface PageProps {
  params: {
    filter: string;
  };
}
