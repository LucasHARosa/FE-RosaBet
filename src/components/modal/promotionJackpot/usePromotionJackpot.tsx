"use client";

import { UserContext } from "@/contexts/UserContext";
import { BetJackpotProps, Promotion, PromotionGames, SportJackpot } from "@/interfaces/promotion";
import { betJackpot } from "@/service/bet";
import { promotionJackpot } from "@/service/promotion";
import { useContext, useEffect, useImperativeHandle, useState } from "react";

export interface PromotionJackpotProps {
  promotion: Promotion;
  refreshPromotions: () => void;
  handleSuccess: () => void;
}

export default function usePromotionJackpot(
  ref: any,
  { promotion, refreshPromotions, handleSuccess }: PromotionJackpotProps,
) {
  const { getUser } = useContext(UserContext);
  const [events, setEvents] = useState<PromotionGames>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [betLoading, setBetLoading] = useState(false);
  const [bet, setBet] = useState<BetJackpotProps>({} as BetJackpotProps);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [eventsError, setEventsError] = useState<string>();

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => {
        setOpen(false);
      },
    }),
    [],
  );

  const closeModal = () => {
    setOpen(false);
  };

  const numberSports = () => {
    if (promotion.jackpot && promotion.jackpot) {
      return promotion.jackpot[0]?.sports_qty;
    } else {
      return 0;
    }
  };

  const numberSportsMain = () => {
    if (promotion.jackpot && promotion.jackpot) {
      return promotion.jackpot[0]?.return_by_sport_qty[0]?.sport_qty;
    } else {
      return 0;
    }
  };

  const numberSportsReserve = () => {
    if (numberSports() - numberSportsMain() > 0) {
      return numberSports() - numberSportsMain();
    } else {
      return 0;
    }
  };

  const createBet = (events: PromotionGames) => {
    if (promotion.jackpot) {
      const DataSports = events?.jackpots.map((event) => {
        let priority;
        if (event.option_class === "reserve1" || event.option_class === "reserve2") {
          priority = {
            category: "SUBSTITUTE",
            position: event.option_class === "reserve1" ? 1 : 2,
          };
        } else if (event.option_class === "main") {
          priority = {
            category: "MAIN",
          };
        }
        return {
          away: event.out_team,
          championship: event.championship,
          choice: event.option_winner as "home" | "away" | "draw",
          country: event.country,
          event: event._id,
          home: event.home_team,
          type: event.__t,
          priority: priority,
        } as SportJackpot;
      });
      const DataBet = {
        better: getUser.name,
        events: DataSports,
        free_bet: true,
        lat: 0,
        lng: 0,
        source: "WEB",
        spend_from: "bonus",
        tax_value: 0,
        type: "JACKPOT",
        value: 0,
      } as BetJackpotProps;
      setBet(DataBet);
    }
  };

  const handleChangeWinner = (_id: string, option_winner: "home" | "away" | "draw") => {
    setEvents((prev) => {
      if (!prev) return;

      const newJackpots = prev.jackpots.map((event) => {
        if (event._id === _id) {
          const numberSportsChosen = prev.jackpots.filter((sport) => sport.option_winner).length;

          let option_class: "main" | "reserve1" | "reserve2" = "main";
          if (numberSportsChosen === numberSportsMain() && numberSportsReserve() > 0) {
            option_class = "reserve1";
          } else if (numberSportsChosen === numberSportsMain() + 1 && numberSportsReserve() > 1) {
            option_class = "reserve2";
          } else if (numberSportsChosen < numberSportsMain()) {
            option_class = "main";
          }

          return {
            ...event,
            option_winner,
            option_class: event.option_class === undefined ? option_class : event.option_class,
          };
        }
        return event;
      });
      createBet({ ...prev, jackpots: newJackpots });

      return { ...prev, jackpots: newJackpots };
    });
  };

  const eventsJackpot = async () => {
    if (promotion.jackpot && promotion.jackpot?.length > 0) {
      setLoading(true);
      try {
        setEventsError("");
        const response = await promotionJackpot();
        setEvents(response);
      } catch (err) {
        setEventsError("Não foi possível carregar as partidas, tente mais tarde");
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = async () => {
    try {
      setBetLoading(true);
      setErrorMessage("");
      await betJackpot(bet);
      handleSuccess();
      refreshPromotions();
      closeModal();
    } catch (err) {
      setErrorMessage("Não foi possível reaalizar a aposta, tente mais tarde");
    } finally {
      setBetLoading(false);
    }
  };

  const buttonSendDisable = () => {
    if (bet.events) {
      return bet.events.some((sport) => {
        return sport.choice === undefined;
      });
    }
    return true;
  };

  useEffect(() => {
    eventsJackpot();
  }, [promotion.jackpot]);

  return {
    open,
    closeModal,
    events,
    loading,
    betLoading,
    handleChangeWinner,
    buttonSendDisable,
    onSubmit,
    errorMessage,
    eventsError,
    numberSportsMain,
    numberSportsReserve,
  };
}
