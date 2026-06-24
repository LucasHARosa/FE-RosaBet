import { FilterProps } from "@/components/modal/filter/filterBet/useFilterBet";
import { UserContext } from "@/contexts/UserContext";
import { useWindow } from "@/hooks/window";
import { Bet, BetSettings, MyBetsAll } from "@/interfaces/bet";
import { cashout, getBetsAll, getBetsDetails } from "@/service/bets";
import { useRouter } from "next/navigation";
import { startTransition, useContext, useEffect, useMemo, useRef, useState } from "react";


export default function useMyBets() {
  const [bets, setBets] = useState<MyBets>({} as MyBets);
  const [details, setDetails] = useState<Bet>({} as Bet);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(false);
  const [loadingBetsAll, setLoadingBetsAll] = useState<boolean>(true);
  const [isViewDetail, setIsViewDetail] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [filterOptions, setFilterOptions] = useState<FilterProps[]>([]);
  const [filter, setFilter] = useState<MyBets>({} as MyBets);
  const router = useRouter();
  const { isMobile } = useWindow();
  const { refreshUser, getUser, loading } = useContext(UserContext);

  const modalRefFilter = useRef<any>();

  const betSettings = (status: string): BetSettings => {
    const settingsMap: { [key: string]: BetSettings } = {
      WINS: {
        status: "WINS",
        color: "brand.secondary.accent.green.100",
        bg: "brand.secondary.accent.green.8",
        message: "Parabéns! O seu prêmio já está disponível em sua carteira. Aproveite!",
      },
      LOST: {
        status: "LOST",
        color: "text.dynamic.whiteDynamic.64",
        bg: "background.dynamic.whiteDynamic.8",
        message: "Infelizmente você perdeu aposta.",
      },
      OPENED: {
        status: "OPENED",
        color: "brand.secondary.accent.textYellow",
        bg: "brand.secondary.accent.bgYellow",
        message: "Aguarde o resultado final da sua aposta.",
      },
      CANCELLED: {
        status: "CANCELLED",
        color: "brand.primary.100",
        bg: "brand.secondary.24",
        message: "A aposta foi cancelada. O valor investido foi devolvido para sua carteira.",
      },
    };

    return settingsMap[status] || settingsMap["LOST"];
  };

  const handleInputChange = (value: string) => {
    setInput(value);

    startTransition(() => {
      const searchItemOpened = bets.opened.filter((bet) => bet.code.includes(value));
      const searchItemClosed = bets.closed.filter((bet) => bet.code.includes(value));
      setFilter({ opened: searchItemOpened, closed: searchItemClosed });
    });
  };

  const extractDateToFilter = (rangeType: string) => {
    return (
      filterOptions.find((filter) => filter.rangeType === rangeType)?.value || new Date().toString()
    );
  };

  const getBets = async () => {
    setLoadingBetsAll(true);
    try {
      const response = await getBetsAll({
        status: "ALL",
        startDate: extractDateToFilter("startDate"),
        endDate: extractDateToFilter("endDate"),
      });

      const opened = response.filter((bet) => bet.status === "OPENED");
      const closed = response.filter((bet) => bet.status !== "OPENED");
      setBets({ opened, closed });
      setFilter({ opened, closed });
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoadingBetsAll(false);
    }
  };

  const viewDetails = async (id: string) => {
    if (id === details._id) {
      setDetails({} as Bet);
      return;
    }
    setLoadingDetail(true);

    try {
      const response = await getBetsDetails(id);
      setDetails(response);
      setIsViewDetail(true);
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const cashoutBet = async (id: string, cashout_value: number) => {
    try {
      await cashout(id, cashout_value);
      setIsViewDetail(false);
      refreshUser();
      getBets();
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleFilter = (e: FilterProps[]) => {
    setFilterOptions(e);
  };

  const applyFilters = useMemo(() => {
    const element = bets;
    filterOptions.forEach((filter) => {
      if (filter.rangeType === "state") {
        if (filter.value === "live") {
          element.opened = element.opened.filter((bet) =>
            bet.sports.some((sport) => sport.is_live),
          );
          element.closed = element.closed.filter((bet) =>
            bet.sports.some((sport) => sport.is_live),
          );
        } else if (filter.value === "prematch") {
          element.opened = element.opened.filter((bet) =>
            bet.sports.some((sport) => !sport.is_live),
          );
          element.closed = element.closed.filter((bet) =>
            bet.sports.some((sport) => !sport.is_live),
          );
        }
      }
      if (filter.rangeType === "status") {
        if (filter.value === "active") {
          element.opened = element.opened.filter((bet) => bet.status === "OPENED");
          element.closed = [];
        } else if (filter.value === "finish") {
          element.opened = [];
          element.closed = element.closed.filter((bet) => bet.status !== "OPENED");
        }
      }
      if (filter.rangeType === "result") {
        if (filter.value === "positive") {
          element.opened = element.opened.filter((bet) => bet.status === "WINS");
          element.closed = element.closed.filter((bet) => bet.status === "WINS");
        } else if (filter.value === "negative") {
          element.opened = element.opened.filter((bet) => bet.status === "LOST");
          element.closed = element.closed.filter((bet) => bet.status === "LOST");
        } else if (filter.value === "neutral") {
          element.opened = element.opened.filter((bet) => bet.status === "OPENED");
          element.closed = element.closed.filter((bet) => bet.status === "OPENED");
        }
      }
    });
    if ((bets.closed?.length > 0 || bets.opened?.length > 0) && !isMobile)
      viewDetails(bets.opened[0]?._id || bets.closed[0]?._id);
    else {
      setDetails({} as Bet);
      setIsViewDetail(false);
    }
    return element;
  }, [filterOptions, bets]);

  const openFilter = () => {
    modalRefFilter.current.openModal(filterOptions);
  };

  useEffect(() => {
    if (
      (filterOptions.find((i) => i.rangeType === "startDate") &&
        filterOptions.find((i) => i.rangeType === "endDate")) ||
      filterOptions.length === 0
    )
      getBets();
  }, [filterOptions]);

  useEffect(() => {
    if (!getUser._id && !loading) router.push("/");
  }, [getUser]);

  useEffect(() => {
    getBets();
  }, []);

  return {
    bets,
    viewDetails,
    details,
    loadingDetail,
    loadingBetsAll,
    isViewDetail,
    setIsViewDetail,
    handleInputChange,
    input,
    filter,
    cashoutBet,
    betSettings,
    isMobile,
    modalRefFilter,
    handleFilter,
    filterOptions,
    openFilter,
    applyFilters,
  };
}

interface MyBets {
  opened: MyBetsAll[];
  closed: MyBetsAll[];
}

export type StatusTab = "now" | "shortly" | "finalized";
