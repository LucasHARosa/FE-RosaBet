import { Bet, BetSettings } from "@/interfaces/bet";
import _ from "lodash";
import { useMemo, useRef, useState } from "react";
import { StatusTab } from "../../useMyBets";
import { useTranslations } from "next-intl";

export default function useDetails(details: Bet, betSettings: (status: string) => BetSettings) {
  const [tabActive, setTabActive] = useState<StatusTab>("now");
  const refModalConfirm = useRef<any>();
  const t = useTranslations("Bet");

  const filteredSports = useMemo(() => {
    if (!details.sports) return { now: [], shortly: [], finalized: [] };

    const now = _.filter(details.sports, { status: "OPENED", is_live: true });
    const shortly = _.filter(details.sports, {
      status: "OPENED",
      is_live: false,
    });
    const finalized = _.filter(details.sports, (sport) => sport.status !== "OPENED");

    if (now.length > 0) setTabActive("now");
    else if (shortly.length > 0) setTabActive("shortly");
    else setTabActive("finalized");

    return { now, shortly, finalized };
  }, [details.sports]);

  const infoBet = useMemo(() => {
    return betSettings(details.status);
  }, [details.status]);

  const openModalConfirm = () => {
    refModalConfirm?.current.openModal();
  };

  return {
    openModalConfirm,
    filteredSports,
    tabActive,
    setTabActive,
    refModalConfirm,
    infoBet,
    t
  };
}
