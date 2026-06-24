export interface DepositI {
  id: string;
  company: string;
  credits_type: string;
  expiration_date: string;
  qr_code: string;
  qr_code_image: string;
  value: number;
}

export interface DepositProps {
  credits_type: string;
  general_promotion: string;
  open_finance: boolean;
  promo_code: string | null;
  receive_bonus: boolean;
  type: string;
  value: number;
}

export interface DepositAvaliableI {
  general_promotions: {
    _id: string;
    prize_amount: number;
    sports_to_select_qty: number;
    type: string;
    validation: string;
    max_deposit_value?: number;
    min_deposit_value?: number;
  }[];
  promotion: {
    available: boolean;
  };
  welcome_bonus_available: boolean;
}
