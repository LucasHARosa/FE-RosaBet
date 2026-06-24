import { GameProps } from "./game";

export interface Team {
  name: string;
  coatOfArmsLink: string;
}

export type ViewType = "filterTeam" | "filterChampion" | "filterType" | "main";

export type StatusType = "live" | "notStarted" | "all" | "programed";

export interface OptionStatus {
  type: StatusType;
  name: string;
}

export interface FilterCriteria {
  startDate?: string;
  endDate?: string;
  championship?: string;
  __t?: string;
  team?: string;
  status?: "live" | "notStarted" | "all" | "programed";
  startOdd?: string;
  endOdd?: string;
}

export interface GameFilterProps {
  events: GameProps[];
  handleFilter: (criteria: FilterCriteria) => void;
}
