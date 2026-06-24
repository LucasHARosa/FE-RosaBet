import BodyCasinoArea from "./body";
import { filterByType } from "../../api";

export default async function MarketPage({ params }: PageProps) {
  const data = await filterByType("HIGHLIGHTS");

  return <BodyCasinoArea title={params.game} data={data} />;
}

interface PageProps {
  params: {
    game: string;
  };
}
