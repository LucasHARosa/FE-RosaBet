import { BsFire } from "react-icons/bs";
import { GiSoccerBall } from "react-icons/gi";
import { TbCardsFilled } from "react-icons/tb";

import { GiGamepad } from "react-icons/gi";
import { RiBoxingFill } from "react-icons/ri";
import { FaLayerGroup, FaPersonRunning } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
import { FaGlobeAsia } from "react-icons/fa";
import { IoHourglassOutline } from "react-icons/io5";

const MarketsImages = {
  _main: BsFire,
  _goals: GiSoccerBall,
  _corners_cards: TbCardsFilled,
  _1st_2nd: IoHourglassOutline,
  _players: FaPersonRunning,
  _specials: TiStarFullOutline,
  _asian: FaGlobeAsia,
  _others: RiBoxingFill,
  _all: FaLayerGroup,
  defaultGamePad: GiGamepad,
};

type MarketsTypes = keyof typeof MarketsImages;

export default function getImageMarket(market: string) {
  const normalizedMarket = `_${market.toLowerCase()}` as MarketsTypes;
  return MarketsImages[normalizedMarket] || MarketsImages.defaultGamePad;
}
