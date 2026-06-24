export type CasinoType = 
  | "highlights" 
  | "on_the_rise" 
  | "news" 
  | "slot" 
  | "bingo" 
  | "live_dealer" 
  | "casual" 
  | "roulette" 
  | "table" 
  | "scratch_card" 
  | "virtual";
  
export interface CasinoHighglihts {
  amountGames: number;
  label: string;
  data: CasinoI[];
}

export interface CasinoI {
  active: boolean;
  demo: boolean;
  desktop_id: string;
  game_code: string;
  game_image: string;
  highlights: boolean;
  mobile_id: string;
  name: string;
  news: string | null;
  on_the_rise: string | null;
  provider: string;
  type: string;
}

export interface CasinoDetail {
  _id: string;
  order: number;
  provider: string;
  active: boolean;
  demo: boolean;
  highlights: boolean;
  highlight_order: number;
  game_image: string;
  game_code: string;
  name: string;
  mobile_id: string;
  desktop_id: string;
  type: string;
  creadet_at: string;
  news: string | null;
  news_order: number | null;
  on_the_rise: string | null;
  on_the_rise_order: number | null;
  __v: number;
}

export interface InfoGame extends CasinoDetail {
  gameURL: string;
}

export interface CardCasinoProps {
  game: CasinoI;
  type: typeCard;
}

export type typeCard = "p" | "m" | "g";
