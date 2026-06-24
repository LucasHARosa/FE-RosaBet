"use client";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import DetailsBet from "./components/details";
import SectionBet from "./components/sectionBet";
import { BoxLeft, BoxRight, Container, GroupInput, Header, NotSelected, Section } from "./styles";
import useMyBets from "./useMyBets";
import { Button } from "@/components/common/button";
import ModalFilterBet from "@/components/modal/filter/filterBet";
import { Badge } from "@mui/material";
import Icon from "@/utils/icon";

export default function MyBets() {
  const {
    viewDetails,
    details,
    loadingDetail,
    loadingBetsAll,
    isViewDetail,
    setIsViewDetail,
    cashoutBet,
    handleInputChange,
    input,
    betSettings,
    isMobile,
    modalRefFilter,
    handleFilter,
    filterOptions,
    openFilter,
    applyFilters,
  } = useMyBets();

  return (
    <Container isMobile={isMobile}>
      <BoxLeft isViewMobile={isViewDetail} isMobile={isMobile}>
        <Header>
          <Text htmlTag="h1" font="heading/l/bold">
            Minhas Apostas
          </Text>
          <GroupInput>
            <Input
              name="Buscar"
              placeholder="Pesquisar"
              value={input}
              handleValue={handleInputChange}
              leftIcon={<Icon name="search" color="text.dynamic.whiteDynamic.64" size={18} />}
              width="100%"
              height="40px"
            />
            <Button.Root
              onClick={openFilter}
              bg="background.dynamic.whiteDynamic.4"
              borderRadius={8}
              justifycontent="center"
            >
              <Badge color="default" badgeContent={filterOptions.length}>
                <Icon name="filter" color="brand.secondary.100" size={18} />
              </Badge>
            </Button.Root>
          </GroupInput>
        </Header>
        <Section>
          <SectionBet
            title="Apostas em aberto"
            bets={applyFilters.opened}
            loading={loadingBetsAll}
            viewDetails={viewDetails}
            betDetails={details}
            betSettings={betSettings}
            isMobile={isMobile}
          />
        </Section>
        <Section>
          <SectionBet
            title="Apostas encerradas"
            bets={applyFilters.closed}
            loading={loadingBetsAll}
            viewDetails={viewDetails}
            betDetails={details}
            betSettings={betSettings}
            isMobile={isMobile}
          />
        </Section>
      </BoxLeft>
      <BoxRight isViewMobile={isViewDetail}>
        {details._id && isViewDetail ? (
          <DetailsBet
            details={details}
            setIsViewDetail={setIsViewDetail}
            cashoutBet={cashoutBet}
            loading={loadingDetail}
            betSettings={betSettings}
          />
        ) : (
          <NotSelected>
            <Icon name="ticket" size={120} color="text.dynamic.whiteDynamic.40" />
            <Text htmlTag="h6" font="heading/m/bold">
              Selecione um cupom de aposta
            </Text>
            <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.64">
              Escolha um cupom para visualizar suas informações completas
            </Text>
          </NotSelected>
        )}
      </BoxRight>

      <ModalFilterBet ref={modalRefFilter} selectedFilter={filterOptions} onSubmit={handleFilter} />
    </Container>
  );
}
