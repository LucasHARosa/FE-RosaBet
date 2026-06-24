import { GameContext } from "@/contexts/GameContext";
import _ from "lodash";
import { useContext, useMemo } from "react";
import { Paper, GroupCards, Info, CoatOfArms } from "../../styles";
import Text from "@/components/common/text";
import { TiArrowRight } from "react-icons/ti";
import getImageCountry from "@/utils/mapped-country";

export default function FilterByType({ event }: FilterByTypeProps) {
  const { games } = useContext(GameContext);

  const championshipList = useMemo(() => {
    const filteredGames = games.filter((game) => game.__t.toLowerCase() === event.toLowerCase());
    const uniqueGames = _.uniqBy(filteredGames, "country");
    return _.sortBy(uniqueGames, "country");
  }, [event, games]);

  return (
    <GroupCards>
      {championshipList.map((championship, id) => (
        <Paper key={id} href={window.location.href + `&country=${championship.country}`}>
          <Info>
            <CoatOfArms
              src={getImageCountry(championship.country)}
              alt="image"
              width={28}
              height={28}
            />
            <Text font="label/body/m/regular">{championship.country}</Text>
          </Info>
          <TiArrowRight size={22} />
        </Paper>
      ))}
    </GroupCards>
  );
}

interface FilterByTypeProps {
  event: string;
}
