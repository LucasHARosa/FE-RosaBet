import { Card, Container, GroupHome, IconTitle, Redirect, Title } from "./styles";
import IconCasino from "@/assets/images/casino/icon-casino.svg";
import IconSoccer from "@/assets/images/casino/icon-soccer.svg";
import Image from "next/image";

import Text from "@/components/common/text";
import Events from "./events";
import { Suspense } from "react";
import SectionCasino from "./casino";
import Highlights from "@/components/highlights";
import Icon from "@/utils/icon";

export default function Home() {
  return (
    <Container>
      <Title>
        <IconTitle>
          <Icon name="star" size={24} color="brand.secondary.accent.textYellow"/>
        </IconTitle>
        <Text font="heading/s/bold">Destaques</Text>
      </Title>
      
      <Highlights />

      <GroupHome>
        <Card href="/sport">
          <Text font="label/button/l/bold">ESPORTES</Text>
          <Redirect>Ir para Esportes</Redirect>
          <Image src={IconSoccer} alt="IconSoccer" />
        </Card>
        <Card href="/casino">
          <Text font="label/button/l/bold">CASSINO</Text>
          <Redirect>Ir para Cassino</Redirect>
          <Image src={IconCasino} alt="IconCasino" />
        </Card>
      </GroupHome>

      <Events />

      <Suspense>
        <SectionCasino />
      </Suspense>
    </Container>
  );
}
