export interface ReportIncomeI {
  data: ReportIncomeDataI[];
  total: ReportIncomeTotalI;
  dataDetailed: ReportIncomeDataDetailedI[];
}

export interface ReportIncomeTotalI {
  totalBets: number;
  totalStaked: number;
  totalPrize: number;
  totalGain: number;
}

export interface ReportIncomeDataI {
  bets: ReportIncomeDataDetailedI[];
  month: number;
  totalBets: number;
  totalGain: number;
  totalPrize: number;
  totalStaked: number;
}

export interface ReportIncomeDataDetailedI {
  code: string;
  date: string;
  gain: number;
  paid_value: number;
  value: number;
}

export interface ChangePassword {
  new: string;
  old: string;
}
