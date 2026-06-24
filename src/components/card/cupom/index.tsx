"use client";

import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import { CardCupomProps } from "@/interfaces/cupons";

import {
  Container,
  ContainerInfo,
  Flag,
  Footer,
  Header,
  HeaderLink,
  InfoOdd,
  Odd,
  Row,
  Shields,
  Small,
} from "./styles";
import useCardCupom from "./useCupomCard";
import Loading from "./loading";
import { dateConverter } from "@/utils/data-converter";
import getImageSport from "@/utils/sports-icons";
import { Avatar, AvatarGroup } from "@mui/material";
import Icon from "@/utils/icon";
import { translateMarketAndOption } from "@/utils/mapped-market-id";
import { useMemo } from "react";

export default function CardCupom({ sport, disabled }: CardCupomProps) {
  const { OddAvailable, handleRemove, OddState, loading, isMobile, glowDown, glowUp } = useCardCupom(sport);

  const translate = useMemo(() => {
    return translateMarketAndOption(sport.market.hash, sport.home_team, sport.out_team);
  }, [sport]);

  return (
    <>
      {loading ? (
        <Loading sport={sport} disabled={disabled} />
      ) : (
        <Container>
          <HeaderLink href={`/game/${sport.enet_code.split(":")[2]}`}>
            <Header oddState={OddState()}>
              <Row>
                {OddState() !== "none" && (
                  <Flag oddState={OddState()}>
                    <Text
                      font="label/button/s/bold"
                      color={OddState() == "live" ? "brand.secondary.100" : "brand.secondary.accent.textYellow"}
                    >
                      {OddState() == "live" ? "AO VIVO" : "EM BREVE"}
                    </Text>
                  </Flag>
                )}
                <Text font="label/body/xs/semiBold" color="text.dynamic.whiteDynamic.40">
                  {dateConverter(sport?.date)}
                </Text>
              </Row>
              <Shields>
                {sport.home_team && sport.out_team && (
                  <AvatarGroup>
                    <Avatar
                      src={sport?.home_coats_of_arms_link || "https://i.imgur.com/It3GqUm.png"}
                      alt={sport?.home_team}
                    />
                    <Avatar
                      src={sport?.out_coats_of_arms_link || "https://i.imgur.com/Qb68lzP.png"}
                      alt={sport?.out_team}
                    />
                  </AvatarGroup>
                )}
                <Icon name="arrowRightIos" size={20} color="text.dynamic.whiteDynamic.40" />
              </Shields>
            </Header>
          </HeaderLink>
          <Footer>
            <ContainerInfo available={OddAvailable}>
              <Text font="label/body/xs/semiBold" color="text.dynamic.whiteDynamic.64">
                {translate.market}
              </Text>
              <InfoOdd>
                <Button.Icon icon={getImageSport(sport?.__t)} size={20} color="text.dynamic.whiteDynamic.40" />
                <Text font="label/body/xs/bold">
                  <Small isMobile={isMobile}>{translate.odd}</Small>
                </Text>
                <Odd glowDown={glowDown} glowUp={glowUp}>
                  <Text font="label/body/xs/semiBold">
                    {sport?.market?.odd}x
                  </Text>
                </Odd>
              </InfoOdd>
            </ContainerInfo>
            <Button.Root onClick={handleRemove} disabled={disabled}>
              <Icon name="trash" color="brand.secondary.100" size={20} />
            </Button.Root>
          </Footer>
        </Container>
      )}
    </>
  );
}
