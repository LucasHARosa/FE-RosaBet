"use client";
import Loading from "@/components/card/loading";
import EventList from "@/components/eventList";
import { GameContext } from "@/contexts/GameContext";
import { useContext, useMemo, useState } from "react";

export default function Events() {
  const { categorySports } = useContext(GameContext);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(true);
  const [isLoadingNotLive, setIsLoadingNotLive] = useState<boolean>(true);

  const listGamesNotLive = useMemo(() => {
    if(!categorySports) {
      return [];
    };
    setIsLoadingNotLive(false);
    return categorySports?.prematch;
  }, [categorySports?.prematch]);

  const listGamesLive = useMemo(() => {
    if(!categorySports) {
      return [];
    };
    setIsLoadingLive(false);
    return categorySports?.live;
  }, [categorySports?.live]);

  return (
    <>
      <EventList
        text="Ao Vivo"
        view="column"
        href="/live"
        games={listGamesLive}
        limit={6}
        filter
        loading={isLoadingLive}
        loadingElem={<Loading count={2} />}
        isViewTemplate
      />

      <EventList
        text="Em Breve"
        view="column"
        href="/pre-match"
        limit={6}
        games={listGamesNotLive}
        filter
        loading={isLoadingNotLive}
        loadingElem={<Loading count={6} />}
        viewButtonMore
      />
    </>
  );
}
