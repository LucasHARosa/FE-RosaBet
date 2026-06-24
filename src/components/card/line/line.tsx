/* eslint-disable @next/next/no-img-element */
import Text from "@/components/common/text";
import { ButtonOdd } from "@/components/oddButton";
import { GameProps, OddProps, reducedMarketsProps } from "@/interfaces/game";
import { BoxSpace, Card, DetailGame, DetailInfo, DetailOdds, GroupOdd, Header, Line, SeeMore, Team } from "./styles";
import { useWindow } from "@/hooks/window";
import { dateConverter } from "@/utils/data-converter";
import getImageSport from "@/utils/sports-icons";
import { Button } from "@/components/common/button";
// import { getTitle } from "@/utils/markets";
import mappers from '../../market/mappers.json';
import { getTitle } from "@/utils/markets";
import { FaAngleRight } from "react-icons/fa";
import { getFormattedGameTime } from "@/utils/game/timestampGame";
import { useEffect, useState } from 'react';

export default function CardLine({ game }: CardBetProps) {
  const { isMobile } = useWindow();
  const detailGame = `/game/${game.enet_code.split(":")[2]}`;
  const [timerGame, setTimerGame] = useState(game.played_time);

  const getTitleMarket = (market: OddProps, game: GameProps, mk: reducedMarketsProps) => {
    const findMarket = mappers.market_descriptions.market.filter(i => i.id === mk.id.toString())[0];
    const title = getTitle(market, findMarket.outcomes?.outcome, game);
    return title;
  }

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
    <Card isMobile={isMobile}>
      <DetailInfo href={detailGame}>
        <BoxSpace>
          <DetailGame>
            <Button.Icon icon={getImageSport(game.__t)} size={16} color="text.dynamic.whiteDynamic.40"/>
            <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.40">
              {game.__t} | {game.country_en} | {game.championship_en}
            </Text>
          </DetailGame>
          <DetailGame>
            <Text htmlTag="small" font="label/body/xs/bold" color="text.dynamic.whiteDynamic.100">
              {timerGame}
            </Text>
            {!game.is_live &&
              <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.40">
                {dateConverter(game.date)}
              </Text>
            }
            <Text htmlTag="small" font="label/body/xs/regular" color="brand.secondary.accent.textYellow">
              {game.valid_odds}
            </Text>
          </DetailGame>
        </BoxSpace>
        <BoxSpace>
          <Team>
            <img
              src={game.home_coats_of_arms_link}
              alt={game.home_team}
              width={20}
              height={20}
              loading="lazy"
            />
            <Text htmlTag="small" font="label/body/s/bold">
              {game.home_team}
            </Text>
          </Team>
          {game.is_live && (
            <Text htmlTag="small" font="label/button/xs/bold" bg="background.dynamic.whiteDynamic.4">
              {game.home_score || 0}
            </Text>
          )}
        </BoxSpace>
        <BoxSpace>
          <Team>
            <img
              src={game.out_coats_of_arms_link}
              alt={game.out_team}
              width={20}
              height={20}
              loading="lazy"
            />
            <Text htmlTag="small" font="label/body/s/bold">
              {game.out_team}
            </Text>
          </Team>
          {game.is_live && (
            <Text htmlTag="small" font="label/button/xs/bold" bg="background.dynamic.whiteDynamic.4">
              {game.away_score || 0}
            </Text>
          )}
        </BoxSpace>
      </DetailInfo>
      <Line isMobile={isMobile} />
      <GroupOdd>
        <Header>
          <Text font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">Resultado</Text>
          <SeeMore href={detailGame}>
            <Text font="label/body/xs/semiBold" color="brand.secondary.100">Ver mais</Text>
            <FaAngleRight size={10} />
          </SeeMore>
        </Header>
        <DetailOdds>
          {game?.reduced_markets &&
            game?.reduced_markets[0]?.odds.map((market, id) => (
              <ButtonOdd.Line key={id} market={market} game={game} title={getTitleMarket(market, game, game.reduced_markets[0])} />
            ))}
        </DetailOdds>
      </GroupOdd>
    </Card>
  );
}

interface CardBetProps {
  game: GameProps;
}
