"use client";
import { Team } from "@/interfaces/filters";
import { useEffect, useState } from "react";

export default function useFilterTeam({ teams }: FilterTeamProps) {
  const [search, setSearch] = useState<string>("");
  const [teamsFilter, setTeamsFilter] = useState<Team[]>([]);

  const handleFilterTeams = (value: string) => {
    setSearch(value);
    if (value === "") {
      setTeamsFilter(teams);
      return;
    }
    const filterTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(value.toLowerCase()),
    );
    setTeamsFilter(filterTeams);
  };

  useEffect(() => {
    handleFilterTeams(search);
  }, [teams]);

  return { search, handleFilterTeams, teamsFilter };
}



interface FilterTeamProps {
  teams: Team[];
}