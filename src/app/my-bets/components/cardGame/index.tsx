/* eslint-disable @next/next/no-img-element */
import Text from "@/components/common/text";
import { Sport } from "@/interfaces/sport";
import { dateConverter } from "@/utils/data-converter";
import getImageSport from "@/utils/sports-icons";
import { useMemo } from "react";
import { Bottom, Box, Container, Group, GroupTeams, InfoTeam, Line, Status, Top } from "./styles";
import { BetSettings } from "@/interfaces/bet";
import { Button } from "@/components/common/button";
import Icon from "@/utils/icon";
import { translateMarket, translateOdd } from "@/utils/mapped-market-id";

export default function CardGame({ sport, betSettings }: CardGameProps) {
  const betInfo = useMemo(() => {
    return betSettings(sport.status);
  }, [sport.status]);

  const statusIcon = useMemo(() => {
    if (sport.status === "LOST") {
      return <Icon name="error" size={18} color={betInfo.color} />;
    } else if (sport.status === "WINS") {
      return <Icon name="success" size={18} color={betInfo.color} />;
    } else if (sport.status === "CANCELLED") {
      return (
        <Text htmlTag="small" font="label/body/xs/semiBold" color="brand.primary.100" >
          Cancelado
        </Text>
      )
    }
  }, [sport]);

  const IconComponent = getImageSport(sport.sport.__t);

  return (
    <Container>
      <Top href="">
        <Line>
          {sport.sport.is_live && (
            <Text htmlTag="small" font="label/button/s/bold" color="brand.secondary.100" bg="brand.secondary.24">
              AO VIVO
            </Text>
          )}
          <GroupTeams>
            <small>{sport.sport.home_team}</small>
            <small>{sport.sport.out_team}</small>
          </GroupTeams>
        </Line>

        <Group>
          <Text htmlTag="small" font="label/body/xs/semiBold" bg="background.dynamic.whiteDynamic.8">
            {sport.quotation}x
          </Text>
          <InfoTeam>
            <img
              src={sport.sport.home_coats_of_arms_link || "https://i.imgur.com/It3GqUm.png"}
              alt="home_coats"
              width={25}
              height={25}
            />
            <img
              src={sport.sport.out_coats_of_arms_link || "https://i.imgur.com/Qb68lzP.png"}
              alt="out_coats"
              width={25}
              height={25}
            />
          </InfoTeam>
        </Group>
      </Top>
      <Bottom>
        <Box>
          <Text htmlTag="small" font="label/body/xs/semiBold" color="text.dynamic.whiteDynamic.64">
            {translateMarket(sport.market_id)}
          </Text>
          <Line>
            <Button.Icon icon={IconComponent} color="text.dynamic.whiteDynamic.40" size={21} />
            <Text htmlTag="small" font="label/body/xs/semiBold" >
              {translateOdd(sport.market_id, sport.option_id, sport.oddId, sport)}
            </Text>
          </Line>
        </Box>

        <Group>
          <Text htmlTag="small" font="label/body/xs/semiBold" color="text.dynamic.whiteDynamic.64">
            {dateConverter(sport.sport.date)}
          </Text>
          <Status bg={betInfo.bg}>{statusIcon}</Status>
        </Group>
      </Bottom>
    </Container>
  );
}

interface CardGameProps {
  sport: Sport;
  betSettings: (status: string) => BetSettings;
}
