/* eslint-disable @next/next/no-img-element */
import { GroupOdds, InfoTeam, Item, OddItem } from "../styles";
import Text from "@/components/common/text";
import { dateConverter } from "@/utils/data-converter";
import { DataI } from "@/interfaces/highlights";
import { useMemo } from "react";

export default function SportHighlight({ highlight, settings, position }: SportHighlightProps) {
  const banner = settings[highlight.__t?.toUpperCase()];
  const sortingRandom = banner?.length > 1 ? Math.floor(position % banner.length) : 0;

  const urlImage = useMemo(() => {
    if (highlight.type === "SPORT") return banner[sortingRandom];
    return "";
  }, [settings, highlight.__t]);

  return (
    <Item img={urlImage} isSport>
      {highlight.type === "SPORT" && (
        <>
          <Text font="label/body/s/regular" color="text.dynamic.whiteDynamic.80">{dateConverter(highlight.date)}</Text>
          <InfoTeam>
            <img
              src={highlight.home_coats_of_arms_link}
              alt={"home_coats"}
              width={24}
              height={24}
            />
            <Text htmlTag="strong" font="label/body/m/bold">
              {highlight.home_team}
            </Text>
          </InfoTeam>
          <InfoTeam>
            <img
              src={highlight.out_coats_of_arms_link}
              alt={"out_coats"}
              width={24}
              height={24}
            />
            <Text htmlTag="strong" font="label/body/m/bold">
              {highlight.out_team}
            </Text>
          </InfoTeam>
          <GroupOdds>
            <OddItem>
              <p>-</p>
            </OddItem>
            <OddItem>
              <p>-</p>
            </OddItem>
            <OddItem>
              <p>-</p>
            </OddItem>
          </GroupOdds>
        </>
      )}
    </Item>
  );
}

interface SportHighlightProps {
  highlight: DataI;
  settings: {
    [key: string]: string[];
  };
  position: number;
}
