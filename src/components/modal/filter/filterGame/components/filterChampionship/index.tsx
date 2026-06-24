import Text from "@/components/common/text";
import { Card, CardItem, ContainerMain, HeaderModal } from "../../styles";
import { ViewType } from "@/interfaces/filters";
import Icon from "@/utils/icon";
import Input from "@/components/common/input";
import { FiSearch } from "react-icons/fi";
import useFilterChampionship from "./useFilterChampionship";



export default function FilterChampionship({
  setCurrentView,
  championships,
  handleChampionshipChange,
  select,
}: FilterTypeProps) {
  const {search, handleFilterChampionship, championshipFilter} = useFilterChampionship({championships});
  return (
    <ContainerMain>
      <HeaderModal onClick={() => setCurrentView("main")}>
      <Icon name="arrowLeftIos" size={18} />
        <Text htmlTag="h1" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
          Voltar
        </Text>
      </HeaderModal>
      <Card>
        <Input
          name="Pesquisar"
          placeholder="Pesquisar"
          value={search}
          handleValue={(value) => handleFilterChampionship(value)}
          leftIcon={<FiSearch size={20} color="text.dynamic.whiteDynamic.80" />}
          height="48px"
        />
      </Card>
      
      <Card>
        <CardItem
          onClick={() => {
            handleChampionshipChange("");
            setCurrentView("main");
          }}
        >
          <Text htmlTag="h2" font="label/body/m/regular">
            Todos
          </Text>
        </CardItem>
      </Card>
      {championshipFilter.map((championship) => (
        <Card key={championship}>
          <CardItem
            onClick={() => {
              handleChampionshipChange(championship);
              setCurrentView("main");
            }}
            selected={championship === select}
          >
            <Text htmlTag="h2" font="label/body/m/regular">
              {championship}
            </Text>
          </CardItem>
        </Card>
      ))}
    </ContainerMain>
  );
}

interface FilterTypeProps {
  select: string;
  championships: string[];
  handleChampionshipChange: (type: string) => void;
  setCurrentView: (view: ViewType) => void;
}
