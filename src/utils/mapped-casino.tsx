import Image from "next/image";
import { ReactNode } from "react";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import ImgBingo from "@/assets/images/casino/ic-nav-cas-bingo.svg";
import ImgCasual from "@/assets/images/casino/ic-nav-cas-casualgame.svg";
import ImgScratchcard from "@/assets/images/casino/ic-nav-cas-scratchcard.svg";
import ImgRoullete from "@/assets/images/casino/ic-nav-cas-roulette.svg";
import ImgTable from "@/assets/images/casino/ic-nav-cas-table.svg";
import ImgLive from "@/assets/images/casino/ic-nav-cas-livedealer.svg";
import ImgSlot from "@/assets/images/casino/ic-nav-cas-slot.svg";
import Icon from "./icon";

const mappers: Mappers = {
  highlights: {
    name: "Destaques",
    icon: <BsFillBookmarkStarFill color="rgba(255, 190, 126, 1)" size={16} />,
  },
  on_the_rise: {
    name: "Em alta",
    icon: <Icon name="fire" color="brand.secondary.100" size={16} />,
  },
  news: {
    name: "Novidades",
    icon: <Icon name="rankingStar" color="brand.secondary.accent.textYellow" size={16} />,
  },
  slot: {
    name: "Instantâneos",
    icon: <Image src={ImgSlot} alt="bingo" width={16} height={16} />,
  },
  bingo: {
    name: "Loteria",
    icon: <Image src={ImgBingo} alt="bingo" width={16} height={16} />,
  },
  live_dealer: {
    name: "Ao vivo",
    icon: <Image src={ImgLive} alt="casual" width={16} height={16} />,
  },
  casual: {
    name: "Desafios",
    icon: <Image src={ImgCasual} alt="casual" width={16} height={16} />,
  },
  roulette: {
    name: "Roleta",
    icon: <Image src={ImgRoullete} alt="scratch_card" width={16} height={16} />,
  },
  table: {
    name: "Mesa",
    icon: <Image src={ImgTable} alt="scratch_card" width={16} height={16} />,
  },
  scratch_card: {
    name: "Raspadinha",
    icon: <Image src={ImgScratchcard} alt="scratch_card" width={16} height={16} />,
  },
  virtual: {
    name: "Virtual",
    icon: <Icon name="rankingStar" color="brand.secondary.accent.textYellow" size={16} />,
  },
};

const getInfoCasino = (type: string) => {
  const normalizedMarket = `${type.toLowerCase()}`;
  return mappers[normalizedMarket] || mappers.DEFAULT;
};

export { getInfoCasino, mappers };

interface Mappers {
  [key: string]: MapperItem;
}

interface MapperItem {
  name: string;
  icon: ReactNode;
}
