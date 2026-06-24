import queryString from "query-string";
import { fetcher } from "@/hooks/useMiddleware";
import { DepositsProps, TransactionsI, WithdrawalProps } from "@/interfaces/transactions";
// https://nextjs.org/docs/app/building-your-application/caching#router-cache

const getTransactions = async (queryParams: DepositsProps) => {
  let url = "/deposit";

  if (queryParams) {
    url += `?${queryString.stringify(queryParams)}`;
  }

  const response = await fetcher({
    url: url,
    method: "GET",
  });

  return response as TransactionsI[];
};

const checkWithdrawal = async (value: number) => {
  const response = await fetcher({
    url: "/check-withdrawals",
    method: "POST",
    data: { value },
  });

  return response;
};

const confirmWithdrawal = async (value: WithdrawalProps) => {
  const response = await fetcher({
    url: "/cashout",
    method: "POST",
    data: value,
  });

  return response;
};

export { getTransactions, checkWithdrawal, confirmWithdrawal };
