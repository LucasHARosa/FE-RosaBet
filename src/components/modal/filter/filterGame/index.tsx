import { forwardRef } from "react";
import Text from "@/components/common/text";
import useFilterGame, { ModalFilterGameProps } from "./useFilterGame";
import {
  ButtonClear,
  ContainerButton,
  ContainerMain,
  ContainerModal,
  ContainerStatus,
  Row,
  Status,
} from "./styles";

import { Button } from "@/components/common/button";

import Calendar from "@/components/calendar";
import FilterType from "./components/filterType";
import FilterTeam from "./components/filterTeam";
import FilterChampionship from "./components/filterChampionship";
import ContentSelector from "./components/contentSelector";
import Input from "@/components/common/input";
import Modal from "../..";

const ModalFilterGame = forwardRef(({ events, handleFilter }: ModalFilterGameProps, ref) => {
  const {
    open,
    closeModal,
    currentView,
    setCurrentView,
    eventTypes,
    championships,
    teams,
    eventType,
    championship,
    optionStatus,
    team,
    status,
    startOdd,
    endOdd,
    selectionRange,
    handleEventTypeChange,
    handleChampionshipChange,
    handleTeamChange,
    handleEndOdd,
    handleStartOdd,
    setStatus,
    handleClear,
    handleSendFilter,
    setSelectionRange,
  } = useFilterGame(ref, { events, handleFilter });

  return (
    <Modal title="Filtros Esportes" onCancel={closeModal} visible={open} minHeight={600}>
      <ContainerModal>
        <div>
          {currentView === "main" && (
            <ContainerMain>
              <ContentSelector
                view="filterType"
                setCurrentView={setCurrentView}
                select={eventType}
                select_string="Esporte"
                icon={eventType}
              />
              <ContentSelector
                view="filterChampion"
                setCurrentView={setCurrentView}
                select={championship}
                select_string="Campeonato"
                icon={championship ? "trophy" : ""}
              />
              <ContentSelector
                view="filterTeam"
                setCurrentView={setCurrentView}
                select={team?.name}
                select_string="Time"
                shield={team?.coatOfArmsLink}
              />
              <Text htmlTag="h1" font="label/body/s/regular" color="text.dynamic.whiteDynamic.80">
                STATUS
              </Text>
              <ContainerStatus>
                {optionStatus.map((item) => (
                  <Status
                    key={item.type}
                    selected={status === item.type}
                    onClick={() => setStatus(item.type)}
                  >
                    <Text
                      htmlTag="h2"
                      font="label/body/m/regular"
                      color={status === item.type ? "" : "text.dynamic.whiteDynamic.64"}
                      style={{ textAlign: "center" }}
                    >
                      {item.name}
                    </Text>
                  </Status>
                ))}
              </ContainerStatus>
              <Text htmlTag="h1" font="label/body/s/regular" color="text.dynamic.whiteDynamic.80">
                Selecione o intervalo das Odds desejadas
              </Text>
              <Row>
                <Input
                  name="startOdd"
                  value={startOdd}
                  handleValue={handleStartOdd}
                  placeholder="De"
                  type="number"
                  width="50%"
                />
                <Input
                  name="endOdd"
                  value={endOdd}
                  handleValue={handleEndOdd}
                  placeholder="Até"
                  type="number"
                  width="50%"
                />
              </Row>

              <Text htmlTag="h1" font="label/body/s/regular" color="text.dynamic.whiteDynamic.80">
                Selecione as datas para aplicar o filtro
              </Text>
              <Calendar handleSetDate={setSelectionRange} ranges={selectionRange} />
            </ContainerMain>
          )}

          {currentView === "filterType" && (
            <FilterType
              setCurrentView={setCurrentView}
              eventTypes={eventTypes}
              handleEventTypeChange={handleEventTypeChange}
              select={eventType}
            />
          )}
          {currentView === "filterChampion" && (
            <FilterChampionship
              setCurrentView={setCurrentView}
              championships={championships}
              handleChampionshipChange={handleChampionshipChange}
              select={championship}
            />
          )}
          {currentView === "filterTeam" && (
            <FilterTeam
              setCurrentView={setCurrentView}
              teams={teams}
              handleTeamChange={handleTeamChange}
              select={team}
            />
          )}
        </div>

        <ContainerButton>
          <ButtonClear>
            <Button.Root
              orientation="h"
              onClick={handleClear}
              bg="background.dynamic.whiteDynamic.8"
              w="full"
              h={48}
              justifycontent="center"
              borderRadius={8}
            >
              <Button.Text htmlTag="h2" font="label/body/m/regular">
                Limpar
              </Button.Text>
            </Button.Root>
          </ButtonClear>

          <Button.Root
            orientation="h"
            onClick={handleSendFilter}
            bg="brand.primary.100"
            w="full"
            h={48}
            justifycontent="center"
            borderRadius={8}
          >
            <Button.Text htmlTag="h2" font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
              Aplicar Filtros
            </Button.Text>
          </Button.Root>
        </ContainerButton>
      </ContainerModal>
    </Modal>
  );
});

ModalFilterGame.displayName = "ModalFilterGame";
export default ModalFilterGame;
