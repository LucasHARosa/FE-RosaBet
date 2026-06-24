"use client";
import EventList from "@/components/eventList";
import { Container, Title } from "./styles";

import Text from "@/components/common/text";
import Highlights from "@/components/highlights";
import { useContext, useMemo, useState } from "react";
import { GameContext } from "@/contexts/GameContext";
import Loading from "@/components/card/loading";
import Icon from "@/utils/icon";

export default function Sport() {
  const { categorySports } = useContext(GameContext);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [isLoadingNotLive, setIsLoadingNotLive] = useState<boolean>(true);

  const listGamesNotLive = useMemo(() => {
    setIsLoadingNotLive(false);
    if(!categorySports) return [];
    return categorySports.prematch;
  }, [categorySports?.prematch]);

  const listGamesLive = useMemo(() => {
    setIsLoadingLive(false);
    if(!categorySports) return [];
    return categorySports.live;
  }, [categorySports?.live]);
  
  return (
    <Container>
      <Title>
        <Icon name="bookmark" size={22} color="brand.secondary.accent.textYellow" />
        <Text font="heading/s/bold">Destaques</Text>
      </Title>
      <Highlights />
      <EventList
        text="Ao Vivo"
        view="column"
        href="/live"
        limit={6}
        filter
        loading={isLoadingLive}
        loadingElem={<Loading count={2} />}
        games={listGamesLive}
      />

      <EventList
        text="Em Breve"
        view="column"
        href="/pre-match"
        limit={18}
        games={listGamesNotLive}
        filter
        loading={isLoadingNotLive}
        loadingElem={<Loading count={6} />}
        viewButtonMore
        isViewTemplate
        marginBottom
      />
    </Container>
  );
}
