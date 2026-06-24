export interface TransactionsI {
  _id: string;
  bonus: number;
  bonus_type: string;
  company: string;
  confirmed: boolean;
  created_at: string;
  expiration_date: string;
  logs: {
    _id: string;
    date: string;
    ip_address: string;
    status: string;
    user: string;
  }[];
  needs_notification: boolean;
  qr_code: string;
  qr_code_image: string;
  remaining_credits: number;
  remaining_value: number;
  status: string;
  type: string;
  user: {
    _id: string;
    birth_date: string;
    cpf: string;
    currency: string;
    name: string;
    type: string;
    username: string;
  };
  value: number;
}

export interface DepositsProps {
  user: string;
  initialDate?: string;
  finalDate?: string;
  pageSize?: number;
  pageIndex?: number;
}

export interface WithdrawalProps {
  cashout_type: string;
  password: string;
  type: string;
  value: number;
}
