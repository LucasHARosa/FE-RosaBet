"use client";

import { UserContext } from "@/contexts/UserContext";
import {
  BetCorrectScoreProps,
  Promotion,
  PromotionGames,
  SportCorrectScore,
} from "@/interfaces/promotion";
import { betCorrectScore } from "@/service/bet";
import { promotionCorrectScore } from "@/service/promotion";
import { useContext, useEffect, useImperativeHandle, useState } from "react";

export interface PromotionCorrectScoreProps {
  promotion: Promotion;
  refreshPromotions: () => void;
  handleSuccess: () => void;
}

export default function usePromotionCorrectScore(
  ref: any,
  { promotion, refreshPromotions, handleSuccess }: PromotionCorrectScoreProps,
) {
  const { getUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [betLoading, setBetLoading] = useState(false);
  const [events, setEvents] = useState<PromotionGames>();
  const [bet, setBet] = useState<BetCorrectScoreProps>({} as BetCorrectScoreProps);
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

  const createBet = (events: PromotionGames) => {
    if (promotion.tickets) {
      const DataSports = events?.sports.map((event) => {
        return {
          is_live: false,
          quotation: 1,
          score_away: event.score_away !== -1 ? event.score_away : undefined,
          score_home: event.score_home !== -1 ? event.score_home : undefined,
          sport: event._id,
          time: "full_time",
          type: "pc",
        } as SportCorrectScore;
      });
      const DataBet = {
        better: getUser.name,
        free_bet: true,
        general_promotion: promotion.tickets[0].promotion,
        source: "MOBILE",
        spend_from: "wallet",
        tax_value: 0,
        value: 0,
        type: "SPORT",
        sports: DataSports,
      } as BetCorrectScoreProps;
      setBet(DataBet);
    }
  };

  const handleChangeScore = (_id: string, score_home: number, score_away: number) => {
    setEvents((prev) => {
      if (!prev) return;
      const newEvents = prev;
      const index = newEvents.sports.findIndex((event) => event._id === _id);
      newEvents.sports[index].score_home = score_home;
      newEvents.sports[index].score_away = score_away;
      createBet(newEvents);
      return newEvents;
    });
  };

  const closeModal = () => {
    setOpen(false);
  };

  const eventsCorretScore = async () => {
    if (promotion.tickets && promotion.tickets?.length > 0) {
      setLoading(true);
      const promotionId = promotion.tickets[0].promotion;
      try {
        setEventsError("");
        const response = await promotionCorrectScore(promotionId);
        setEvents(response);
      } catch (err: any) {
        setEventsError("Não foi possível carregar os eventos, tente novamente mais tarde");
      } finally {
        setLoading(false);
      }
    }
  };

  const buttonSendDisable = () => {
    if (bet.sports) {
      return bet.sports.some((sport) => {
        return (
          sport.score_away === undefined ||
          sport.score_home === undefined ||
          sport.score_away === -1 ||
          sport.score_home === -1
        );
      });
    }
    return true;
  };

  const onSubmit = async () => {
    try {
      setBetLoading(true);
      setErrorMessage("");
      await betCorrectScore(bet);
      handleSuccess();
      closeModal();
      refreshPromotions();
    } catch (err: any) {
      setErrorMessage("Não foi possível realizar a aposta");
    } finally {
      setBetLoading(false);
    }
  };

  useEffect(() => {
    eventsCorretScore();
  }, [promotion.tickets]);

  return {
    open,
    closeModal,
    events,
    loading,
    betLoading,
    handleChangeScore,
    buttonSendDisable,
    onSubmit,
    errorMessage,
    eventsError,
  };
}
