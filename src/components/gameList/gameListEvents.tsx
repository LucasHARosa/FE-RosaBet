"use client";
import { GameProps } from "@/interfaces/game";
import { FaArrowRight } from "react-icons/fa6";
import { Card } from "../card";
import Text from "../common/text";
import { MoreGames, Redirect, Root } from "./styles";
interface GameListEventsProps {
  games: GameProps[];
  limit?: number;
  viewButtonMore?: boolean;
}

export default function GameListEvents({
  games,
  limit = 0,
  viewButtonMore = false,
}: GameListEventsProps) {
  if (limit && games.length > limit) {
    games = games.slice(0, limit);
  }

  return (
    <Root>
      {games && games.length > 0 ? (
        games.map((game, id) => <Card.Line key={id} game={game} />)
      ) : (
        <Text htmlTag="h1" font="label/body/m/regular">
          Não há jogos disponíveis
        </Text>
      )}
      <MoreGames view={viewButtonMore && games && games.length !== 0 && games.length >= limit}>
        <Redirect href="/pre-match">
          Ver todos os jogos
          <FaArrowRight />
        </Redirect>
      </MoreGames>
    </Root>
  );
}
