"use client";
import { BoxLeft, BoxRight, Container, ContainerGuides, Header, Title } from "./styles";
import Text from "@/components/common/text";
import useSupport from "./useSupport";
import ListGuides from "./components/listGuides";
import NotSelected from "./components/notSelected";
import SupportExpanded from "./components/supportExpanded";
import Input from "@/components/common/input";
import { FiSearch } from "react-icons/fi";

export default function Support() {
  const {
    isViewDetail,
    selectedGuide,
    search,
    handleFilterGuides,
    filterGuides,
    handleOpenDetails,
    handleCloseDetails,
  } = useSupport();
  return (
    <Container>
      <BoxLeft isViewMobile={isViewDetail}>
        <Header>
          <Title>
            <Text htmlTag="h1" font="heading/m/bold">
              Central de ajuda
            </Text>
            <Text htmlTag="h1" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.80">
              Aqui você encontra todos as suas duvidas
            </Text>
          </Title>
          <Input
            name="Pesquisar"
            placeholder="Pesquisar"
            value={search}
            handleValue={(value) => handleFilterGuides(value)}
            leftIcon={<FiSearch size={20} color="text.dynamic.whiteDynamic.80" />}
            height="48px"
          />
        </Header>
        <ContainerGuides>
          <ListGuides
            guideCategory={filterGuides}
            handleSelectGuide={handleOpenDetails}
            selectedGuide={selectedGuide}
          />
        </ContainerGuides>
      </BoxLeft>
      <BoxRight isViewMobile={isViewDetail}>
        {selectedGuide ? (
          <SupportExpanded guide={selectedGuide} handleCloseGuide={handleCloseDetails} />
        ) : (
          <NotSelected />
        )}
      </BoxRight>
    </Container>
  );
}
