import { Button } from "@/components/common/button";
import { Details, Games, GroupCards, Left, Option, Summary, Switch, Title } from "./styles";
import { IoIosArrowBack } from "react-icons/io";
import { Card } from "@/components/card";
import { GameProps } from "@/interfaces/game";
import Text from "@/components/common/text";
import Icon from "@/utils/icon";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useContext, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GameContext } from "@/contexts/GameContext";
import { useWindow } from "@/hooks/window";

const onScrollSize = 3;

export default function LeftAside({ game }: LeftAsideProps) {
  const [tabActive, setTabActive] = useState<"LIVE" | "PREMATCH">("LIVE");
  const [countElements, setCountElements] = useState<number>(onScrollSize);
  const [isShrink, setIsShrink] = useState<boolean>(true);
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useWindow();

  const { gamesLiveByChampionships, gamesPreMatchByChampionships } = useContext(GameContext);

  const handleTab = (tab: "LIVE" | "PREMATCH") => {
    setCountElements(onScrollSize);
    setTabActive(tab);

    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  };

  const comeBack = () => {
    router.back();
  };

  const seeMoreGame = () => {
    setCountElements((prev) => prev + onScrollSize);
  };

  const gamesChampionships = useMemo(() => {
    if (tabActive === "LIVE") {
      return gamesLiveByChampionships(game.__t);
    } else {
      return gamesPreMatchByChampionships(game.__t);
    }
  }, [tabActive, gamesLiveByChampionships, gamesPreMatchByChampionships, game.__t]);

  return (
    <Left isMobile={isMobile}>
      <Button.Root orientation="h" onClick={comeBack}>
        <Button.Icon icon={IoIosArrowBack} size={18} />
        <Button.Text htmlTag="h2" font="label/button/m/bold">
          Voltar
        </Button.Text>
      </Button.Root>

      <Switch>
        <Option isActive={tabActive === "LIVE"} onClick={() => handleTab("LIVE")}>
          <Icon name="circlePlay" size={20} color="text.absolute.whiteAbsolute.100" />
          Ao vivo
        </Option>
        <Option isActive={tabActive === "PREMATCH"} onClick={() => handleTab("PREMATCH")}>
          <Icon name="calendarOutline" size={20} color="text.absolute.whiteAbsolute.100" />
          Em breve
        </Option>
      </Switch>

      <Title>
        <Text font="heading/m/bold">
          Jogos {tabActive === "LIVE" ? "ao vivo" : "em breve"} ({gamesChampionships.count})
        </Text>
        {isShrink ? (
          <div onClick={() => setIsShrink(false)}>
            <Icon name="arrowShrink" color="text.dynamic.whiteDynamic.64" size={24} />
          </div>
        ) : (
          <div onClick={() => setIsShrink(true)}>
            <Icon name="arrowMerge" color="text.dynamic.whiteDynamic.64" size={24} />
          </div>
        )}
      </Title>

      {Object.keys(gamesChampionships.championships).length > 0 &&
        <Games ref={listRef}>
          {Object.keys(gamesChampionships.championships).slice(0, countElements).map((championship, idChampion) => (
            <Details
              key={`championship-${idChampion}`}
              // open={isShrink || (idChampion < 3 && isShrink === undefined)}
              open={isShrink}
            >
              <Summary>
                <Text font="paragraph/m/semiBold">{championship}</Text>
                <FaAngleDown id="close" />
                <FaAngleUp id="open" />
              </Summary>
              <GroupCards>
                {gamesChampionships.championships[championship].map((game: GameProps, idGame: number) => (
                  <Card.Grid
                    key={`ch-${idChampion}-game-${idGame}`}
                    game={game}
                  // isSelected={params.enet_code === game.enet_code.split(":")[2]}
                  />
                ))}
              </GroupCards>
            </Details>
          ))}
          <Button.Root onClick={seeMoreGame} w="full" bg="brand.primary.100">
            Ver mais
          </Button.Root>
        </Games>
      }
    </Left>
  )
};

interface LeftAsideProps {
  game: GameProps;
}