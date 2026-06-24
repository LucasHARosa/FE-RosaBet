/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { CoatOfArms, Container, Detail, Group, InfoFilter, Main, Nav } from "./styles";
import Text from "@/components/common/text";
import { useMemo } from "react";
import getImageCountry from "@/utils/mapped-country";
import { Button } from "@/components/common/button";
import { IoIosArrowBack } from "react-icons/io";
import getImageSport from "@/utils/sports-icons";
import FilterByType from "./components/type";
import FilterByTeam from "./components/team";
import FilterByChampionship from "./components/championship";
import FilterByCountry from "./components/country";

export default function Search() {
  const params = useSearchParams();
  const router = useRouter();

  const findImage = (type: string, value: string) => {
    switch (type) {
      case "country":
        return <CoatOfArms src={getImageCountry(value)} alt="image" width={28} height={28} />;
      case "gameType":
        const Icon = getImageSport(value);
        return <Icon size={22} />;
      default:
        return <></>;
    }
  };

  const showTitle = useMemo(() => {
    const entries = Array.from(params.entries());
    const lastEntry = entries.pop();
    const breadcrumbs = entries.map(([_, value]) => value).join(" / ");
    const key = lastEntry ? lastEntry[0] : "";
    const value = lastEntry ? lastEntry[1] : "";

    let Main = <></>;
    if (lastEntry && lastEntry[0] === "gameType") {
      Main = <FilterByType event={value} />;
    } else if (lastEntry && lastEntry[0] === "country") {
      Main = <FilterByCountry event={value} />;
    } else if (lastEntry && lastEntry[0] === "championship") {
      Main = <FilterByChampionship event={value} />;
    } else if (lastEntry && lastEntry[0] === "team") {
      Main = <FilterByTeam event={value} />;
    } else {
      console.log("mostrar tela de filtro não encontrado");
    }

    return {
      breadcrumbs,
      title: value,
      Image: lastEntry && findImage(key, value),
      Main,
    };
  }, [params]);

  return (
    <Container>
      <Nav>
        <Group>
          <Button.Root onClick={() => router.back()} bg="background.dynamic.whiteDynamic.4" justifycontent="center">
            <Button.Icon icon={IoIosArrowBack} size={18} color="background.absolute.whiteAbsolute.80" />
          </Button.Root>
          <Detail>
            {showTitle.Image}
            <InfoFilter>
              <Text color="background.absolute.whiteAbsolute.80" font="label/button/m/regular">
                {showTitle.breadcrumbs}
              </Text>
              <Text color="text.absolute.whiteAbsolute.100" font="label/button/m/bold">
                {showTitle.title}
              </Text>
            </InfoFilter>
          </Detail>
        </Group>
      </Nav>
      <Main>{showTitle.Main}</Main>
    </Container>
  );
}
