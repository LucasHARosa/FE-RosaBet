export interface UserI {
  _id: string;
  active: boolean;
  affiliation: {
    affiliated?: boolean;
    affiliated_date?: string;
    affiliated_to?: string;
    affiliated_to_date?: string;
  };
  break_period?: {
    end_date: string;
    start_date: string;
  };
  self_limits?: {
    deposit: {
      _1_day: number;
      _7_days: number;
      _30_days: number;
    };
  };
  address: {
    city?: string;
    country: string;
    state?: string;
    street?: string;
    zipcode?: string;
  };
  messagesUnread?: number;
  casino_credits: number;
  cpf: string;
  created_at: Date;
  credits: number;
  currency: string;
  email: string;
  name: string;
  phone: string;
  pix_key: string;
  pix_key_type: string;
  poker_credits: number;
  retained_credit: number;
  sports_bonus: number;
  statistics: any;
  token: string;
  token_expiration_date: Date;
  tutorial: any;
  two_factor_auth: {
    app_2fa_enabled: boolean;
  };
  type: UserType;
  username: string;
  birth_date: string;
  withdrawalSequence: number;
  email_confirmation: {
    is_confirmed: boolean;
  };
  notification: {
    sms: boolean;
    email: boolean;
  };
}

export interface VerifyCPFI {
  consta_obito: boolean;
  cpf: string;
  data_emissao: string;
  data_nascimento: string;
  nome: string;
  situacao_cadastral: string;
  ultima_atualizacao: string;
}

export interface RegisterProps {
  username: string;
  cpf: string;
  email: string;
  name: string;
  password: string;
  promo_code: string;
  birthDate: string;
  associate?: string;
  campaign?: string;
}

export interface IBGECEPProps {
  zipcode?: string;
  street?: string;
  city?: string;
  state?: string;
}

export type UserType = "CLIENT" | "ADMIN" | "MARKETING";
