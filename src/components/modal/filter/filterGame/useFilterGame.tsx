"use client";
import { GameProps } from "@/interfaces/game";
import { useEffect, useImperativeHandle, useState } from "react";
import _ from "lodash";
import { Range } from "react-date-range";
import { FilterCriteria, OptionStatus, StatusType, Team, ViewType } from "@/interfaces/filters";

export interface ModalFilterGameProps {
  events: GameProps[];
  handleFilter: (criteria: FilterCriteria) => void;
}

export default function useFilterGame(ref: any, { events, handleFilter }: ModalFilterGameProps) {
  const [open, setOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      openModal: () => setOpen(true),
      closeModal: () => setOpen(false),
    }),
    [],
  );

  const closeModal = () => {
    setOpen(false);
  };

  const [currentView, setCurrentView] = useState<ViewType>("main");

  const [eventType, setEventType] = useState<string>("");
  const [championship, setChampionship] = useState<string>("");
  const [team, setTeam] = useState<Team>({ name: "", coatOfArmsLink: "" });

  const [status, setStatus] = useState<StatusType>("all");
  const [startOdd, setStartOdd] = useState<string>("");
  const [endOdd, setEndOdd] = useState<string>("");
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [championships, setChampionships] = useState<string[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  
  const [selectionRange, setSelectionRange] = useState<Range>({
    startDate: undefined,
    endDate: undefined,
    key: "selection",
  });

  const optionStatus = [
    { type: "all", name: "Todos" },
    { type: "live", name: "Ao Vivo" },
    { type: "notStarted", name: "Próximos Jogos" },
    { type: "programed", name: "Programados" },
  ] as OptionStatus[];

  const handleStartOdd = (value: string) => {
    if (value === "0") {
      setStartOdd("0");
      return;
    }
    if (value === "" || value === "-1" || value === undefined) {
      setStartOdd("");
      return;
    }
    const removeZero = value.replace(/^0+/, "");
    setStartOdd(removeZero);
  };

  const handleEndOdd = (value: string) => {
    if (value === "0") {
      setEndOdd("0");
      return;
    }
    if (value === "" || value === "-1" || value === undefined) {
      setEndOdd("");
      return;
    }
    const removeZero = value.replace(/^0+/, "");
    setEndOdd(removeZero);
  };

  const filterTeams = (filteredEvents: GameProps[]) => {
    setTeams(
      _.uniqBy(
        filteredEvents.flatMap((event) => [
          { name: event.home_team, coatOfArmsLink: event.home_coats_of_arms_link },
          { name: event.out_team, coatOfArmsLink: event.out_coats_of_arms_link },
        ]),
        "name",
      ),
    );
  };

  const handleEventTypeChange = (type: string) => {
    setEventType(type);
    setChampionship("");
    setTeam({} as Team);
  };

  const handleChampionshipChange = (type: string) => {
    setChampionship(type);
    setTeam({} as Team);
  };

  const handleTeamChange = (team: Team) => {
    setTeam(team);
  };

  const handleClear = () => {
    setEventType("");
    setChampionship("");
    setTeam({} as Team);
    setStatus("all");
    setStartOdd("");
    setEndOdd("");
    setSelectionRange({ startDate: undefined, endDate: undefined, key: "selection" });
    handleFilter({});
  };

  const handleSendFilter = () => {
    handleFilter({
      __t: eventType,
      championship: championship,
      team: team?.name,
      startDate: selectionRange.startDate?.toString(),
      endDate: selectionRange.endDate?.toString(),
      status: status,
      startOdd: startOdd,
      endOdd: endOdd,
    });
    closeModal();
  };

  useEffect(() => {
    setEventTypes(_.uniq(events.map((event) => event.__t)));
  }, [events]);

  useEffect(() => {
    if (eventType) {
      const filteredEvents = events.filter((event) => event.__t === eventType);
      setChampionships(_.uniq(filteredEvents.map((event) => event.championship)));
      filterTeams(filteredEvents);
    } else {
      setChampionships(_.uniq(events.map((event) => event.championship)));
      filterTeams(events);
    }
  }, [eventType, events]);

  useEffect(() => {
    if (championship && eventType) {
      const filteredEvents = events.filter(
        (event) => event.championship === championship && event.__t === eventType,
      );
      filterTeams(filteredEvents);
    } else if (championship && !eventType) {
      const filteredEvents = events.filter((event) => event.championship === championship);
      filterTeams(filteredEvents);
    } else if (eventType && !championship) {
      const filteredEvents = events.filter((event) => event.__t === eventType);
      filterTeams(filteredEvents);
    }
  }, [championship, eventType, events]);

  return {
    open,
    closeModal,
    setCurrentView,
    currentView,
    eventTypes,
    championships,
    optionStatus,
    teams,
    eventType,
    championship,
    team,
    status,
    startOdd,
    endOdd,
    selectionRange,
    handleEventTypeChange,
    handleChampionshipChange,
    handleTeamChange,
    handleEndOdd,
    handleStartOdd,
    setStatus,
    handleClear,
    handleSendFilter,
    setSelectionRange,
  };
}
