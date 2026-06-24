"use client";
import { CardCasinoProps } from "@/interfaces/casino";
import { Card } from "./styles";
import Text from "@/components/common/text";
import useCasino from "./useCasino";

export default function CardCasino({ game, type }: CardCasinoProps) {
  const { handleDragStart, handleDragEnd, handleClick } = useCasino(game);

  const getImage = () => {
    if(game.game_image) return game.game_image;
    if(game.provider === "PRAGMATIC") return `https://rosabet.prerelease-env.biz/game_pic/rec/325/${game.mobile_id}.png`
    else return `https://rosabet-assets.s3.amazonaws.com/casino/350/${game.mobile_id}.png`
  }

  return (
    <Card
      onClick={handleClick}
      image={getImage()}
      type={type}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
    >
      <Text font="paragraph/m/bold" htmlTag="h1">
        {game.name}
      </Text>
    </Card>
  );
}
