"use client";
import { useWindow } from "@/hooks/window";
import { FilterCriteria } from "@/interfaces/filters";
import { GameProps } from "@/interfaces/game";
import { MutableRefObject, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export interface EventListProps {
  href?: string;
  text?: string;
  icon?: React.ReactNode;
  games: GameProps[];
  viewButtonMore?: boolean;
  limit?: number;
  filter?: boolean;
  view: "column" | "grid";
  isViewTemplate?: boolean;
  loading?: boolean;
  refNumPagScroll?: MutableRefObject<number>;
  marginBottom?: boolean;
  loadingElem: any;
}

export type ViewEventsProps = "grid" | "column";

export default function UseEventList({ games, view, refNumPagScroll }: EventListProps) {
  const { ref, inView } = useInView();
  const { isMobile } = useWindow();
  const [modeView, setModeView] = useState<ViewEventsProps>(view);
  const [users, setUsers] = useState<any[]>([]);
  const [filterGames, setFilterGames] = useState<GameProps[]>([]);
  const [eventsFilters, setEventsFilters] = useState<boolean>(false);

  const NUMBER_OF_USERS_TO_FETCH = refNumPagScroll?.current;

  const numberEvents = games.length;

  const loadMoreUsers = () => {
    if (refNumPagScroll && NUMBER_OF_USERS_TO_FETCH) {
      if (eventsFilters) {
        const apiUsers = filterGames.slice(
          refNumPagScroll.current,
          refNumPagScroll.current + NUMBER_OF_USERS_TO_FETCH,
        );
        setUsers((prevUsers) => [...prevUsers, ...apiUsers]);
      } else {
        const apiUsers = games.slice(
          refNumPagScroll.current,
          refNumPagScroll.current + NUMBER_OF_USERS_TO_FETCH,
        );
        setUsers((prevUsers) => [...prevUsers, ...apiUsers]);
      }
      refNumPagScroll.current += NUMBER_OF_USERS_TO_FETCH;
    }
  };

  const handleFilter = (criteria: FilterCriteria) => {
    const filterGames = games.filter((event) => {
      const { startDate, endDate, championship, __t, team, status, startOdd, endOdd } = criteria;

      if (startDate && new Date(event.date) < new Date(startDate)) {
        return false;
      }

      if (endDate && new Date(event.date) > new Date(endDate)) {
        return false;
      }

      if (championship && event.championship !== championship) {
        return false;
      }

      if (__t && event.__t !== __t) {
        return false;
      }

      if (team && event.home_team !== team && event.out_team !== team) {
        return false;
      }

      if (status) {
        if (status === "live" && !event.is_live) {
          return false;
        }
        if (status === "notStarted" && event.match_status !== "Not started") {
          return false;
        }
      }

      if (startOdd) {
        const hasValidOdd = event.reduced_markets.some((market) =>
          market.odds.some((odd) => odd.odd >= parseFloat(startOdd)),
        );
        if (!hasValidOdd) {
          return false;
        }
      }

      if (endOdd) {
        const hasValidOdd = event.reduced_markets.some((market) =>
          market.odds.some((odd) => odd.odd <= parseFloat(endOdd)),
        );
        if (!hasValidOdd) {
          return false;
        }
      }

      return true;
    });
    setFilterGames(filterGames);
    setEventsFilters(true);
  };

  useEffect(() => {
    if (
      inView &&
      refNumPagScroll &&
      games &&
      (refNumPagScroll.current < games.length || refNumPagScroll.current < filterGames.length)
    ) {
      loadMoreUsers();
    }
  }, [inView]);

  useEffect(() => {
    if (refNumPagScroll) {
      if (filterGames && eventsFilters) {
        setUsers(filterGames.slice(0, refNumPagScroll.current));
      } else if (games && !eventsFilters) {
        setUsers(games.slice(0, refNumPagScroll.current));
      }
    } else {
      if (filterGames && eventsFilters) {
        setUsers(filterGames);
      } else if (games && !eventsFilters) {
        setUsers(games);
      }
    }
  }, [filterGames, games, eventsFilters]);

  return {
    users,
    handleFilter,
    modeView,
    setModeView,
    numberEvents,
    ref,
    isMobile
  };
}
