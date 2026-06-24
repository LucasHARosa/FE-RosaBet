/* eslint-disable react/display-name */
"use client";
import { forwardRef } from "react";
import Text from "@/components/common/text";
import Modal from "..";

import { Container, ContainerCards, ContainerError, Header, Title } from "./styles";
import { Card } from "@/components/card";
import { Button } from "@/components/common/button";

import Loading from "./loading";
import usePromotionJackpot, { PromotionJackpotProps } from "./usePromotionJackpot";

export const ModalPromotionJackpot = forwardRef(
  ({ promotion, refreshPromotions, handleSuccess }: PromotionJackpotProps, ref) => {
    const {
      open,
      closeModal,
      events,
      loading,
      betLoading,
      handleChangeWinner,
      buttonSendDisable,
      onSubmit,
      errorMessage,
      eventsError,
      numberSportsMain,
      numberSportsReserve,
    } = usePromotionJackpot(ref, { promotion, refreshPromotions, handleSuccess });

    return (
      <Modal minHeight={500} title="Cupom Bolão Cortesia" onCancel={closeModal} visible={open}>
        <Container>
          <Header>
            <Title>
              <Text
                htmlTag="h1"
                font="label/body/m/regular"
                style={{ textAlign: "center", alignItems: "center" }}
              >
                Concorra até R$ {events?.prize_amount ? events?.prize_amount : 1000},00
              </Text>
            </Title>
            <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
              Marque o resultado final da partida, se o time da casa ganha, se o time de fora ganha
              ou se o resultado e empate. Selecione {numberSportsMain()} jogos principais{" "}
              {numberSportsReserve()} jogos reservas
            </Text>
            <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
              - R$ 1.000,00 para quem acertar {numberSportsMain()} jogos
              <br />- R$ 100,00 para quem acertar {numberSportsMain() - 1} jogos
              <br />- R$ 10,00 para quem acertar {numberSportsMain() - 2} jogos
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
                    {events?.jackpots.map((game) => (
                      <Card.Jackpot
                        game={game}
                        key={game._id}
                        handleChangeWinner={handleChangeWinner}
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
