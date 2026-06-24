export interface GameProps {
  remove_event?: string;
  active: boolean;
  valid_odds: number;
  championship: string;
  championship_en: string;
  country: string;
  country_en: string;
  date: string;
  enet_code: string;
  home_coats_of_arms_link: string;
  home_score: number;
  home_team: string;
  is_live: boolean;
  last_event: string;
  last_update: string;
  match_status: string;
  markets: any;
  out_coats_of_arms_link: string;
  out_team: string;
  away_score: number;
  played_time?: string;
  reduced_markets: reducedMarketsProps[];
  sendToFrontDate: number;
  srLastDate: number;
  srReceiveDate: number;
  status: string;
  __t: string;
  _id: {
    date: number;
    timestamp: string;
  };
}

export interface OddProps {
  active: boolean;
  hash: string;
  name: string;
  odd: number;
  optionId: string;
  timestamp: number;
}

export interface reducedMarketsProps {
  hash: string;
  id: string;
  name: string;
  odds: OddProps[];
  status: string;
  statusChangeOnly: boolean;
}

export interface SportType {
  live: GameProps[];
  prematch: GameProps[];
}

export type MarketOptions =
  | "MAIN"
  | "GOALS"
  | "CORNERS_CARDS"
  | "1ST_2ND"
  | "PLAYERS"
  | "SPECIALS"
  | "ASIAN"
  | "OTHERS";
