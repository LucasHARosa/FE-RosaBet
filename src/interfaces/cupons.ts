import { GameProps, OddProps } from "./game";

export interface CuponsProps {
  value: number;
  tax_value: number;
  better: string;
  source: string;
  spend_from: string;
  type: string;
  accept_all_odds_change: boolean;
  only_accept_high_odds_change: boolean;
  mobile: boolean;
  sports: Bet[];
}

interface Bet {
  is_live: boolean;
  quotation: number;
  oddId: string;
  enet_code: string;
  market_id: string;
  option_id: string;
  specifier: any;
}

export interface SportsCupons extends GameProps {
  __t: string;
  enet_code: string;
  hash: string;
  last_update: string;
  active: boolean;
  status: string;
  championship: string;
  country: string;
  date: string;
  home_team: string;
  out_team: string;
  home_coats_of_arms_link: string;
  out_coats_of_arms_link: string;
  is_live: boolean;
  name_market: string;
  market_id: string;
  available: boolean;
  flag_local_storage: Date|null;
  market: OddProps;
}

export interface MarketsSports {
  hash: string;
  id: number;
  name: string;
  hasSpecifiers: boolean;
  specifiers: string;
  status: string;
  odds: OddProps[];
  statusChangeOnly: boolean;
}

export interface EventsMarkets {
  enet_code: string;
  market: MarketsSports[];
}

export interface CardCupomProps {
  sport: SportsCupons;
  disabled?: boolean;
}
