export interface HighlightI {
  data: DataI[];
  settings: {
    [key: string]: string[];
  };
}

export interface OptionI {
  enable: boolean;
  info: string;
  is_live: boolean;
  is_update_percentage: boolean;
  lock: boolean;
  market_id: number;
  max_value_odd: number;
  odd: number;
  option_id: string;
  percentage: number;
  profit_margin: number;
  raw_odd: number;
}

export interface DataI {
  _id: string;
  championship: string;
  country: string;
  date: string;
  enet_code: string;
  home_coats_of_arms_link: string;
  home_team: string;
  image_link: string;
  is_live: boolean;
  main: boolean;
  match_status: string;
  redirect_link?: string;
  odds: {
    full_time: {
      home: OptionI;
      draw: OptionI;
      away: OptionI;
    };
  };
  order: number;
  out_coats_of_arms_link: string;
  out_team: string;
  status: string;
  type: string;
  valid_odds: number;
  __t: string;
}
