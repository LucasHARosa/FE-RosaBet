import { GameContext } from "@/contexts/GameContext";
import _ from "lodash";
import { useContext, useMemo } from "react";
import { GroupLine } from "../../styles";
import { Card } from "@/components/card";

export default function FilterByChampionship({ event }: FilterByChampionshipProps) {
  const { games } = useContext(GameContext);

  const championshipList = useMemo(() => {
    const filteredGames = games.filter(
      (game) => game.championship.toLowerCase() === event.toLowerCase(),
    );
    return _.sortBy(filteredGames, "championship");
  }, [event, games]);

  return (
    <div>
      <GroupLine>
        {championshipList.map((championship, id) => (
          <Card.Line key={id} game={championship} />
        ))}
      </GroupLine>
    </div>
  );
}

interface FilterByChampionshipProps {
  event: string;
}
