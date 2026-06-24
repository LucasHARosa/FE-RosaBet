import { Card, CardItem, ContainerMain, HeaderModal } from "../../styles";
import Text from "@/components/common/text";
import { Button } from "@/components/common/button";
import getImageSport from "@/utils/sports-icons";
import { ViewType } from "@/interfaces/filters";
import Icon from "@/utils/icon";

export default function FilterType({
  setCurrentView,
  eventTypes,
  handleEventTypeChange,
  select,
}: FilterTypeProps) {
  return (
    <ContainerMain>
      <HeaderModal onClick={() => setCurrentView("main")}>
        <Icon name="arrowLeftIos" size={18} />
        <Text htmlTag="h1" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
          Voltar
        </Text>
      </HeaderModal>
      <Card>
        <CardItem
          onClick={() => {
            handleEventTypeChange("");
            setCurrentView("main");
          }}
        >
          <Text htmlTag="h2" font="label/body/m/regular">
            Todos
          </Text>
        </CardItem>
      </Card>
      {eventTypes.map((eventType) => (
        <Card key={eventType}>
          <CardItem
            onClick={() => {
              handleEventTypeChange(eventType);
              setCurrentView("main");
            }}
            selected={eventType === select}
          >
            <Button.Icon icon={getImageSport(eventType)} size={30} />
            <Text htmlTag="h2" font="label/body/m/regular">
              {eventType}
            </Text>
          </CardItem>
        </Card>
      ))}
    </ContainerMain>
  );
}

interface FilterTypeProps {
  select: string;
  eventTypes: string[];
  handleEventTypeChange: (eventType: string) => void;
  setCurrentView: (view: ViewType) => void;
}
