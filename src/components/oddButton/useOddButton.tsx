import { useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { CuponsContext } from "@/contexts/CuponsContext";
import { SportsCupons } from "@/interfaces/cupons";
import { GameProps, OddProps } from "@/interfaces/game";
import { GameContext } from "@/contexts/GameContext";

export interface ButtonOddProps {
  title?: string;
  market: OddProps;
  game: GameProps;
  id?: string;
}

export default function useOddButton({ market, game }: ButtonOddProps) {
  const [oldOdd, setOldOdd] = useState<OddProps | null>(market);
  const [glowUp, setGlowUp] = useState(false);
  const [glowDown, setGlowDown] = useState(false);
  const [glowFixed, setGlowFixed] = useState<"up" | "down" | null>(null);
  const { isConnectionDown } = useContext(GameContext);

  const { addSportCupons, cupons, oddAvailable } = useContext(CuponsContext);

  const OddSelected = _.find(cupons, (sport) => sport.hash === market.hash && sport.enet_code === game.enet_code);

  const OddAvailable = useMemo(() => {
    return oddAvailable(market, game) && !isConnectionDown;
  }, [market, game, isConnectionDown]);

  const handleAddCupon = () => {
    const cupon = {
      ...game,
      available: OddAvailable,
      hash: market.hash,
      market: market,
    } as SportsCupons;
    if (OddAvailable) {
      addSportCupons(cupon);
    }
  };

  useEffect(() => {
    if (market.hash === oldOdd?.hash && market.odd !== oldOdd?.odd) {
      if (market.odd > oldOdd.odd) {
        setGlowUp(true);
        setGlowFixed(null); // Reset fixed glow
        setTimeout(() => {
          setGlowUp(false);
          setGlowFixed("up"); // Fix glow after blinking
        }, 4000);
      } else {
        setGlowDown(true);
        setGlowFixed(null); // Reset fixed glow
        setTimeout(() => {
          setGlowDown(false);
          setGlowFixed("down"); // Fix glow after blinking
        }, 4000);
      }
      setTimeout(() => {
        setGlowFixed(null); // Reset after 20 seconds
      }, 24000);
    }
    setOldOdd(market);
  }, [market]);
  
  return { OddAvailable, handleAddCupon, OddSelected, glowUp, glowDown, glowFixed };
}
