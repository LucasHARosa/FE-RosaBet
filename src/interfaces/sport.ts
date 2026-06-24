export interface Sport {
  _id: string;
  sport: {
    _id: string;
    valid_odds: number;
    is_live: boolean;
    status: string;
    championship: string;
    country: string;
    date: string;
    home_team: string;
    out_team: string;
    enet_code: string;
    home_coats_of_arms_link: string;
    out_coats_of_arms_link: string;
    __t: string;
  };
  quotation: number;
  status: string;
  market_id: string;
  option_id: string;
  is_live: boolean;
  oddId: string;
  type: string;
}
