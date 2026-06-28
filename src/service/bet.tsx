import { fetcher } from "@/hooks/useMiddleware";
import { CuponsProps } from "@/interfaces/cupons";
import { BetCorrectScoreProps, BetJackpotProps } from "@/interfaces/promotion";
// https://nextjs.org/docs/app/building-your-application/caching#router-cache

const urlRoute = "/bet";

const betCoupon = async (data: CuponsProps) => {
  const response = await fetcher({
    url: `${urlRoute}`,
    method: "POST",
    cache: "no-store",
    data,
  });

  return response;
};

const betCorrectScore = async (data: BetCorrectScoreProps) => {
  const response = await fetcher({
    url: "/bet",
    method: "POST",
    cache: "no-store",
    data,
  });

  return response;
};

const betJackpot = async (data: BetJackpotProps) => {
  const response = await fetcher({
    url: "/jackpot/bet",
    method: "POST",
    cache: "no-store",
    data,
  });

  return response;
};

export { betCoupon, betCorrectScore, betJackpot };
