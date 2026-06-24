export interface Promotion {
  _id: string;
  name: string;
  active: boolean;
  description: string;
  brief_description: string;
  amount_type: string;
  amount: number;
  end_date: Date;
  end_date_string: string;
  type: string;
  type_icon: string;
  banner: string;
  tickets?: Ticket[];
  free_rounds?: FreeRound[];
  jackpot?: Jackpot[];
}

export interface Ticket {
  _id: string;
  promotion: string;
  remaining_tickets: number;
  type: "CORRECT_SCORE";
  validation: string;
  return_value: number;
  sports_qty: number;
  total_tickets: number;
}

export interface FreeRound {
  gameIDList: string;
  rounds: number;
  roundsPlayed: number;
  bonusCode: string;
  expirationDate: string;
  type: "FREE_ROUNDS";
  desktop_id: string;
  mobile_id: string;
  demo: boolean;
  provider: string;
  name: string;
  active: boolean;
}

export interface Jackpot {
  qty: number;
  return_value: number;
  sports_qty: number;
  type: "JACKPOT";
  validation: string;
  _id: string;
  return_by_sport_qty: {
    sport_qty: number;
    return_value: number;
  }[];
}

export interface WelcomeDepositAvailable {
  welcome_bonus_available: boolean;
  promotion: Available;
}

interface Available {
  available: boolean;
}

export interface CodePromotion {
  code: string;
}

export interface PromotionGames {
  prize_amount: number;
  sports: GamePromotionProps[];
  jackpots: GamePromotionProps[];
}

export interface GamePromotionProps {
  _id: string;
  __t: string;
  home_team: string;
  out_team: string;
  score_home: number;
  score_away: number;
  option_winner: "home" | "away" | "draw";
  option_class: "main" | "reserve1" | "reserve2";
  home_coats_of_arms_link: string;
  out_coats_of_arms_link: string;
  date: string;
  championship: string;
  country: string;
}

export interface BetCorrectScoreProps {
  better: string;
  free_bet: boolean;
  general_promotion: string;
  source: string;
  spend_from: string;
  sports: SportCorrectScore[];
  value: number;
  type: string;
  tax_value: number;
}

export interface SportCorrectScore {
  is_live: boolean;
  quotation: number;
  oddId: string;
  score_away: number;
  score_home: number;
  sport: string;
  time: string;
  type: string;
}

export interface BetJackpotProps {
  better: string;
  events: SportJackpot[];
  free_bet: boolean;
  lat: number;
  lng: number;
  source: string;
  spend_from: string;
  tax_value: number;
  type: string;
  value: number;
}

export interface SportJackpot {
  away: string;
  championship: string;
  choice: "home" | "away" | "draw";
  country: string;
  event: string;
  home: string;
  priority: {
    category: string;
    position: number;
  };
  type: string;
}
