"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import _ from "lodash";
import { betCoupon } from "@/service/bet";
import { CuponsProps, MarketsSports, SportsCupons } from "@/interfaces/cupons";
import { GameProps, OddProps } from "@/interfaces/game";
import { UserContext } from "./UserContext";
import { StorageContext } from "./StorageContext";

export interface CuponsContextProps {
  cupons: SportsCupons[];
  addSportCupons: (sport: SportsCupons) => void;
  removeSportCupons: (sport: SportsCupons) => void;
  clearCupons: () => void;
  changeValueCupom: (value: string) => void;
  onSubmit: (better: string, accept_all_odds_change: boolean) => void;
  oddAvailable: (
    matchingOdd: OddProps,
    matchingEvent: GameProps,
    matchingEventDetail?: MarketsSports,
  ) => boolean;
  valueDisplay: string;
  testOnReceivedMessage: (event: GameProps[]) => void;
}

export const CuponsContext = createContext<CuponsContextProps>({} as CuponsContextProps);

export function CuponsProvider({ children }: { children: React.ReactNode }) {
  const [betCoupons, setBetCoupons] = useState<CuponsProps>({} as CuponsProps);
  const [cupons, setCupons] = useState<SportsCupons[]>([] as SportsCupons[]);
  const [itensStorage, setItensStorage] = useState<boolean>(true);
  const [valueDisplay, setValueDisplay] = useState<string>("0.00");
  const { getStorage, setStorage } = useContext(StorageContext);
  const { refreshUser } = useContext(UserContext);

  const changeValueCupom = (value: string) => {
    setValueDisplay(value);
  };

  const clearCupons = () => {
    setCupons([] as SportsCupons[]);
    setBetCoupons({} as CuponsProps);
    setValueDisplay("0,00");
  };

  const addSportCupons = (event: SportsCupons) => {
    if (cupons.length >= 12) return;

    const existMarket = _.find(cupons, { hash: event.hash });
    if (existMarket) {
      removeSportCupons(existMarket);
      return;
    }

    const existEvent = _.find(cupons, { enet_code: event.enet_code });
    if (existEvent) {
      setCupons((prev) =>
        prev.map((item) =>
          item.enet_code === event.enet_code
            ? { ...item, hash: event.hash, market: event.market, market_id: event.market_id }
            : item,
        ),
      );
      return;
    }

    setCupons((prev) => [...prev, event]);
  };

  const removeSportCupons = (sport: SportsCupons) => {
    setCupons((prev) => _.filter(prev, (item) => item.enet_code !== sport.enet_code));
  };

  const onSubmit = async (better: string, accept_all_odds_change: boolean) => {
    const updatedBetCoupons = createBet(better, accept_all_odds_change);
    try {
      await betCoupon(updatedBetCoupons);
      clearCupons();
    } catch (err: any) {
      throw err;
    } finally {
      if (refreshUser) refreshUser();
    }
  };

  const createBet = (better: string, accept_all_odds_change: boolean) => {
    const cuponsAvailable = _.filter(cupons, { available: true });
    const numericValue = parseFloat(valueDisplay.replace(/\./g, "").replace(",", "."));
    const updated: CuponsProps = {
      ...betCoupons,
      value: numericValue,
      tax_value: 0,
      source: "WEB",
      spend_from: "wallet",
      type: "SPORT",
      better,
      accept_all_odds_change,
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
    setBetCoupons(updated);
    return updated;
  };

  const oddAvailable = (
    matchingOdd: OddProps,
    matchingEvent: GameProps,
    matchingEventDetail?: MarketsSports,
  ) => {
    const date = new Date();
    const eventDate = new Date(matchingEvent.date);
    if (
      (matchingEvent?.status.toLocaleLowerCase() !== "live" && date.getTime() > eventDate.getTime()) ||
      matchingOdd.active === false ||
      matchingOdd.odd === null ||
      matchingOdd.odd === undefined ||
      matchingOdd.odd < 1.04 ||
      matchingEvent.active === false ||
      (matchingEventDetail?.status &&
        ["ended", "suspended", "cancelled", "deactivated", "handedOver", "settled"].includes(
          matchingEventDetail.status.toLowerCase(),
        )) ||
      (matchingEvent?.status &&
        ["ended", "suspended", "cancelled", "deactivated", "handedOver", "settled"].includes(
          matchingEvent.status.toLowerCase(),
        ))
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (itensStorage !== false) {
      const storageCupons = getStorage("cupons");
      if (storageCupons) setCupons(storageCupons);
      setItensStorage(false);
      return;
    }
    setStorage("cupons", JSON.stringify(cupons));
  }, [cupons]);

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
        testOnReceivedMessage: () => {},
      }}
    >
      {children}
    </CuponsContext.Provider>
  );
}

export const useCupons = () => {
  return useContext(CuponsContext);
};
