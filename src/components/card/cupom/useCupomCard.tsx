"use client";
import { CuponsContext } from "@/contexts/CuponsContext";
import { useWindow } from "@/hooks/window";
import { SportsCupons } from "@/interfaces/cupons";
import { OddProps } from "@/interfaces/game";
import { useContext, useEffect, useMemo, useState } from "react";

export default function useCardCupom(sport: SportsCupons) {
  const [oldOdd, setOldOdd] = useState<OddProps | null>(sport.market);
  const [glowUp, setGlowUp] = useState(false);
  const [glowDown, setGlowDown] = useState(false);
  const { isMobile } = useWindow();
  const { removeSportCupons } = useContext(CuponsContext);

  const loading = useMemo(() => {
    if (sport.last_update !== undefined && sport.last_update !== null && sport.last_update !== "") {
      return false;
    }
    return true;
  }, [sport]);

  const OddState = () => {
    if (sport?.is_live === true) {
      return "live";
    }

    const today = new Date();
    const eventDate = new Date(sport?.date);

    const normalizeToDateOnly = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    const normalizedToday = normalizeToDateOnly(today);
    const normalizedEventDate = normalizeToDateOnly(eventDate);

    if (normalizedEventDate.getTime() === normalizedToday.getTime()) {
      return "pre";
    }
    return "none";
  };

  const OddAvailable = useMemo(() => {
    return sport.available;
  }, [sport]);

  useEffect(() => {
    if (sport.market.odd !== oldOdd?.odd) {
      if(oldOdd !== null && sport.market.odd > oldOdd.odd) {
        setGlowUp(true);
        setTimeout(() => {
          setGlowUp(false);
        }, 5000);
      } else {
        setGlowDown(true);
        setTimeout(() => {
          setGlowDown(false);
        }, 5000);
      }
    }
    setOldOdd(sport.market);
  }, [sport.market]);

  const handleRemove = () => removeSportCupons(sport);

  return { OddAvailable, handleRemove, OddState, loading, isMobile, glowUp, glowDown };
}
