"use client";

import Text from "@/components/common/text";
import { Card } from "@/components/card";
import { Button } from "@/components/common/button";
import Input from "@/components/common/input";
import ModalAlert from "../alert";
import {
  AnimatedContent,
  CircleCurrency,
  ContainerBet,
  ContainerFooter,
  ContainerOdds,
  CuponModal,
  Gap,
  Group,
  HeaderContent,
  HeaderCupons,
  Indicator,
  InfoRow,
  Position,
  ResumeNumber,
  Row,
  TextIcon,
  ValueBet,
  ValuePrefix,
  ContainerSelectOption,
} from "./styles";
import useModalCupom from "./useModalCupom";
import Icon from "@/utils/icon";
import MessageError from "@/components/messageError";
import CheckBox from "@/components/common/checkbox";


export default function ModalCupom() {
  const {
    cupons,
    open,
    empty,
    oddMultiple,
    numberEvents,
    toggleOpen,
    possibleReturn,
    possibleValues,
    addValue,
    changeValue,
    isAuthenticaded,
    submitCoupon,
    buttonDisabled,
    modalSuccessRef,
    loading,
    valueDisplay,
    modalErrRef,
    isMobile,
    codeError,
    viewSelectOption,
    setViewSelectOption,
    clearCupons,
    handleChangeAcceptAllOdds,
    acceptAllOdds
  } = useModalCupom();

  return (
    <>
      {!empty && (
        <Position isMobile={isMobile} isOpen={open}>
          <CuponModal>

            <HeaderCupons onClick={toggleOpen} isOpen={open}>
              <Row>
                <Icon name="ticketFill" size={20} color="text.absolute.whiteAbsolute.100"/> 
                <Text font="label/button/l/bold" color="text.absolute.whiteAbsolute.100">
                  Cupom
                </Text>
                <ResumeNumber isOpen={open}>
                  <Text font="label/button/s/regular" color="text.absolute.whiteAbsolute.100">
                    {numberEvents}
                  </Text>
                </ResumeNumber>
              </Row>
              <Indicator isOpen={open}>
                {open ? (
                  <Icon name="arrowDownIos" size={20} color="text.absolute.whiteAbsolute.100"  />
                ) : (
                  <Icon name="arrowUpIos" size={20} color="text.absolute.whiteAbsolute.100" />
                )}
              </Indicator>
            </HeaderCupons>

            <AnimatedContent isOpen={open}>
              <Group>
                <HeaderContent>
                  <Text font="label/body/l/bold" color="text.dynamic.whiteDynamic.100">
                    Apostas
                  </Text>
                  <Row>
                    <Button.Root onClick={clearCupons} bg="background.dynamic.whiteDynamic.8" borderRadius={8}>
                      <Icon name="trash" size={20} color="brand.secondary.100" />
                    </Button.Root>
                    <Button.Root onClick={()=>setViewSelectOption(!viewSelectOption)} borderRadius={8} bg="background.dynamic.whiteDynamic.8">
                      <Icon name="gear" size={20} color={viewSelectOption?"brand.secondary.100":"text.dynamic.whiteDynamic.100"} />
                    </Button.Root>
                  </Row>
                </HeaderContent>
                {viewSelectOption && 
                  <ContainerSelectOption isOpen={viewSelectOption}>
                    <CheckBox
                      title="Aceitar todas as atualizações"
                      check={acceptAllOdds}
                      handleCheck={handleChangeAcceptAllOdds}
                    />
                    <CheckBox
                      title="Aceitar somente odds mais altas"
                      check={!acceptAllOdds}
                      handleCheck={handleChangeAcceptAllOdds}
                    />
                  </ContainerSelectOption>
                }
                {codeError && <MessageError code={codeError} type="ERROR" />}
                <ContainerOdds>
                  {cupons.map((sport, index) => (
                    <Card.Cupom key={index} sport={sport} disabled={loading} />
                  ))}
                </ContainerOdds>
              </Group>
              <ContainerFooter>
                <ContainerBet isMobile={isMobile}>
                  <ValueBet>
                    <Row>
                      <CircleCurrency>
                        <Text htmlTag="small" font="label/body/s/bold" color="text.absolute.blackAbsolute.100">
                          R$
                        </Text>
                      </CircleCurrency>
                      <Text htmlTag="small" font="label/body/s/bold">R$</Text>
                      <Input
                        name="value"
                        value={valueDisplay}
                        handleValue={changeValue}
                        height="43px"
                        padding="0px"
                        background="transparent"
                        disabled={loading}
                        border={0}
                      />
                    </Row>
                    <Icon name="pencil" size={20} color="brand.secondary.accent.green.100" />
                  </ValueBet>
                  <Row>
                    {possibleValues.map((value, index) => (
                      <ValuePrefix key={index} onClick={() => addValue(value)} disabled={loading}>
                        <Text font="label/body/s/bold" color="brand.secondary.accent.green.100">
                          +{value}
                        </Text>
                      </ValuePrefix>
                    ))}
                  </Row>
                </ContainerBet>

                <Gap size={8} />

                <InfoRow>
                  <Text font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
                    Odds Totais ({numberEvents})
                  </Text>
                  <TextIcon>
                    <Text font="label/body/s/bold">
                      <small style={{ fontSize: "12px" }}>{oddMultiple.toFixed(2)}x</small>
                    </Text>
                    <Icon name="dice" size={12}/>
                  </TextIcon>
                </InfoRow>

                <InfoRow>
                  <Text font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
                    Ganho Potencial
                  </Text>
                  <TextIcon>
                    <Text font="label/body/s/bold" color="brand.secondary.accent.green.100">
                      R$ {possibleReturn()}
                    </Text>
                    <Icon name="targetArrow" size={12} color="brand.secondary.accent.green.100" />
                  </TextIcon>
                </InfoRow>

                <Gap size={12} />
                {isAuthenticaded ? (
                  <Button.Root
                    orientation="v"
                    bg="brand.primary.100"
                    w="full"
                    onClick={submitCoupon}
                    disabled={buttonDisabled() || loading}
                  >
                    <Button.Text font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
                      {loading ? "Carregando..." : "Finalizar Aposta"}
                    </Button.Text>
                  </Button.Root>
                ) : (
                  <Button.Root orientation="v" bg="brand.primary.100" w="full" onClick={submitCoupon}>
                    <Button.Text font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
                      Fazer Login
                    </Button.Text>
                  </Button.Root>
                )}
              </ContainerFooter>
            </AnimatedContent>
          </CuponModal>
        </Position>
      )}

      <ModalAlert
        ref={modalSuccessRef}
        title="Aposta Realizada"
        message="Sua aposta foi realizada com sucesso!"
        type="success"
      />
      <ModalAlert
        ref={modalErrRef}
        title="Saldo insuficiente"
        message="Você não possui saldo suficiente para realizar essa aposta!"
        type="alert"
        route="/profile/transactions"
        textRoute="Depositar"
        iconRoute="pix"
      />
    </>
  );
}
