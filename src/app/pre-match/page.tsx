"use client";
import Loading from "@/components/card/loading";
import EventList from "@/components/eventList";
import { GameContext } from "@/contexts/GameContext";
import { useContext, useMemo, useRef, useState } from "react";
import { Container } from "./styles";

export default function PreMatch() {
  const { categorySports } = useContext(GameContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const countRef = useRef<number>(10);

  const listGames = useMemo(() => {
    if(!categorySports) {
      return [];
    }
    setIsLoading(false);
    return categorySports.prematch;
  }, [categorySports?.prematch]);

  return (
    <Container>
      <EventList
        view="column"
        text="Em Breve"
        games={listGames}
        filter={true}
        loading={isLoading}
        loadingElem={<Loading count={10} />}
        refNumPagScroll={countRef}
        marginBottom
      />
    </Container>
  );
}
