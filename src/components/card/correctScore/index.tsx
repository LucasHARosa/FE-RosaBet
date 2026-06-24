import Text from "@/components/common/text";
import Image from "next/image";
import { Card, Header, InfoTeam, Team } from "./styles";
import Input from "@/components/common/input";
import useCorrectScore, { CardCorrectScoreProps } from "./useCorrectScore";

export default function CardCorrectScore({ game, handleChangeScore }: CardCorrectScoreProps) {
  const { valueHome, valueAway, handleValueAway, handleValueHome } = useCorrectScore({
    game,
    handleChangeScore,
  });
  return (
    <Card>
      <Header>
        <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.40">
          {game.championship} | {game.country}
        </Text>
        <div>
          <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.40">
            {game.date}
          </Text>
        </div>
      </Header>
      <InfoTeam>
        <Team>
          {game.home_coats_of_arms_link && (
            <Image
              src={game.home_coats_of_arms_link}
              alt={game.home_team}
              width={20}
              height={20}
              loading="lazy"
            />
          )}
          <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
            {game.home_team}
          </Text>

          <Input
            value={valueHome ? valueHome : valueHome === 0 ? 0 : ""}
            name="Placar Casa"
            type="number"
            placeholder="Casa"
            handleValue={(value) => handleValueHome(value)}
            width="100px"
            padding="5px 12px"
            height="40px"
          />
        </Team>
        <Team>
          <Text htmlTag="h4" font="label/body/m/regular">
            VS
          </Text>
        </Team>
        <Team>
          {game.out_coats_of_arms_link && (
            <Image
              src={game.out_coats_of_arms_link}
              alt={game.out_team}
              width={20}
              height={20}
              loading="lazy"
            />
          )}
          <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
            {game.out_team}
          </Text>
          <Input
            value={valueAway ? valueAway : valueAway === 0 ? 0 : ""}
            name="Placar Fora"
            type="number"
            placeholder="Fora"
            handleValue={(value) => handleValueAway(value)}
            width="100px"
            padding="5px 12px"
            height="40px"
          />
        </Team>
      </InfoTeam>
    </Card>
  );
}
