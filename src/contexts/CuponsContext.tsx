"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import _ from "lodash";
import { closeWS, createWebSocket, handleAction, onError, onMessage, onOpen } from "@/service/socket";
import { decompressString } from "@/utils/descompressed";
import { betCoupon } from "@/service/bet";
import { CuponsProps, EventsMarkets, MarketsSports, SportsCupons } from "@/interfaces/cupons";
import { GameProps, OddProps } from "@/interfaces/game";
import { UserContext } from "./UserContext";
import { GameContext } from "./GameContext";
import { StorageContext } from "./StorageContext";

export interface CuponsContextProps {
  cupons: SportsCupons[];
  addSportCupons: (sport: SportsCupons) => void;
  removeSportCupons: (sport: SportsCupons) => void;
  clearCupons: () => void;
  changeValueCupom: (value: string) => void;
  onSubmit: (better: string, accept_all_odds_change:boolean) => void;
  oddAvailable: (
    matchingOdd: OddProps,
    matchingEvent: GameProps,
    matchingEventDetail?: MarketsSports,
  ) => boolean;
  valueDisplay: string;
  testOnReceivedMessage: (event: GameProps[]) => void;
}

interface EventWebSocket {
  [key: string]: string;
}

export const CuponsContext = createContext<CuponsContextProps>({} as CuponsContextProps);

