"use client";
import Text from "@/components/common/text";
import Image from "next/image";
import { Card, ContainerMessage, DetailEvent, DetailOdds, Header, InfoTeam, Team } from "./styles";

import { GamePromotionProps } from "@/interfaces/promotion";
import { Button } from "@/components/common/button";

export default function CardJackpot({ game, handleChangeWinner }: CardJackpotProps) {
  return (
    <Card>
      <Header>
        <DetailEvent>
          <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.40">
            {game.championship} | {game.country}
          </Text>
          <div>
            <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.40">
              {game.date}
            </Text>
          </div>
        </DetailEvent>
        {game.option_class !== undefined && (
          <ContainerMessage type={game.option_class}>
            <Text
              htmlTag="h6"
              font="label/body/m/regular"
              color={game.option_class === "main" ? "brand.secondary.100" : "brand.secondary.accent.textYellow"}
            >
              {game.option_class === "main"
                ? "Principal"
                : game.option_class === "reserve1"
                  ? "Reserva 1"
                  : "Reserva 2"}
            </Text>
          </ContainerMessage>
        )}
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
        </Team>
      </InfoTeam>

      <DetailOdds>
        {[
          { type: "home", name: "Casa" },
          { type: "draw", name: "Empate" },
          { type: "away", name: "Fora" },
        ].map(({ type, name }) => (
          <Button.Root
            key={type}
            orientation="v"
            bg={game.option_winner === type ? "brand.secondary.24" : "background.dynamic.whiteDynamic.4"}
            w="full"
            onClick={() => handleChangeWinner(game._id, type as "home" | "away" | "draw")}
          >
            <Button.Text
              htmlTag="h6"
              font="label/body/s/regular"
              color={game.option_winner === type ? "brand.secondary.100" : "text.dynamic.whiteDynamic.100"}
            >
              {name}
            </Button.Text>
          </Button.Root>
        ))}
      </DetailOdds>
    </Card>
  );
}

interface CardJackpotProps {
  game: GamePromotionProps;
  handleChangeWinner: (id: string, option_winner: "home" | "away" | "draw") => void;
}
