import { ElementType } from "react";
import { GiGamepad, GiSoccerBall, GiVolleyballBall } from "react-icons/gi";
import { GrFlagFill } from "react-icons/gr";
import {
  PiBaseballFill,
  PiBasketballFill,
  PiFootballFill,
  PiPingPongFill,
  PiSoccerBall,
  PiTennisBallFill,
} from "react-icons/pi";

import { RiBoxingFill } from "react-icons/ri";
import { TbCards } from "react-icons/tb";
import { CiTrophy } from "react-icons/ci";
import { FaVolleyballBall } from "react-icons/fa";


const SportsImages = {
  soccer: GiSoccerBall,
  futsal: PiSoccerBall,
  tennis: PiTennisBallFill,
  football: PiFootballFill,
  basketball: PiBasketballFill,
  volleyball: GiVolleyballBall,
  baseball: PiBaseballFill,
  boxing: RiBoxingFill,
  "table tennis": PiPingPongFill,
  defaultGamePad: GiGamepad,
  mma: RiBoxingFill,
  penaltyCard: TbCards,
  flagOffSide: GrFlagFill,
  trophy: CiTrophy,
  "beach volley": FaVolleyballBall,
};

type SportsTypes = keyof typeof SportsImages;

export default function getImageSport(sport: string): ElementType {
  if (!sport) return SportsImages.defaultGamePad;
  const normalizedSport = sport.toLowerCase() as SportsTypes;
  return SportsImages[normalizedSport] || SportsImages.defaultGamePad;
}
