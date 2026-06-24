import { GameContext } from "@/contexts/GameContext";
import _ from "lodash";
import { useContext, useMemo } from "react";
import { Paper, GroupCards, Info } from "../../styles";
import Text from "@/components/common/text";
import { TiArrowRight } from "react-icons/ti";
import { useSearchParams } from "next/navigation";

export default function FilterByCountry({ event }: FilterByCountryProps) {
  const { games } = useContext(GameContext);
  const searchParams = useSearchParams();

  const championshipList = useMemo(() => {
    const gameType = searchParams.get("gameType") || "soccer";

    const filteredGames = games.filter(
      (game) =>
        game.country.toLowerCase() === event.toLowerCase() &&
        game.__t.toLocaleLowerCase() === gameType.toLowerCase(),
    );
    const uniqueGames = _.uniqBy(filteredGames, "championship");
    return _.sortBy(uniqueGames, "championship");
  }, [event, games]);

  return (
    <div>
      <GroupCards>
        {championshipList.map((championship, id) => (
          <Paper
            key={id}
            href={`/search?gameType=${encodeURIComponent(championship.__t)}&country=${encodeURIComponent(championship.country)}&championship=${encodeURIComponent(championship.championship)}`}
          >
            <Info>
              {/* <Image src={} width={22} height={22} /> */}
              <Text font="label/body/m/regular">{championship.championship}</Text>
            </Info>
            <TiArrowRight size={22} />
          </Paper>
        ))}
      </GroupCards>
    </div>
  );
}

interface FilterByCountryProps {
  event: string;
}
