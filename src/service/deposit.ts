import { fetcher } from "@/hooks/useMiddleware";
import { DepositAvaliableI, DepositI, DepositProps } from "@/interfaces/deposit";

const urlRoute = "/deposit";

const deposit = async ({ receive_bonus = true, ...data }: DepositProps) => {
  const response = await fetcher({
    url: `${urlRoute}`,
    method: "POST",
    data: {
      ...data,
      receive_bonus,
      credits_type: "SPORTS",
      open_finance: false,
    },
  });

  return response as DepositI;
};

const verifyPromotionsAvailable = async () => {
  const response = await fetcher({
    url: `/deposit-welcome-verification`,
    method: "GET",
  });

  return response as DepositAvaliableI;
};

export { deposit, verifyPromotionsAvailable };
