import { Card } from "@/components/card";
import Text from "@/components/common/text";
import { GameProps } from "@/interfaces/game";
import { FaArrowRight } from "react-icons/fa6";
import { Container, MoreGames, ViewCard } from "../styles";
import { useWindow } from "@/hooks/window";
import { Link } from "@/components/common/button";

interface EventsProps {
  games: GameProps[];
  limit?: number;
  viewButtonMore?: boolean;
  modeView: "grid" | "column";
}

export default function Events({
  games,
  limit = 0,
  viewButtonMore = false,
  modeView,
}: EventsProps) {
  const { isMobile } = useWindow();
  if (limit && games && games.length > limit) {
    games = games.slice(0, limit);
  }

  return (
    <Container>
      <ViewCard mode={modeView} isMobile={isMobile}>
        {games && games.length > 0 ? (
          modeView === "column" ? (
            games.map((game, id) => <Card.Line key={id} game={game} />)
          ) : (
            games.map((game, id) => <Card.Grid key={id} game={game} />)
          )
        ) : (
          <Text htmlTag="h1" font="label/body/m/regular">
            Não há jogos disponíveis
          </Text>
        )}
      </ViewCard>

      <MoreGames view={viewButtonMore && games && games.length !== 0 && games.length >= limit}>
        <Link.Root orientation="h" w="fit" bg="brand.primary.100" href={"/pre-match"}>
          <Link.Text htmlTag="small" font="label/body/s/regular" color="text.absolute.whiteAbsolute.100">
            Ver todos os Jogos
          </Link.Text>
          <Link.Icon icon={FaArrowRight} size={16} color="text.absolute.whiteAbsolute.100" />
        </Link.Root>
      </MoreGames>
    </Container>
  );
}
