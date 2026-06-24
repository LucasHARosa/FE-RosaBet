"use client";
import CardCasino from "@/components/card/casino";
import { Back, Collection, Container, Detail, Header, InfoLeft } from "./styles";
import { IoIosArrowBack } from "react-icons/io";
import Text from "@/components/common/text";
import Input from "@/components/common/input";
import { IoSearchOutline } from "react-icons/io5";
import { CasinoI } from "@/interfaces/casino";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getInfoCasino } from "@/utils/mapped-casino";
import Icon from "@/utils/icon";

export default function BodyCasinoFilter({ data, title }: BodyCasinoFilterProps) {
  const [filter, setFilter] = useState<string>("");
  const router = useRouter();

  const dataFiltered = useMemo(() => {
    return data.filter((game: CasinoI) => {
      return game.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter]);

  return (
    <Container>
      <Header>
        <InfoLeft>
          <Back onClick={() => router.back()}>
            <IoIosArrowBack size={24} />
          </Back>
          {/* {loading ? (
              <Detail>
                <SkeletonTheme baseColor="#202020" highlightColor="#444">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={120} height={16} />
                </SkeletonTheme>
              </Detail>
            ) : ( */}
          <Detail>
            <Icon name="dice" size={16} color="background.absolute.whiteAbsolute.80" />
            <Text font="label/button/m/regular" color="background.absolute.whiteAbsolute.80">
              Casino /
            </Text>
            <Text font="label/button/m/regular" color="text.absolute.whiteAbsolute.100">
              {getInfoCasino(title).name}
            </Text>
            <Text font="label/button/m/regular">{getInfoCasino(title)?.name}</Text>
          </Detail>
          {/* )} */}
        </InfoLeft>
        <Input
          name="Filtro"
          placeholder="Filtro"
          value={filter}
          handleValue={(value) => setFilter(value)}
          leftIcon={<IoSearchOutline size={18} />}
          background="background.absolute.whiteAbsolute.8"
        />
      </Header>

      <Collection>
        {dataFiltered.map((game: any, id: number) => (
          <CardCasino key={`detail-${id}`} game={game} type="p" />
        ))}
      </Collection>
    </Container>
  );
}

interface BodyCasinoFilterProps {
  data: CasinoI[];
  title: string;
}
