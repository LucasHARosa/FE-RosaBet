import { Card, CardItem, ContainerMain, HeaderModal } from "../../styles";
import Text from "@/components/common/text";
import Image from "next/image";
import { Team, ViewType } from "@/interfaces/filters";
import Icon from "@/utils/icon";
import Input from "@/components/common/input";
import { FiSearch } from "react-icons/fi";
import useFilterTeam from "./useFilterTeam";

export default function FilterTeam({
  setCurrentView,
  teams,
  handleTeamChange,
  select,
}: FilterTypeProps) {
  const {search, handleFilterTeams, teamsFilter} = useFilterTeam({teams});
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
          handleValue={(value) => handleFilterTeams(value)}
          leftIcon={<FiSearch size={20} color="text.dynamic.whiteDynamic.80" />}
          height="48px"
        />
      </Card>
      <Card>
        <CardItem
          onClick={() => {
            handleTeamChange({} as Team);
            setCurrentView("main");
          }}
        >
          <Text htmlTag="h2" font="label/body/m/regular">
            Todos
          </Text>
        </CardItem>
      </Card>
      {teamsFilter.map((team) => (
        <Card key={team.name}>
          <CardItem
            selected={team.name === select.name}
            onClick={() => {
              handleTeamChange(team);
              setCurrentView("main");
            }}
          >
            <Image
              src={team.coatOfArmsLink}
              alt={team.name}
              width={32}
              height={32}
              loading="lazy"
            />
            <Text htmlTag="h2" font="label/body/m/regular">
              {team.name}
            </Text>
          </CardItem>
        </Card>
      ))}
    </ContainerMain>
  );
}

interface FilterTypeProps {
  select: Team;
  teams: Team[];
  handleTeamChange: (team: Team) => void;
  setCurrentView: (view: ViewType) => void;
}
