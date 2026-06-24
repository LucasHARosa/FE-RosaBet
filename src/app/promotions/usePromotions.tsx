"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import _ from "lodash";
import { FreeRound, Jackpot, Promotion, Ticket } from "@/interfaces/promotion";
import { defaultPromotions } from "./defaultPromotions";
import { promotionsList, welcomeDepositAvailable } from "@/service/promotion";
import { UserContext } from "@/contexts/UserContext";

export default function usePromotions() {
  const modalSuccessRef = useRef<any>();
  const modalCodeRef = useRef<any>();
  const modalPromotionCorrectScore = useRef<any>();
  const modalPromotionJackpot = useRef<any>();
  const [selectPromotion, setSelectPromotion] = useState<Promotion | undefined>();
  const [promotions, setPromotions] = useState<Promotion[]>(defaultPromotions);
  const { isAuthenticaded, openLogin } = useContext(UserContext);
  const [isViewDetail, setIsViewDetail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticaded) {
      setLoading(true);
      fetchPromotionData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticaded]);

  const fetchPromotionData = async () => {
    await Promise.all([getPromotionWelcome(), getPromotions()]);
  };

  const getPromotions = async () => {
    try {
      const response = await promotionsList();
      processPromotions(response);
    } catch (error) {
      resetPromotionAmounts();
    } finally {
      setLoading(false);
    }
  };

  const getPromotionWelcome = async () => {
    try {
      const response = await welcomeDepositAvailable();
      setPromotions((prevPromotions) =>
        _.map(prevPromotions, (promotion) => {
          if (promotion.type === "WELCOME_BONUS") {
            promotion.active = response.welcome_bonus_available;
          }
          return promotion;
        }),
      );
    } catch (error) {}
  };

  const handleOpenModalCode = () => modalCodeRef.current?.openModal();
  const handleSuccess = () => modalSuccessRef.current?.openModal();

  const handleUsePromotion = (promotion: Promotion) => {
    if (!isAuthenticaded) {
      openLogin();
      return;
    }
    switch (promotion.type) {
      case "CORRECT_SCORE":
        modalPromotionCorrectScore.current?.openModal();
        break;
      case "FREE_ROUNDS":
        router.push(`/casino/area-game/${promotion.free_rounds![0].name}`);
        break;
      case "JACKPOT":
        modalPromotionJackpot.current?.openModal();
        break;
      case "WELCOME_BONUS":
        router.push("/profile/transactions");
        break;
      default:
        break;
    }
  };

  const handleParticipatePromotion = () => {
    if (!isAuthenticaded) {
      openLogin();
      return;
    }
    router.push("/profile/transactions");
  };

  const handleSelectPromotion = (type: string) => {
    setSelectPromotion((prev) => {
      if (prev?.type === type) {
        setIsViewDetail(false);
        return undefined;
      }
      setIsViewDetail(true);
      return _.find(promotions, { type });
    });
  };

  const changeSelectPromotion = (promotion: Promotion | undefined) => {
    setSelectPromotion(promotion);
  };

  const handleCloseDetails = () => {
    setIsViewDetail(false);
    setSelectPromotion(undefined);
  };

  const processPromotions = (data: (Ticket | FreeRound | Jackpot)[]) => {
    if (data.length === 0) {
      resetPromotionAmounts();
      return;
    }
    const updatedPromotions = promotions.map((promotion) => {
      const newPromotion = _.cloneDeep(promotion);

      switch (promotion.type) {
        case "CORRECT_SCORE":
          updateCorrectScorePromotions(newPromotion, data);
          break;
        case "FREE_ROUNDS":
          updateFreeRoundPromotions(newPromotion, data);
          break;
        case "JACKPOT":
          updateJackpotPromotions(newPromotion, data);
          break;
        case "WELCOME_BONUS":
          newPromotion.amount = 1;
          break;
        default:
          break;
      }
      return newPromotion;
    });

    setPromotions(updatedPromotions);
    changeSelectPromotion(_.find(updatedPromotions, { type: selectPromotion?.type }));
  };

  const resetPromotionAmounts = () => {
    const updatedPromotions = promotions.map((promotion) => {
      promotion.amount = 0;
      return promotion;
    });
    setPromotions(updatedPromotions);
    changeSelectPromotion(undefined);
    setIsViewDetail(false);
  };

  const updateCorrectScorePromotions = (
    promotion: Promotion,
    data: (Ticket | FreeRound | Jackpot)[],
  ) => {
    promotion.tickets = [];
    data.forEach((item) => {
      if ("remaining_tickets" in item && item.type === "CORRECT_SCORE") {
        promotion.tickets!.push(item);
      }
    });
    promotion.amount = _.sumBy(promotion.tickets, "remaining_tickets");
  };

  const updateFreeRoundPromotions = (
    promotion: Promotion,
    data: (Ticket | FreeRound | Jackpot)[],
  ) => {
    promotion.free_rounds = [];

    data.forEach((item) => {
      if ("rounds" in item && item.type === "FREE_ROUNDS") {
        promotion.end_date = new Date(item.expirationDate.replace(" ", "T"));
        promotion.free_rounds!.push(item);
      }
    });

    promotion.amount = _.sumBy(promotion.free_rounds, "rounds");
  };

  const updateJackpotPromotions = (
    promotion: Promotion,
    data: (Ticket | FreeRound | Jackpot)[],
  ) => {
    promotion.jackpot = [];

    data.forEach((item) => {
      if ("qty" in item && item.type === "JACKPOT") {
        promotion.jackpot!.push(item);
      }
    });

    promotion.amount = _.sumBy(promotion.jackpot, "qty");
  };

  return {
    modalCodeRef,
    modalPromotionCorrectScore,
    modalPromotionJackpot,
    modalSuccessRef,
    isViewDetail,
    handleCloseDetails,
    promotions,
    selectPromotion,
    handleSelectPromotion,
    handleOpenModalCode,
    loading,
    handleUsePromotion,
    handleParticipatePromotion,
    refreshPromotions: fetchPromotionData,
    handleSuccess,
  };
}
