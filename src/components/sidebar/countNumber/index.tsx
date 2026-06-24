import Text from "@/components/common/text";
import { Circle, CircleInternal, ContainerNumber } from "./styles";

export default function CountNumber({ count=0, live, select=false }: CountNumberProps) {
  return (
    <ContainerNumber select={select} live={live} count={count}>
      <Circle select={select} live={live}>
        <CircleInternal select={select} live={live}/>
      </Circle>
      <Text htmlTag="h4" font="label/button/xs/bold" color={live && !select ? "brand.secondary.100":"text.absolute.whiteAbsolute.100"}>
        {count}
      </Text>
    </ContainerNumber>
  );
}

interface CountNumberProps {
  count?: number;
  live?: boolean;
  select?: boolean;
}
