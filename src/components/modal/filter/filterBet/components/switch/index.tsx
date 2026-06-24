import Text from "@/components/common/text";
import { GroupInput } from "../../styles";
import { Item, Switch } from "./styles";
import { useEffect, useState } from "react";
import { SwitchFilterI } from "../../useFilterBet";

export default function ResultSwitch({ title, switchFilter, defaultChecked }: ResultSwitchProps) {
  const [active, setActive] = useState<number>(0);

  const handleActive = (item: SwitchFilterI) => {
    item.onClick();
    setActive(item.id);
  };

  useEffect(() => {
    if (defaultChecked) {
      const item = switchFilter.find((i) => i.value === defaultChecked);
      if (item) {
        setActive(item.id);
      }
    } else {
      setActive(0);
    }
  }, [defaultChecked]);

  return (
    <GroupInput>
      <Text
        htmlTag="h1"
        font="label/body/s/regular"
        color="text.dynamic.whiteDynamic.64"
        style={{ textTransform: "uppercase" }}
      >
        {title}
      </Text>
      <Switch>
        {switchFilter.map((item) => (
          <Item
            key={item.id}
            active={active === item.id}
            onClick={() => handleActive(item)}
            style={{ textTransform: "capitalize" }}
          >
            {item.name}
          </Item>
        ))}
      </Switch>
    </GroupInput>
  );
}

interface ResultSwitchProps {
  title: string;
  switchFilter: SwitchFilterI[];
  defaultChecked: string;
}
