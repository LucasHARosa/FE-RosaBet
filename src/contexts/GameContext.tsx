"use client";

import { GameProps, SportType } from "@/interfaces/game";
import { SocketTypes, closeWS, createWebSocket, handleAction, onError, onMessage, onOpen } from "@/service/socket";
import _ from "lodash";
import React, { ReactNode, createContext, useCallback, useEffect, useRef, useState } from "react";

interface GameContextType {
  handleFilter: (newFilter: { [key: string]: string }, type: SocketTypes) => void;
  games: GameProps[];
  categorySports: SportType | undefined;
  isConnectionDown: boolean;
  testOnReceivedMessage?: (event: GameProps[]) => void;
  gamesLiveByChampionships: (typeGame: string) => {
    championships: { [key: string]: any[] };
    count: number;
  };
  gamesPreMatchByChampionships: (typeGame: string) => {
    championships: { [key: string]: any[] };
    count: number;
  };
}

export const GameContext = createContext<GameContextType>({} as GameContextType);

export function GameProvider({ children }: { children: ReactNode }) {
  const [isConnectionDown, setIsConnectionDown] = useState<boolean>(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [filter, setFilter] = useState<{ [key: string]: string }[]>([{}]);
  const [categorySports, setCategorySports] = useState<SportType | undefined>();
  const wsRef = useRef<WebSocket | null>(null);

  const handleFilter = (newFilter: { [key: string]: string }, type: SocketTypes) => {
    if (wsRef.current) {
      handleAction(wsRef.current, type, newFilter);
      verifyFilter(newFilter);
    }
  };

  const verifyFilter = (newFilter: { [key: string]: string }) => {
    const newFilterKey = Object.keys(newFilter)[0];

    const filterIndex = filter.findIndex((f) => Object.keys(f)[0] === newFilterKey);

    if (filterIndex === -1) {
      setFilter([...filter, newFilter]);
    } else {
      const newFilters = [...filter];
      newFilters[filterIndex] = newFilter;
      setFilter(newFilters);
    }
  };

  const onReceivedMessage = (event: GameProps[]) => {
    if(!event) {
      setGames([]);
      setCategorySports({
        live: [],
        prematch: [],
      });
      return;
    };

    const filteredEvents = event
      .filter((item) => item.status !== "ENDED")
      .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    const [liveGames, notLiveGames] = _.partition(filteredEvents, (item) => item.is_live);
    setCategorySports({
      live: liveGames,
      prematch: notLiveGames,
    });
    setGames(event);
  };

  const gamesLiveByChampionships = useCallback((typeGame: string) => {
    const organized: {
      championships: { [key: string]: any[] };
      count: number;
    } = {
      championships: {},
      count: 0,
    };
    if (!categorySports) return organized;
    
    categorySports?.live.forEach((game) => {
      if(game.__t !== typeGame) return;

      if (!organized.championships[game.championship]) {
        organized.championships[game.championship] = [];
      }
      organized.championships[game.championship].push(game);
      organized.count += 1;
    });

    return organized;
  }, [categorySports?.live]) ?? { championships: {}, count: 0 };

  const gamesPreMatchByChampionships = useCallback((typeGame: string) => {
    const organized: {
      championships: { [key: string]: any[] };
      count: number;
    } = {
      championships: {},
      count: 0,
    };
    if (!categorySports) return organized;

    categorySports?.prematch.forEach((game) => {
      if(game.__t !== typeGame) return;

      if (!organized.championships[game.championship]) {
        organized.championships[game.championship] = [];
      }
      organized.championships[game.championship].push(game);
      organized.count += 1;
    });

    return organized;
  }, [categorySports?.prematch]) ?? { championships: {}, count: 0 };

  useEffect(() => {
    try {
      const ws = createWebSocket("events_sports");
      onOpen(ws);
      onMessage(ws, (event) => {
        const games = JSON.parse(event);
        onReceivedMessage(games);
      });

      onError(ws, () => {
        console.error("Erro ao conectar com o servidor");
        
      });

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          closeWS(ws);
        }
      };
    } catch {
      console.error("Erro ao conectar com o servidor");
    }
  }, []);

  useEffect(() => {
    try {
      const ws = createWebSocket("properties");

      onOpen(ws);

      onMessage(ws, (event) => {
        const info = JSON.parse(event);
        const flag = info && info[0].connection_down;
        setIsConnectionDown(flag);
      });

      onError(ws, () => {
        console.error("Erro ao conectar com o servidor");
        
      });

      return () => {
        if (ws.readyState === WebSocket.OPEN) {
          closeWS(ws);
        }
      };
    } catch {
      console.error("Erro ao conectar com o servidor");
    }
  }, []);

  return (
    <GameContext.Provider
      value={{
        handleFilter,
        games,
        categorySports,
        isConnectionDown,
        testOnReceivedMessage: onReceivedMessage,
        gamesLiveByChampionships,
        gamesPreMatchByChampionships,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
