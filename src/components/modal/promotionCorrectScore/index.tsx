/* eslint-disable react/display-name */
"use client";
import { forwardRef } from "react";
import Text from "@/components/common/text";
import Modal from "..";
import usePromotionCorrectScore, { PromotionCorrectScoreProps } from "./usePromotionCorrectScore";
import { Container, ContainerCards, ContainerError, Header } from "./styles";
import { Card } from "@/components/card";
import { Button } from "@/components/common/button";
import Loading from "./loading";

export const ModalPromotionCorrectScore = forwardRef(
  ({ promotion, refreshPromotions, handleSuccess }: PromotionCorrectScoreProps, ref) => {
    const {
      open,
      closeModal,
      events,
      loading,
      betLoading,
      handleChangeScore,
      buttonSendDisable,
      onSubmit,
      errorMessage,
      eventsError,
    } = usePromotionCorrectScore(ref, { promotion, refreshPromotions, handleSuccess });

    return (
      <Modal minHeight={500} title="Cupom Placar Exato" onCancel={closeModal} visible={open}>
        <Container>
          <Header>
            <Text htmlTag="h1" font="label/body/m/regular">
              Concorra até R$ {events?.prize_amount ? events?.prize_amount : 500},00
            </Text>
            <Text htmlTag="small" font="label/body/m/regular">
              Insira e acerte o resultado das partidas
            </Text>
            {errorMessage && (
              <Text htmlTag="small" font="label/body/m/regular" color="brand.secondary.100">
                {errorMessage}
              </Text>
            )}
          </Header>
          <ContainerCards>
            {loading ? (
              <Loading />
            ) : (
              <>
                {eventsError ? (
                  <ContainerError>
                    <Text
                      htmlTag="small"
                      font="label/body/m/regular"
                      color="brand.secondary.100"
                      style={{ textAlign: "center" }}
                    >
                      {eventsError}
                    </Text>
                  </ContainerError>
                ) : (
                  <>
                    {events?.sports.map((game, id) => (
                      <Card.CorrectScore
                        game={game}
                        key={id}
                        handleChangeScore={handleChangeScore}
                      />
                    ))}
                  </>
                )}
              </>
            )}
          </ContainerCards>

          <Button.Root
            orientation="h"
            onClick={onSubmit}
            bg="brand.primary.100"
            w="full"
            h={48}
            justifycontent="center"
            borderRadius={8}
            disabled={buttonSendDisable()}
            isLoading={betLoading}
          >
            <Button.Text htmlTag="h2" font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
              Fazer palpite
            </Button.Text>
          </Button.Root>
        </Container>
      </Modal>
    );
  },
);
