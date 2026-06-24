"use client";

import { GameContext } from "@/contexts/GameContext";
import { UserContext } from "@/contexts/UserContext";
import { useMenuBar } from "@/contexts/SidebarContext";
import {useContext, useEffect, useMemo, useState } from "react";
import _ from "lodash";
import { useWindow } from "@/hooks/window";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {  PiNumberCircleSevenFill } from "react-icons/pi";
import { GiSoccerBall, GiStopwatch } from "react-icons/gi";
import { FaCirclePlay, FaGift, FaTicket, FaUser } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import getImageSport from "@/utils/sports-icons";
import { RouterProps } from "@/interfaces/sideBar";
import getImageCountry from "@/utils/mapped-country";
import { TbMessageQuestion } from "react-icons/tb";
import { useTheme } from "@/contexts/ThemeContext";
import { IoSunny } from "react-icons/io5";


export default function useSidebar() {
  const { toggleTheme } = useTheme();
  const [categorySportsMenu, setCategorySportsMenu] = useState<RouterProps[]>([]);
  const { openSideBar, setOpenSideBar } = useMenuBar();
  const { getUser, isAuthenticaded, loading, openLogin } = useContext(UserContext);
  const { categorySports, games } = useContext(GameContext);
  const { isMobile } = useWindow();
  const router = useRouter();
  const currentPath = usePathname();
  const isGameDetail = currentPath.split("/")[1] === "game";

  useEffect(() => {
    if (!categorySports) return;
    const typeSportsLive = _.uniq(_.map(categorySports?.live, "__t"));
    const typeSportsNotLive = _.uniq(_.map(categorySports?.prematch, "__t"));

    const allSports = _.uniq([...typeSportsLive, ...typeSportsNotLive]);
    const allSportsRouter = allSports.map((sport) => {
      return {
        title: sport,
        redirect: `/sport/${sport}`,
        icon: getImageSport(sport),
        count: categorySports.prematch.filter((game) => game.__t === sport).length + categorySports.live.filter((game) => game.__t === sport).length,
        is_live: categorySports.live.some((game) => game.__t === sport),
        link: sport,
      };
    });
    setCategorySportsMenu(allSportsRouter);
  }, [categorySports]);

  const handleMenu = (menu: string) => {
    if (menu === "toggleTheme") return toggleTheme();
    router.push(menu);
    if (isMobile) setOpenSideBar(false);
  };


  const openFilter = (championship: any) => {
    if(isMobile) setOpenSideBar(false);
    return router.push(
      `/search?gameType=${championship.type}&championship=${encodeURIComponent(championship.championship)}`,
    );
  };

  const openTransactions = () => {
    if (isAuthenticaded) {
      router.push("/profile/transactions");
      setOpenSideBar(false);
    } else {
      openLogin();
    }
  }

  const championshipMenu = useMemo(() => {
    const organized = games.reduce((acc: any, game) => {
      if (!acc[game.country]) {
        acc[game.country] = {
          country: game.country,
          count: 0,
          is_live: false,
          src: getImageCountry(game.country),
          championships: [],
        };
      }

      let championship = acc[game.country].championships.find(
        (ch: any) => ch.championship === game.championship,
      );

      if (!championship) {
        championship = {
          championship: game.championship,
          type: game.__t,
          count: 0,
          is_live: false,
        };
        acc[game.country].championships.push(championship);
      }

      championship.count += 1;
      championship.is_live = championship.is_live || game.is_live;
      acc[game.country].count += 1;
      acc[game.country].is_live = acc[game.country].is_live || game.is_live;

      acc[game.country].championships.sort((a: any, b: any) =>
        a.championship.localeCompare(b.championship),
      );

      return acc;
    }, {});

    const organizedArray = Object.values(organized).sort((a: any, b: any) => {
      // if (a.is_live && !b.is_live) return -1
      // if (!a.is_live && b.is_live) return 1
      return a.country.localeCompare(b.country);
    });

    return organizedArray
  }, [games]);

  
  const homeMenu = [
    {
      title: "Início",
      redirect: "/",
      icon: TiHome,
    },
    {
      title: "Cassino",
      redirect: "/casino",
      icon: PiNumberCircleSevenFill,
    },
    {
      title: "Esportes",
      redirect: "/sport",
      icon: GiSoccerBall,
      count: games.length,
    },
  ] as RouterProps[];

  const specialMenu = [
    {
      title: "Resgatar agora",
      redirect: "/promotions",
      icon: FaGift,
    },
  ] as RouterProps[];

  const typeSportMenu = [
    {
      title: "Minhas apostas",
      redirect: "/my-bets",
      icon: FaTicket,
      isView: getUser?._id ? true : false,
    },
    {
      title: "Em breve",
      redirect: "/pre-match",
      icon: GiStopwatch,
      count: categorySports?.prematch.length,
      isView: true,
    },
    {
      title: "Ao vivo",
      redirect: "/live",
      icon: FaCirclePlay,
      count: categorySports?.live.length,
      isView: true,
      is_live: true,
    },
  ] as RouterProps[];

  const myAccountMenu = [
    {
      title: "Minha conta",
      redirect: "/profile",
      icon: FaUser,
      isView: getUser?._id? true : false,
    },
    {
      title: "Notificações",
      redirect: "/profile/notifications",
      icon: IoMdNotifications,
      isView: getUser?._id? true : false
    },
    {
      title: "Mudar Tema",
      
      icon: IoSunny,
      redirect: "toggleTheme",
      isView: true,
    },
    {
      title: "Suporte",
      redirect: "/support",
      icon: TbMessageQuestion,
      isView: true,
    },
  ] as RouterProps[];
  
  return{
    categorySportsMenu,
    openSideBar,
    setOpenSideBar,
    isGameDetail,
    homeMenu,
    specialMenu,
    typeSportMenu,
    myAccountMenu,
    handleMenu,
    championshipMenu,
    openFilter,
    currentPath,
    isMobile,
    getUser,
    isAuthenticaded,
    loading,
    openLogin,
    openTransactions
  }
}