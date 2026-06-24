export type MaskType = "CPF" | "CELLPHONE" | "CNPJ" | "BIRTHDATE" | "CEP" | "MONEY" | "NULL";

export const CPF_MASK = "999.999.999-99";

export const CNPJ_MASK = "99.999.999/9999-99";

export const CELLPHONE_MASK = "(99) 99999-9999";

export const CEP_MASK = "99999-999";

export const BIRTHDATE_MASK = "99/99/9999";

export const MONEY_MASK = "9999999999,99";

export const mask = {
  CPF: CPF_MASK,
  CELLPHONE: CELLPHONE_MASK,
  CNPJ: CNPJ_MASK,
  BIRTHDATE: BIRTHDATE_MASK,
  CEP: CEP_MASK,
  MONEY: MONEY_MASK,
  NULL: "",
};
