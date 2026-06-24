import { Sport } from "./sport";
import { UserI } from "./user";

export type BetStatus = "WINS" | "LOST" | "CANCELLED" | "OPENED" | "CASHOUTED";
export interface Bet {
  _id: string;
  status: BetStatus;
  currency: string;
  free_bet: boolean;
  value: number;
  better: string;
  spend_from: string;
  return_value: number;
  qtt_sports: number;
  qtt_open_sports: number;
  user: UserI;
  sports: Sport[];
  date: string;
  extracted_quotation: number;
  code: string;
  paid_value: number;
  cashoutable?: boolean;
  cashout_value?: number;
}

export interface MyBetsAll {
  _id: string;
  better: string;
  code: string;
  currency: string;
  date: string;
  extracted_quotation: number;
  free_bet: boolean;
  qtt_open_sports: number;
  qtt_sports: number;
  return_value: number;
  spend_from: string;
  status: string;
  user: {
    _id: string;
    name: string;
    username: string;
    type: string;
  };
  sports: {
    enet_code: string;
    is_live: boolean;
    market_id: string;
    oddId: string;
    option_id: string;
    previous_status: string;
    quotation: number;
    sport: {
      home_coats_of_arms_link: string;
      out_coats_of_arms_link: string;
      __t: string;
      _id: string;
    };
    status: string;
    _id: string;
  }[];
  value: number;
}

export interface QueryParams {
  initialData?: string;
  finalData?: string;
  user?: string;
  status?: string;
}

export interface BetSettings {
  status: string;
  color: string;
  bg: string;
  message: string;
}
