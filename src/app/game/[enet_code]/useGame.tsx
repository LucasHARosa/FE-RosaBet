import { GameProps } from "@/interfaces/game";
import { createWebSocket, onMessage, onOpen, handleAction, closeWS } from "@/service/socket";
import { decompressString } from "@/utils/descompressed";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useWindow } from "@/hooks/window";
import notifyPopup from "@/utils/toast";
import { getMappers } from "@/utils/markets";
import { Button } from "@/components/common/button";
import getImageMarket from "@/utils/markets-icons";
import { GiSoccerKick } from "react-icons/gi";
import CardYellow from "@/assets/icons/card-yellow.svg";
import CardRed from "@/assets/icons/card-red.svg";
import Image from "next/image";
import { mappersNames } from "@/utils/mapped-markets";
import { JSX } from "react/jsx-runtime";
import { getFormattedGameTime } from "@/utils/game/timestampGame";

export default function useGame(enet_code?: string) {
  const [selectedMarket, setSelectedMarket] = useState<string>("");
  const [marketsData, setMarketsData] = useState<GameProps>({} as GameProps);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [timer, setTimer] = useState<any>();
  const router = useRouter();
  const [statsList, setStatsList] = useState<{ icon: JSX.Element; text: JSX.Element; }[]>([]);
  const [timerGame, setTimerGame] = useState(marketsData.played_time);

  const { isMobile } = useWindow();
  const refObserver = useRef<MutationObserver>();
  const gameFormattedMarkets = useRef<any>(null);
  const wsRef = useRef<any>();

  useEffect(() => {
    if (marketsData.is_live) {
      if (marketsData.match_status === "Halftime") return setTimerGame("Intervalo");
  
      const interval = setInterval(() => {
        const newT = getFormattedGameTime(marketsData);
  
        setTimerGame(newT);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [marketsData.played_time, marketsData.is_live, marketsData.srLastDate, marketsData.match_status]);

  const updateStats = () => {
    const clockValue = clock();
    const yellowCards = cardsYellow();
    const redCards = cardsRed();
    const cornersCount = corners();

    setTimer(clockValue);
    setStatsList([
      { icon: <Image src={CardYellow} width={16} height={16} alt="yellow" />, text: <span>{yellowCards.home} - {yellowCards.away}</span> },
      { icon: <Image src={CardRed} width={16} height={16} alt="red" />, text: <span>{redCards.home} - {redCards.away}</span> },
      { icon: <GiSoccerKick size={18} />, text: <span>{cornersCount.home} - {cornersCount.away}</span> },
    ]);
  };

  const clock = () => {
    const clockElement = document.querySelector(".sr-lmt-plus-scb__mid");
    return clockElement?.innerHTML;
  };

  const cardsYellow = () => {
    const cardsYellowElements = document.querySelectorAll(".srm-yellow");
    return {
      home: cardsYellowElements[0]?.innerHTML || "0",
      away: cardsYellowElements[1]?.innerHTML || "0"
    };
  };

  const cardsRed = () => {
    const cardsRedElements = document.querySelectorAll(".srm-red");
    return {
      home: cardsRedElements[0]?.innerHTML || "0",
      away: cardsRedElements[1]?.innerHTML || "0"
    };
  };

  const corners = () => {
    const cornersElements = document.querySelectorAll(".sr-lmt-plus-0-hor-chart__display-value");
    return {
      home: cornersElements[0]?.innerHTML || "0",
      away: cornersElements[1]?.innerHTML || "0"
    };
  };

  useEffect(() => {
    if (!enet_code) return;
    (window as any).SIR("addWidget", ".sr-widget-1", "match.lmtPlus", {
      streamToggle: "onPitchButton",
      activeStreamToggle: "stream",
      layout: "topdown",
      scoreboard: "extended",
      scoreboardLargeJerseys: true,
      goalBannerCustomBgColor: "rgba(246,79,109,0.08)",
      matchId: enet_code,
    });

    try {
      const ws = createWebSocket("events_sports_markets");
      wsRef.current = ws;

      onOpen(ws, [{ enet_code: `sr:match:${enet_code}` }]);

      onMessage(ws, async (event) => {
        const game = JSON.parse(event);

        if (game[0].remove_event?.split(":")[2] === enet_code) {
          notifyPopup(" Evento encerrado", "info");
          closeWS(ws);
          return router.back();
        }

        const formattedGame = await processGame(game[0]);
        gameFormattedMarkets.current = formattedGame;
        setMarketsData(formattedGame);
        setIsLoading(false);
      });

      return () => {
        if (wsRef.current?.readyState === 1) {
          console.log("Encerrou a conexão");
          handleAction(ws, "delete", {
            enet_code: `sr:match:${enet_code}`,
          });
          closeWS(ws);
        }
      };
    } catch {
      console.error("Erro ao conectar com o servidor");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(marketsData.__t !== "Soccer") return;
    const observer = new MutationObserver(() => {
      updateStats();
    });
    refObserver.current = observer;

    const observeElements = () => {
      const clockElement = document.querySelector(".sr-lmt-plus-scb__mid");
      const cardsYellowElements = document.querySelectorAll(".srm-yellow");
      const cardsRedElements = document.querySelectorAll(".srm-red");
      const cornersElements = document.querySelectorAll(".sr-lmt-plus-0-hor-chart__display-value");

      if (clockElement) {
        console.log("Observing clockElement");
        observer.observe(clockElement, { childList: true, subtree: true, characterData: true });
      }
      cardsYellowElements.forEach((el, index) => {
        console.log(`Observing cardsYellowElement ${index + 1}`);
        observer.observe(el, { childList: true, subtree: true, characterData: true });
      });
      cardsRedElements.forEach((el, index) => {
        console.log(`Observing cardsRedElement ${index + 1}`);
        observer.observe(el, { childList: true, subtree: true, characterData: true });
      });
      cornersElements.forEach((el, index) => {
        console.log(`Observing cornersElement ${index + 1}`);
        observer.observe(el, { childList: true, subtree: true, characterData: true });
      });

      updateStats();
    };

    setTimeout(() => {
      observeElements();
    } , 1500);
  
    return () => observer.disconnect();
  }, []);

  const items = marketsData.markets && marketsData.markets.length > 1
    ?
    marketsData.markets.filter((item: any) => item.items.length > 0)
      .map((item: any) => (
        <Button.Root
          key={item.id}
          orientation="h"
          onClick={() => handleMarket(item.id)}
          selected={selectedMarket === item.id}
          gaph={8}
        >
          <Button.Icon icon={getImageMarket(item.id)} size={18} color={selectedMarket === item.id ? "text.absolute.whiteAbsolute.100" : "text.dynamic.whiteDynamic.100"} />
          <Button.Text htmlTag="h2" font="label/button/m/bold" color={selectedMarket === item.id ? "text.absolute.whiteAbsolute.100" : "text.dynamic.whiteDynamic.100"}>
            {mappersNames[item.id]}
          </Button.Text>
        </Button.Root>
      ))
    :
    [];

  const isMappedMarket = (marketList: number[][], market: any) => {
    return marketList.some((range: number[]) => {
      if (range.length === 1) {
        return market.id === range[0];
      } else {
        return market.id >= range[0] && market.id <= range[1];
      }
    });
  };

  const getMappedMarkets = async (markets: any[], type: string): Promise<{ id: string; items: any[] }[]> => {
    const mappers = await getMappers(type);
    if (selectedMarket === "") handleMarket(Object.keys(mappers.mappersNames)[0]);
    return Object.keys(mappers.mappersMarkets).map((key) => {
      if (key === "ALL") {
        return { id: key, items: markets.sort((a, b) => a.id - b.id) };
      }
      const marketList = mappers.mappersMarkets[key as keyof typeof mappers.mappersMarkets];
      const filteredMarkets = markets
        .filter((market) => isMappedMarket(marketList, market))
        .sort((a, b) => a.id - b.id);
      return {
        id: key,
        items: filteredMarkets,
      };
    });
  };


  const mapMarkets = (markets: any[]) => {
    const regexMatches: any = [];

    markets.forEach((market) => {
      const match = market.id;
      const detail = { ...market, odds: market.odds };

      const existingMatch = regexMatches.find((item: any) => item.id === match);
      if (existingMatch) {
        if (!existingMatch.odds) {
          existingMatch.odds = detail.odds;
        } else {
          detail.odds.forEach((odd: any) => {
            if (!existingMatch.odds.includes(odd)) {
              existingMatch.odds.push(odd);
            }
          });
        }
      } else {
        regexMatches.push(detail);
      }
    });
    return regexMatches;
  };

  const handleMarket = (optionMarket: string) => {
    setSelectedMarket(optionMarket);
  };

  const processGame = async (game: any) => {
    if (!game || !game.markets) return;
    const decompressed = decompressString(game.markets);
    const updatedMarkets = mapMarkets(decompressed);
    const reorganizedMarkets = await getMappedMarkets(updatedMarkets, game.__t);
    const formatted = { ...game, markets: reorganizedMarkets };
    return formatted;
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    if (scrollTop > 170) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const bannerGame = useMemo(() => {
    const type = marketsData.__t?.toLowerCase();
    switch (type) {
      case "soccer":
        return "https://t3.ftcdn.net/jpg/04/32/82/80/360_F_432828076_oObmCMDFy2p3s6pT3Z0AZPatmE74T817.jpg";
      case "basketball":
        return "https://www.acemetrix.com/wp-content/themes/acemetrix/images/default/default-black-banner.png";
      case "tennis":
        return "https://www.acemetrix.com/wp-content/themes/acemetrix/images/default/default-black-banner.png";
      case "mma":
        return "https://t4.ftcdn.net/jpg/06/65/10/81/360_F_665108119_Lm7mmQ7DpL0EfJMEIc5BLwcXEpxusriH.jpg";
      case "volleyball":
        return "https://www.acemetrix.com/wp-content/themes/acemetrix/images/default/default-black-banner.png";
      case "handball":
        return "https://www.shutterstock.com/image-vector/handball-sport-banner-vector-illustration-260nw-1776558863.jpg";
      case "rugby":
        return "https://www.shutterstock.com/image-vector/rugby-sport-banner-vector-illustration-260nw-1776558863.jpg";
      case "baseball":
        return "https://www.shutterstock.com/image-vector/baseball-sport-banner-vector-illustration-260nw-1776558863.jpg";
      case "beach volley":
        return "https://img.freepik.com/fotos-premium/uma-bola-de-praia-colorida-fica-na-areia-da-praia_853677-4928.jpg";
      case "futsal":
        return "https://img.freepik.com/vetores-gratis/campo-de-handebol-com-perspectiva_23-2147876474.jpg";
      default:
        return "https://t3.ftcdn.net/jpg/04/32/82/80/360_F_432828076_oObmCMDFy2p3s6pT3Z0AZPatmE74T817.jpg";
    }
  }, [marketsData.__t]);

  return {
    marketsData,
    selectedMarket,
    isLoading,
    isSticky,
    isMobile,
    items,
    bannerGame,
    timer,
    statsList,
    onScroll,
    timerGame
  };
}

