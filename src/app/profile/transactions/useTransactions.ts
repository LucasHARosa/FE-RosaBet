import { UserContext } from "@/contexts/UserContext";
import { TransactionsI } from "@/interfaces/transactions";
import { getTransactions } from "@/service/transactions";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { Range } from "react-date-range";

const pollingInterval = 10 * 1000;
const today = new Date();
const yersterday = new Date(today);
yersterday.setDate(today.getDate() - 1);

export default function useTransactions() {
  const [allTransactions, setAllTransactions] = useState<TransactionsI[]>([]);
  const { getUser, loading, refreshUser } = useContext(UserContext);
  const [filterType, setFilterType] = useState<"pix" | "withdrawals">();
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: yersterday,
    endDate: new Date(),
    key: "selection",
  });

  const modalRefWithdrawal = useRef<any>();
  const modalRefDeposit = useRef<any>();
  const modalRefCalendar = useRef<any>();
  const refPollingTransactions = useRef<any>();

  const filterTransactions = (type: "pix" | "withdrawals") => {
    if (filterType === type) return setFilterType(undefined);
    setFilterType(type);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      day: "2-digit",
      month: "short",
    };
    return new Intl.DateTimeFormat("pt-BR", options).format(date);
  };

  const groupTransactionsByDate = (allTransactions: TransactionsI[]) => {
    return allTransactions.reduce((acc: { [key: string]: TransactionsI[] }, transaction) => {
      const date = new Date(transaction.created_at);
      const dateString = formatDate(new Date(date));

      if (!acc[dateString]) {
        acc[dateString] = [];
      }

      acc[dateString].push(transaction);
      return acc;
    }, {});
  };

  const transactionsFiltered = useMemo(() => {
    if (!filterType) return groupTransactionsByDate(allTransactions);
    return groupTransactionsByDate(
      allTransactions.filter((transaction) => transaction.type.toLowerCase() === filterType),
    );
  }, [allTransactions, filterType]);

  const findAllTransactions = async () => {
    try {
      const response = await getTransactions({
        user: getUser._id,
        initialDate: selectionRange.startDate?.toISOString(),
        finalDate: selectionRange.endDate?.toISOString(),
      });
      setAllTransactions(response.reverse());

      refreshUser();
    } catch (error) {
      console.error(error);
    }
  };

  const startPolling = () => {
    refPollingTransactions.current = setInterval(() => {
      findAllTransactions();
    }, pollingInterval);
  };

  const stopPolling = () => {
    if (refPollingTransactions.current) {
      clearInterval(refPollingTransactions.current);
    }
  };

  useEffect(() => {
    findAllTransactions();

    if (!loading) {
      startPolling();
    }

    return stopPolling;
  }, [loading, selectionRange]);

  return {
    getUser,
    allTransactions,
    filterType,
    filterTransactions,
    transactionsFiltered,
    modalRefDeposit,
    modalRefWithdrawal,
    modalRefCalendar,
    selectionRange,
    setSelectionRange,
  };
}
