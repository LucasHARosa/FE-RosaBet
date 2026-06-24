import { ButtonOdd } from "../oddButton";
import { Box, GroupOdd, Summary } from "./styles";
import Icon from "@/utils/icon";
import Text from "../common/text";
import mappers from './mappers.json';
import { getTitle, mappersNames } from "@/utils/markets";

export default function Market({ item, game, isOpen }: { item: any; game: any; isOpen: boolean }) {
  const findMarket = mappers.market_descriptions.market.filter(i => i.id === item.id.toString())[0];
  const translateMarket = findMarket.name
    .replaceAll("{$competitor1}", game.home_team)
    .replaceAll("{$competitor2}", game.out_team);

  let newTranslate = "";
  if (item.hasSpecifiers) {
    const values = item.specifiers;
    newTranslate = mappersNames(values, translateMarket);
  }
  const mappedMarket = findMarket.outcomes?.outcome;

  return (
    item.odds.length > 0 && (
      <Box open={isOpen}>
        <Summary>
          <Text font="label/body/l/bold" >
            {newTranslate || translateMarket}
          </Text>
          <div id="close">
            <Icon name="arrowDownIos" size={20} />
          </div>
          <div id="open">
            <Icon name="arrowUpIos" size={20} />
          </div>

        </Summary>
        <GroupOdd>
          {item.odds.map((odd: any, oddId: number) => (
            <ButtonOdd.Line id="odd" key={`odd-${oddId}`} title={getTitle(odd, mappedMarket, game)} market={odd} game={game} />
          ))}
        </GroupOdd>
      </Box>
    )
  );
}
