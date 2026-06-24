/* eslint-disable @next/next/no-img-element */
"use client";
import Text from "@/components/common/text";
import Market from "@/components/market";

import Loading from "./loading";
import {
  Center,
  CoatOfArms,
  GroupCoast,
  GroupFilter,
  GroupMarkets,
  GroupMatch,
  HomeCoast,
  InfoMatch,
  InfoTeam,
  OutCoast,
  Paper,
  Score,
  Scoreboard,
  Timer
} from "./styles";
import useGame from "./useGame";
import AliceCarousel from "react-alice-carousel";
import { useMemo } from "react";
import RightAside from "./components/Right";
import LeftAside from "./components/Left";

interface PageProps {
  params: {
    enet_code: string;
  };
}

export default function MarketPage({ params }: PageProps) {
  const { marketsData, selectedMarket, isLoading, isMobile, items, bannerGame, timerGame, statsList, onScroll } =
    useGame(params.enet_code);

  const mappersName = useMemo(() => {
    switch (marketsData.status) {
      case "NOT_STARTED":
        return {
          name: "EM BREVE",
          color: "brand.secondary.accent.textYellow"
        }
      case "LIVE":
        return {
          name: "AO VIVO",
          color: "brand.secondary.100"
        }
      case "FINISHED":
        return {
          name: "FINALIZADO",
          color: "brand.secondary.accent.green.100"
        }
      case "CANCELLED":
        return {
          name: "CANCELADO",
          color: "brand.primary.100"
        }
      default:
        return null;
    }
  }, [marketsData.status]);

  return (
    <div style={{ display: "flex", height: "calc(100vh - 80px)", overflow: "scroll" }}>
      <LeftAside game={marketsData} />
      <Center onScroll={onScroll} isMobile={isMobile}>
        {!marketsData || isLoading ? (
          <Loading />
        ) : (
          <>
            <InfoTeam bg={bannerGame}>
              <HomeCoast image={marketsData.home_coats_of_arms_link} />
              <GroupCoast>
                <CoatOfArms>
                  <img
                    src={marketsData.home_coats_of_arms_link}
                    alt="coast_home"
                    width={64}
                    height={64}
                  />
                  <Text font="paragraph/m/semiBold" color="text.absolute.whiteAbsolute.100">
                    {marketsData.home_team}
                  </Text>
                </CoatOfArms>
                <Scoreboard>
                  {/* <div dangerouslySetInnerHTML={{ __html: timer }} /> */}
                  <Score>{marketsData.home_score}</Score>
                  <Timer>{timerGame || marketsData.played_time}</Timer>
                  <Score>{marketsData.away_score}</Score>
                </Scoreboard>
                <CoatOfArms>
                  <img
                    src={marketsData.out_coats_of_arms_link}
                    alt="coast_out"
                    width={64}
                    height={64}
                  />
                  <Text font="paragraph/m/semiBold" color="text.absolute.whiteAbsolute.100">
                    {marketsData.out_team}
                  </Text>
                </CoatOfArms>
              </GroupCoast>
              <GroupMatch>
                <InfoMatch>
                  <Text
                    htmlTag="h1"
                    font="label/body/xs/regular"
                    color={mappersName?.color}
                    bg="background.absolute.whiteAbsolute.24"
                  >
                    {mappersName?.name}
                  </Text>
                  <Text
                    htmlTag="h1"
                    font="label/body/xs/regular"
                    color="brand.secondary.accent.textYellow"
                    bg="background.absolute.whiteAbsolute.24"
                  >
                    + {marketsData.valid_odds} cotações
                  </Text>
                </InfoMatch>
                {marketsData.status !== "NOT_STARTED" &&
                  <InfoMatch>
                    {statsList.map((stat, index) => (
                      <div key={index} style={{ display: 'flex', gap: '4px' }}>
                        {stat.icon}
                        <small>{stat.text}</small>
                      </div>
                    ))
                    }
                    {/* <Probability>
                    <div dangerouslySetInnerHTML={{ __html: probabilityWin }} />
                  </Probability> */}
                  </InfoMatch>
                }
              </GroupMatch>
              <OutCoast image={marketsData.out_coats_of_arms_link} />
            </InfoTeam>
            <GroupFilter isFixed={false} isMobile={isMobile}>
              <AliceCarousel
                mouseTracking
                items={items}
                controlsStrategy="alternate"
                autoWidth
                autoHeight
                disableDotsControls
                disableButtonsControls
              />
            </GroupFilter>
          </>
        )}

        {marketsData &&
          <Paper>
            {marketsData.markets?.map(
              (market: any, id: number) =>
                market &&
                market.items.length > 0 &&
                selectedMarket === market.id && (
                  <GroupMarkets key={`market-${id}`}>
                    {market.items.length > 0 ? market.items.map((item: any, itemId: number) => (
                      <Market key={`market-${id}-item-${itemId}`} item={item} game={marketsData} isOpen={itemId < 5} />
                    )) : (
                      <Text font="label/body/xs/regular" color="text.absolute.whiteAbsolute.100">
                        Não há cotações disponíveis
                      </Text>
                    )}
                  </GroupMarkets>
                ),
            )}
          </Paper>
        }
      </Center>
      <RightAside />
    </div>
  );
}
