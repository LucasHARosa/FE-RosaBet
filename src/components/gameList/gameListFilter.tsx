import { GiSoccerBall } from "react-icons/gi";
import { Button } from "../common/button";
import { GroupFilter } from "./styles";

interface GameListFilterProps {
  types: string[];
  value: string;
  handle: (value: string) => void;
}

export default function GameListFilter({ types, value, handle }: GameListFilterProps) {
  return (
    <GroupFilter>
      {types.map((item, id) => (
        <Button.Root
          key={id}
          orientation="h"
          bg="background.dynamic.whiteDynamic.4"
          border
          selected={value === item}
          onClick={() => handle(item)}
        >
          <Button.Icon icon={GiSoccerBall} size={16}  />
          <Button.Text htmlTag="h2" font="label/body/m/regular">
            {item}
          </Button.Text>
        </Button.Root>
      ))}
    </GroupFilter>
  );
}
