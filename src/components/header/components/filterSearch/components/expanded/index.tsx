import { startTransition, useContext, useMemo, useState } from "react";
import { Box, Card, Detail, Filter, GroupFilter, Info, NotFound } from "./styles";
import { GameContext } from "@/contexts/GameContext";
import Image from "next/image";
import Text from "@/components/common/text";
import getImageCountry from "@/utils/mapped-country";
import { useRouter } from "next/navigation";
import { StorageContext } from "@/contexts/StorageContext";
import { useMenuBar } from "@/contexts/SidebarContext";
import { useWindow } from "@/hooks/window";
import Icon from "@/utils/icon";

export default function FilterExpanded({ valueSearch, onClose }: FilterSummaryProps) {
  const [filter, setFilter] = useState<Filters>();
  const { games } = useContext(GameContext);
  const { getStorage, setStorage } = useContext(StorageContext);
  const { openSideBar, setOpenSideBar } = useMenuBar();
  const { isMobile } = useWindow();
  const router = useRouter();

  const data = useMemo(() => {
    const aux: { [key: string]: any } = {};

    startTransition(() => {
      games.forEach((game) => {
        const championship = game.championship.toLowerCase();
        const country = game.country.toLowerCase();
        const home_team = game.home_team.toLowerCase();
        const out_team = game.out_team.toLowerCase();
        const type = game.__t.toLowerCase();
        const valueSearchLower = valueSearch.toLowerCase();

        if (championship.includes(valueSearchLower)) {
          if (!aux[championship]) {
            aux[championship] = {
              type: "championship",
              name: game.championship,
              country: game.country,
              championship: game.championship,
              gameType: game.__t,
            };
          }
        }

        if (country.includes(valueSearchLower)) {
          if (!aux[country]) {
            aux[country] = {
              type: "country",
              name: game.country,
              image: getImageCountry(game.country),
              championship: game.championship,
              country: game.country,
              gameType: game.__t,
            };
          }
        }

        if (type.includes(valueSearchLower)) {
          if (!aux[type]) {
            aux[type] = {
              type: "type",
              name: game.__t,
              championship: game.championship,
              country: game.country,
              gameType: game.__t,
            };
          }
        }

        if (home_team.includes(valueSearchLower)) {
          if (!aux[home_team] && aux[home_team]?.type !== type) {
            aux[home_team] = {
              type: "team",
              name: game.home_team,
              image: game.home_coats_of_arms_link,
              championship: game.championship,
              country: game.country,
              gameType: game.__t,
            };
          }
        }

        if (out_team.includes(valueSearchLower)) {
          if (!aux[out_team]) {
            aux[out_team] = {
              type: "team",
              name: game.out_team,
              image: game.out_coats_of_arms_link,
              championship: game.championship,
              country: game.country,
              gameType: game.__t,
            };
          }
        }
      });
    });

    return Object.values(aux).sort((a: any, b: any) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }, [valueSearch, games]);

  const filteredData = useMemo(() => {
    if (!filter) return data;

    return data.filter((game: any) => game.type === filter);
  }, [filter, data]);

  const handleFilter = (step: Filters) => {
    if (filter === step) {
      setFilter(undefined);
    } else {
      setFilter(step);
    }
  };

  const queryRedirect = (game: any) => {
    if(openSideBar && isMobile) setOpenSideBar(false);
    const filters = getStorage("filters") || [];

    if (!filters.includes(valueSearch)) {
      filters.unshift(valueSearch);
      setStorage("filters", JSON.stringify(filters));
    }

    let url = `/search?gameType=${encodeURIComponent(game.gameType)}`;

    if (game.type === "country") {
      url += `&country=${encodeURIComponent(game.country)}`;
    }

    if (game.type === "championship") {
      url += `&country=${encodeURIComponent(game.country)}&championship=${encodeURIComponent(game.championship)}`;
    }

    if (game.type === "team") {
      url += `&country=${encodeURIComponent(game.country)}&team=${encodeURIComponent(game.name)}`;
    }

    router.push(url);
    onClose();
  };

  return (
    <Box>
      <GroupFilter>
        <Filter onClick={() => handleFilter("team")} isSelected={filter === "team"}>
          equipe
        </Filter>
        <Filter onClick={() => handleFilter("championship")} isSelected={filter === "championship"}>
          competição
        </Filter>
        <Filter onClick={() => handleFilter("country")} isSelected={filter === "country"}>
          região
        </Filter>
      </GroupFilter>
      {filteredData.length === 0 ? (
        <NotFound>Nenhum resultado de pesquisa</NotFound>
      ) : (
        filteredData.map((game: any, id: number) => (
          <Card key={`input-${id}`} onClick={() => queryRedirect(game)}>
            <Info>
              {game.image && <Image src={game.image} alt={game.name} width={24} height={24} />}
              <Detail>
                <Text font="label/body/m/semiBold">
                  {game.name}
                </Text>
                <Text color="text.dynamic.whiteDynamic.64" font="label/body/xs/regular">
                  {game.country} - {game.gameType}
                </Text>
              </Detail>
            </Info>
            <Icon name="arrowRight" size={16} color="text.dynamic.whiteDynamic.64" />
          </Card>
        ))
      )}
    </Box>
  );
}

interface FilterSummaryProps {
  valueSearch: string;
  onClose: () => void;
}

type Filters = "team" | "championship" | "country" | undefined;
