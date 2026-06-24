"use client";
import Loading from "@/components/card/loading";
import EventList from "@/components/eventList";
import { GameContext } from "@/contexts/GameContext";
import _ from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Container } from "./styles";

const NUMBER_OF_GAMES_TO_FETCH = 10;

export default function GameAreaType({ params }: GameAreaTypeProps) {
  const { ref, inView } = useInView();
  const { categorySports } = useContext(GameContext);

  const [liveDisplayCount, setLiveDisplayCount] = useState<number>(NUMBER_OF_GAMES_TO_FETCH);
  const [prematchDisplayCount, setPrematchDisplayCount] =
    useState<number>(NUMBER_OF_GAMES_TO_FETCH);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const listGames = useMemo(() => {
    setIsLoading(false);
    const decodedType = decodeURIComponent(params.type);
    const filteredLiveGames = _.filter(categorySports?.live, {
      __t: decodedType,
    });
    const filteredPrematchGames = _.filter(categorySports?.prematch, {
      __t: decodedType,
    });

    return { live: filteredLiveGames, prematch: filteredPrematchGames };
  }, [categorySports, params.type]);

  useEffect(() => {
    if (inView && liveDisplayCount < listGames.live.length) {
      setLiveDisplayCount((prevCount) => prevCount + NUMBER_OF_GAMES_TO_FETCH);
    }
    if (inView && prematchDisplayCount < listGames.prematch.length) {
      setPrematchDisplayCount((prevCount) => prevCount + NUMBER_OF_GAMES_TO_FETCH);
    }
  }, [inView, listGames.live.length, listGames.prematch.length]);

  return (
    <Container>
      <EventList
        view="column"
        text="AO VIVO"
        games={listGames.live.slice(0, liveDisplayCount)}
        loading={isLoading}
        loadingElem={<Loading count={10} />}
      />
      <EventList
        view="column"
        text="Em Breve"
        filter={true}
        games={listGames.prematch.slice(0, prematchDisplayCount)}
        loading={isLoading}
        loadingElem={<Loading count={10} />}
        marginBottom
      />
      <div ref={ref} />
    </Container>
  );
}

interface GameAreaTypeProps {
  params: { type: string };
}
