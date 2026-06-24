import { fetcher } from "@/hooks/useMiddleware";
import { CodePromotion, PromotionGames, WelcomeDepositAvailable } from "@/interfaces/promotion";

const promotionsList = async () => {
  const response = await fetcher({
    url: "/general-promotion/notifications",
    method: "GET",
    cache: "no-store",
  });

  return response;
};

const welcomeDepositAvailable = async () => {
  const response = await fetcher({
    url: "/deposit-welcome-verification",
    method: "GET",
    cache: "no-store",
  });

  return response as WelcomeDepositAvailable;
};

const activatePromotionCode = async (code: CodePromotion) => {
  console.log("activatePromotionCode");
  const response = await fetcher({
    url: "/promo-code/activate-coupon",
    method: "POST",
    cache: "no-store",
    data: code,
  });

  return response;
};

const promotionCorrectScore = async (promtionId: string) => {
  const response = await fetcher({
    url: `/general-promotion/games/${promtionId}`,
    method: "GET",
    cache: "no-store",
  });

  return response as PromotionGames;
};

const promotionJackpot = async () => {
  const response = await fetcher({
    url: "/general-promotion/jackpot-games",
    method: "GET",
    cache: "no-store",
  });

  return response as PromotionGames;
};

export {
  promotionsList,
  welcomeDepositAvailable,
  activatePromotionCode,
  promotionCorrectScore,
  promotionJackpot,
};