export function CuponsProvider({ children }: { children: React.ReactNode }) {
  const [betCoupons, setBetCoupons] = useState<CuponsProps>({} as CuponsProps);
  const [cupons, setCupons] = useState<SportsCupons[]>([] as SportsCupons[]);
  const [itensStorage, setItensStorage] = useState<boolean>(true);
  const [eventsMarkets, setEventsMarkets] = useState<EventsMarkets[]>([]);
  const [valueDisplay, setValueDisplay] = useState<string>("0.00");
  const [socketConecting, setSocketConecting] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);
  const { getStorage, setStorage } = useContext(StorageContext);
  const { refreshUser } = useContext(UserContext);
  const { isConnectionDown } = useContext(GameContext);

  const changeValueCupom = (value: string) => {
    setValueDisplay(value);
  };

  const clearCupons = () => {
    cupons.forEach((cupon) => removeCouponFromServer(cupon.enet_code));
    setCupons([] as SportsCupons[]);
    setBetCoupons({} as CuponsProps);
    setEventsMarkets([] as EventsMarkets[]);
    setValueDisplay("0,00");
  };

  const addSportCupons = (event: SportsCupons) => {
    if (cupons.length >= 12) {
      return;
    }
    const existMarket = _.find(cupons, { hash: event.hash });
    if (existMarket) {
      removeSportCupons(existMarket);
      return;
    }
    const existEvent = _.find(cupons, { enet_code: event.enet_code });
    if (existEvent) {
      updateOddCupon(event.enet_code, event.hash);
      return;
    }
    if(event.last_update) {
      event.last_update = "";
    }
    setCupons((prevCupons) => [...prevCupons, event]);
    addCouponToServer(event.enet_code);
  };

  const removeSportCupons = (sport: SportsCupons) => {
    setCupons((prevCupons) => _.filter(prevCupons, (item) => item.enet_code !== sport.enet_code));
    removeCouponFromServer(sport.enet_code);
  };

  const onSubmit = async (better: string, accept_all_odds_change: boolean) => {
    const updatedBetCoupons = createBet(better, accept_all_odds_change);
    try {
      await betCoupon(updatedBetCoupons);
      clearCupons();
    } catch (err: any) {
      throw err;
    } finally {
      if (refreshUser) {
        refreshUser();
      }
    }
  };

  // Funções auxiliares
  const createBet = (better: string, accept_all_odds_change: boolean) => {
    const cuponsAvailable = _.filter(cupons, { available: true });
    const numericValue = parseFloat(valueDisplay.replace(/\./g, "").replace(",", "."));
    const updatedBetCoupons: CuponsProps = {
      ...betCoupons,
      value: numericValue,
      tax_value: 0,
      source: "WEB",
      spend_from: "wallet",
      type: "SPORT",
      better: better,
      accept_all_odds_change: accept_all_odds_change,
      only_accept_high_odds_change: !accept_all_odds_change,
      mobile: false,
      sports: cuponsAvailable.map((cupon) => ({
        is_live: cupon.is_live,
        quotation: cupon.market.odd,
        oddId: cupon.hash,
        enet_code: cupon.enet_code,
        market_id: cupon.market_id,
        option_id: cupon.market.optionId,
        specifier: {},
      })),
    };
    setBetCoupons(updatedBetCoupons);
    return updatedBetCoupons;
  };

  const updateCupons = (newEvent: GameProps[]) => {
    
    if (newEvent[0].remove_event) {
      removeSportCupons({ enet_code: newEvent[0].remove_event } as SportsCupons);
      return;
    }
    setCupons((prevCupons) => {
      
      const updatedSports = _.map(prevCupons, (cupom) => {
        const matchingEvent = _.find(newEvent, { enet_code: cupom.enet_code });
        if (
          matchingEvent &&
          (!cupom.last_update || cupom.last_update !== matchingEvent.last_update)
        ) {
          const sportEvents = decompressString(matchingEvent.markets);
          addOrUpdateEventsMarkets(sportEvents, matchingEvent.enet_code);
          return createCoupon(cupom, sportEvents, matchingEvent);
        }
        else if (cupom.flag_local_storage && cupom.flag_local_storage.getTime() < new Date().getTime() - 10000) {
          removeSportCupons(cupom);
        }
        return cupom;
      });
      return updatedSports;
    });
  };

  const createCoupon = (
    cupon: SportsCupons,
    sportEvents: MarketsSports[],
    matchingEvent: GameProps,
  ) => {
    const matchingOdd = _.find(_.flatMap(sportEvents, "odds"), {
      hash: cupon.hash,
    });
    const matchingEventDetail = _.find(sportEvents, (event) =>
      _.some(event.odds, { hash: cupon.hash }),
    );

    if (matchingOdd && matchingEventDetail) {
      const available = oddAvailable(matchingOdd, matchingEvent, matchingEventDetail);
      return {
        ...cupon,
        market: matchingOdd,
        __t: matchingEvent.__t,
        last_update: matchingEvent.last_update,
        active: matchingEvent.active,
        status: matchingEvent.status,
        championship: matchingEvent.championship,
        country: matchingEvent.country,
        date: matchingEvent.date,
        home_team: matchingEvent.home_team,
        out_team: matchingEvent.out_team,
        home_coats_of_arms_link: matchingEvent.home_coats_of_arms_link,
        out_coats_of_arms_link: matchingEvent.out_coats_of_arms_link,
        is_live: matchingEvent.is_live,
        name_market: matchingEventDetail.name,
        market_id: matchingEventDetail.id.toString(),
        available: available,
        flag_local_storage: null,
      };
    }
    return cupon;
  };

  const oddAvailable = (
    matchingOdd: OddProps,
    matchingEvent: GameProps,
    matchingEventDetail?: MarketsSports,
  ) => {
    const date = new Date();
    const eventDate = new Date(matchingEvent.date);
    if (
      (matchingEvent?.status.toLocaleLowerCase() !== "live" &&
      date.getTime() > eventDate.getTime())||
      matchingOdd.active === false ||
      matchingOdd.odd === null ||
      matchingOdd.odd === undefined ||
      matchingOdd.odd < 1.04 ||
      matchingEvent.active === false ||
      (matchingEventDetail?.status &&
        ["ended", "suspended", "cancelled", "deactivated", "handedOver", "settled"].includes(
          matchingEventDetail?.status.toLowerCase(),
        )) ||
      (matchingEvent?.status &&
        ["ended", "suspended", "cancelled", "deactivated", "handedOver", "settled"].includes(
          matchingEvent?.status.toLowerCase(),
        ))
    ) {
      return false;
    }
    return true;
  };

  const addOrUpdateEventsMarkets = (event: MarketsSports[], enet_code: string) => {
    setEventsMarkets((prevEventsMarkets) => {
      const index = _.findIndex(prevEventsMarkets, { enet_code });
      if (index === -1) {
        return [...prevEventsMarkets, { enet_code, market: event }];
      }
      const newEventsMarkets = _.cloneDeep(prevEventsMarkets);
      newEventsMarkets[index].market = event;
      return newEventsMarkets;
    });
  };

  const updateOddCupon = (enet_code: string, hash: string) => {
    const event = _.find(eventsMarkets, { enet_code });
    if (event) {
      const matchingOdd = _.find(_.flatMap(event.market, "odds"), { hash });
      const matchingEventDetail = _.find(event.market, (event) => _.some(event.odds, { hash }));
      if (matchingOdd && matchingEventDetail) {
        setCupons((prevCupons) =>
          prevCupons.map((item) =>
            item.enet_code === enet_code
              ? { ...item, hash, market: matchingOdd, name_market: matchingEventDetail.name, market_id: matchingEventDetail.id.toString() }
              : item,
          ),
        );
      }
      return;
    }
    setCupons((prevCupons) =>
      prevCupons.map((item) => (item.enet_code === enet_code ? { ...item, hash } : item)),
    );
  };

  const verifyStorage = () => {
    const storageCupons = getStorage("cupons");
    if (storageCupons) {
      const updateCupons = _.map(storageCupons, (cupon) => {
        return _.assign(cupon, {last_update: "", flag_local_storage: new Date() });
      });
      setCupons(updateCupons);
      const eventWebSocket = _.map(updateCupons, (event) => {
        return { enet_code: event.enet_code };
      }) as EventWebSocket[];
      createWebSocketConnection(eventWebSocket);
    }
  };

  const addCouponToServer = (event: string) => {
    if (wsRef.current) {
      handleAction(wsRef.current, "insert", { enet_code: event });
    } else {
      setSocketConecting((prevSocketConecting) => {
        if (prevSocketConecting === false) {
          const eventWebSocket = [{ enet_code: event }];
          createWebSocketConnection(eventWebSocket);
        }
        return true;
      });
    }
  };

  const removeCouponFromServer = (event: string) => {
    if (wsRef.current) {
      handleAction(wsRef.current, "delete", { enet_code: event });
    }
    setCupons((prevCupons) => {
      if (prevCupons.length === 0) {
        closeWebSocketConnection();
      }
      return prevCupons;
    });
  };

  const createWebSocketConnection = (eventsWebSocket: EventWebSocket[]) => {
    if (wsRef.current || socketConecting) return;
    const ws = createWebSocket("events_sports_markets");
    wsRef.current = ws;
    onOpen(ws, eventsWebSocket);

    onMessage(ws, (event) => {
      const games = JSON.parse(event);
      if (games !== "[]" && games !== undefined && games !== null) {
        setSocketConecting(false);
        updateCupons(games);
      }
    });

    onError(ws, () => {
      console.error("Erro ao conectar com o servidor");
      
    });
  };

  const closeWebSocketConnection = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      clearCupons();
      closeWS(wsRef.current);
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  useEffect(() => {
    if (itensStorage !== false) {
      verifyStorage();
      setItensStorage(false);
      return;
    }
    setStorage("cupons", JSON.stringify(cupons));
  }, [cupons]);

  useEffect(() => {
    if (cupons.length !== 0 && isConnectionDown) {
      clearCupons();
    }
  }, [isConnectionDown]);

  useEffect(() => {
    return () => {
      closeWebSocketConnection();
    };
  }, []);

  return (
    <CuponsContext.Provider
      value={{
        onSubmit,
        cupons,
        addSportCupons,
        removeSportCupons,
        clearCupons,
        changeValueCupom,
        oddAvailable,
        valueDisplay,
        testOnReceivedMessage: updateCupons,
      }}
    >
      {children}
    </CuponsContext.Provider>
  );
}

export const useCupons = () => {
  return useContext(CuponsContext);
};
