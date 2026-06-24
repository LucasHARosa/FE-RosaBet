import { IoIosArrowForward } from "react-icons/io";

import Text from "@/components/common/text";
import Image from "next/image";
import { Button } from "@/components/common/button";
import getImageSport from "@/utils/sports-icons";
import { IconWrapper, Row, SelectWrapper } from "./styles";
import { ViewType } from "@/interfaces/filters";

export default function ContentSelector({
  view,
  setCurrentView,
  select,
  select_string,
  shield,
  icon,
}: ContentSelectorProps) {
  return (
    <SelectWrapper onClick={() => setCurrentView(view)}>
      <Row>
        {shield && <Image src={shield} alt={select} width={32} height={32} loading="lazy" />}
        {icon && <Button.Icon icon={getImageSport(icon)} size={30} />}

        <Text htmlTag="h1" font="label/body/m/regular" color={select ? "" : "text.dynamic.whiteDynamic.80"}>
          {select ? select : select_string}
        </Text>
      </Row>
      <IconWrapper>
        <IoIosArrowForward />
      </IconWrapper>
    </SelectWrapper>
  );
}

interface ContentSelectorProps {
  view: ViewType;
  setCurrentView: (view: ViewType) => void;
  select: string;
  select_string: string;
  shield?: string;
  icon?: string;
}
