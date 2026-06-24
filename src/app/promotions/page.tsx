"use client";;
import { AddCode, BoxLeft, BoxRight, Container, ContainerCards, Header } from "./styles";
import usePromotions from "./usePromotions";
import Text from "@/components/common/text";
import { ModalInputPromotion } from "@/components/modal/inputPromotion";
import PromotionsExpanded from "./components/promotionExpanded";

import ModalAlert from "@/components/modal/alert";
import ListPromotions from "./components/listPromotions";
import NotSelected from "./components/notSelected";
import { ModalPromotionCorrectScore } from "@/components/modal/promotionCorrectScore";
import { ModalPromotionJackpot } from "@/components/modal/promotionJackpot";
import Icon from "@/utils/icon";
import { Button } from "@/components/common/button";


export default function Promotions() {
  const {
    modalCodeRef,
    modalPromotionCorrectScore,
    modalPromotionJackpot,
    modalSuccessRef,
    isViewDetail,
    handleCloseDetails,
    promotions,
    selectPromotion,
    handleSelectPromotion,
    handleOpenModalCode,
    loading,
    handleUsePromotion,
    handleParticipatePromotion,
    refreshPromotions,
    handleSuccess,
  } = usePromotions();
  return (
    <Container>
      <BoxLeft isViewMobile={isViewDetail}>
        <Header>
          <Text htmlTag="h1" font="heading/l/bold">
            Promoções
          </Text>
        </Header>
        <ContainerCards>
          <AddCode >
            <Button.Root
              bg="brand.secondary.accent.bgYellow"
              orientation="h"
              onClick={handleOpenModalCode}
              h={48}
            >
              <Button.Text htmlTag="small" font="label/button/m/bold" color="brand.secondary.accent.textYellow">
                Adicionar Código
              </Button.Text>
              <Icon name="plus" size={20} color="brand.secondary.accent.textYellow" />
            </Button.Root>
          </AddCode>
          <ListPromotions
            promotions={promotions}
            selectPromotion={selectPromotion}
            handleSelectPromotion={handleSelectPromotion}
            loading={loading}
          />
        </ContainerCards>
      </BoxLeft>
      <BoxRight isViewMobile={isViewDetail}>
        {selectPromotion ? (
          <PromotionsExpanded
            promotion={selectPromotion}
            handleUsePromotion={handleUsePromotion}
            handleParticipatePromotion={handleParticipatePromotion}
            handleCloseDetails={handleCloseDetails}
          />
        ) : (
          <NotSelected />
        )}
      </BoxRight>

      <ModalInputPromotion
        ref={modalCodeRef}
        refreshPromotions={refreshPromotions}
        title="Código de Promoção"
        inputName="Código"
      />

      <ModalAlert
        ref={modalSuccessRef}
        title="Aposta Realizada"
        message="Sua aposta foi realizada com sucesso!"
        type="success"
      />

      {selectPromotion && (
        <>
          <ModalPromotionCorrectScore
            ref={modalPromotionCorrectScore}
            promotion={selectPromotion}
            refreshPromotions={refreshPromotions}
            handleSuccess={handleSuccess}
          />
          <ModalPromotionJackpot
            ref={modalPromotionJackpot}
            promotion={selectPromotion}
            refreshPromotions={refreshPromotions}
            handleSuccess={handleSuccess}
          />
        </>
      )}
    </Container>
  );
}
