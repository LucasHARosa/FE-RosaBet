/* eslint-disable @next/next/no-img-element */
import Text from "@/components/common/text";
import { ButtonOdd } from "@/components/oddButton";
import { GameProps } from "@/interfaces/game";
import { Card, DetailOdds, Group, Header, InfoTeam, Team, Timestamp } from "./styles";
import { Button } from "@/components/common/button";
import getImageSport from "@/utils/sports-icons";
import { useEffect, useState } from 'react';
import { getFormattedGameTime } from "@/utils/game/timestampGame";

export default function CardGrid({ game, isSelected = false }: CardBetProps) {
  const [timerGame, setTimerGame] = useState(game.played_time);

  useEffect(() => {
    if (game.is_live) {
      if (game.match_status === "Halftime") return setTimerGame("Intervalo");
  
      const interval = setInterval(() => {
        const newT = getFormattedGameTime(game);
  
        setTimerGame(newT);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [game.played_time, game.is_live, game.srLastDate, game.match_status]);

  return (
    <Card isSelected={isSelected}>
      <Header href={`/game/${game.enet_code.split(":")[2]}`}>
        <Group>
          <Button.Icon icon={getImageSport(game.__t)} size={16} color="text.dynamic.whiteDynamic.40"/>
          <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.40">
            {game.__t} | {game.country_en} | {game.championship_en}
          </Text>
        </Group>
        <Group>
          <Timestamp>
            <Text font="label/body/xs/bold" color="text.dynamic.whiteDynamic.100">{timerGame}</Text>
          </Timestamp>
          <Text font="label/body/xs/regular" color="brand.secondary.accent.textYellow">
            + {game.valid_odds}
          </Text>
        </Group>
      </Header>
      <InfoTeam href={`/game/${game.enet_code.split(":")[2]}`}>
        <Team>
          <img
            src={game.home_coats_of_arms_link}
            alt={game.home_team}
            width={20}
            height={20}
            loading="lazy"
          />
          <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
            {game.home_team}
          </Text>
          {game.is_live && (
            <Text htmlTag="small" font="label/button/xs/bold" bg="background.dynamic.whiteDynamic.8">
              {game.home_score || 0}
            </Text>
          )}
        </Team>
        {game.reduced_markets && game.reduced_markets[0].odds.length === 3 && (
          <Team>
            <Text htmlTag="h4" font="label/body/xxs/bold">
              VS
            </Text>
            <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
              Empate
            </Text>
          </Team>
        )}
        
        <Team>
          <img
            src={game.out_coats_of_arms_link}
            alt={game.out_team}
            width={20}
            height={20}
            loading="lazy"
          />
          <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
            {game.out_team}
          </Text>
          {game.is_live && (
            <Text htmlTag="small" font="label/button/xs/bold" bg="background.dynamic.whiteDynamic.8">
              {game.away_score || 0}
            </Text>
          )}
        </Team>
      </InfoTeam>
      <DetailOdds>
        {game?.reduced_markets &&
          game?.reduced_markets[0]?.odds.map((market, id) => (
            <ButtonOdd.Grid key={id} market={market} game={game} />
          ))}
      </DetailOdds>
    </Card>
  );
}

interface CardBetProps {
  game: GameProps;
  isSelected?: boolean;
}
