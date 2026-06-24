"use client";
import { GamePromotionProps } from "@/interfaces/promotion";
import { useState } from "react";

export default function useCorrectScore({ game, handleChangeScore }: CardCorrectScoreProps) {
  const [valueHome, setValueHome] = useState<number | undefined>(undefined);
  const [valueAway, setValueAway] = useState<number | undefined>(undefined);

  const handleValueHome = (value: string) => {
    const valueStep = valueAway !== undefined ? valueAway : -1;
    if (value === "-1" || value === "" || Number(value) < 0) {
      setValueHome(undefined);
      handleChangeScore(game._id, -1, valueStep);
      return;
    }
    setValueHome(Number(value));
    handleChangeScore(game._id, Number(value), valueStep);
  };

  const handleValueAway = (value: string) => {
    const valueStep = valueHome !== undefined ? valueHome : -1;
    if (value === "-1" || value === "") {
      setValueAway(undefined);
      handleChangeScore(game._id, valueStep, -1);
      return;
    }
    setValueAway(Number(value));
    handleChangeScore(game._id, valueStep, Number(value));
  };

  return {
    valueHome,
    handleValueHome,
    valueAway,
    handleValueAway,
  };
}

export interface CardCorrectScoreProps {
  game: GamePromotionProps;
  handleChangeScore: (id: string, score_home: number, score_away: number) => void;
}
