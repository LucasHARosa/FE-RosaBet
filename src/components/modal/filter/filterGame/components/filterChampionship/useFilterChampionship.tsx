"use client";
import { useEffect, useState } from "react";

export default function useFilterChampionship({ championships }: FilterChampionshipProps) {
  const [search, setSearch] = useState<string>("");
  const [championshipFilter, setChampionshipFilter] = useState<string[]>([]);

  const handleFilterChampionship = (value: string) => {
    setSearch(value);
    if (value === "") {
      setChampionshipFilter(championships);
      return;
    }
    const filterChampionship = championships.filter((championship) =>
      championship.toLowerCase().includes(value.toLowerCase()),
    );
    setChampionshipFilter(filterChampionship);
  };

  useEffect(() => {
    handleFilterChampionship(search);
  }, [championships]);

  return { search, handleFilterChampionship, championshipFilter };
}


interface FilterChampionshipProps {
  championships: string[];
}