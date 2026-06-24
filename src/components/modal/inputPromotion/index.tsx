/* eslint-disable react/display-name */
"use client";
import { forwardRef } from "react";
import Modal from "..";

import Input from "@/components/common/input";
import { ClearButton, Container, ContainerButton, ContainerInput } from "./styles";
import { Button } from "@/components/common/button";
import MessageError from "@/components/messageError";
import useInputPromotion, { ModalInputProps } from "./useInputPromotion";
import ModalAlert from "../alert";

export const ModalInputPromotion = forwardRef(
  ({ title, inputName, refreshPromotions }: ModalInputProps, ref) => {
    const {
      closeModal,
      open,
      inputValue,
      setInputValue,
      handleClear,
      codeError,
      onSubmitCode,
      codeSuccess,
      modalSuccessCodeRef,
      buttonDisabled,
    } = useInputPromotion(ref, { title, inputName, refreshPromotions });

    return (
      <>
        <Modal minHeight={230} title={title} onCancel={closeModal} visible={open}>
          <Container>
            <ContainerInput>
              {codeError && <MessageError code={codeError} />}
              {codeSuccess && (
                <MessageError type="SUCCESS" message="Código cadastrado com suceso" />
              )}
              <Input
                name={inputName}
                placeholder={inputName}
                value={inputValue}
                handleValue={(value) => setInputValue(value)}
                error={codeError !== null}
              />
            </ContainerInput>
            <ContainerButton>
              <ClearButton>
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
              </ClearButton>

              <Button.Root
                orientation="h"
                onClick={onSubmitCode}
                bg="brand.primary.100"
                w="full"
                h={48}
                justifycontent="center"
                borderRadius={8}
                disabled={buttonDisabled()}
              >
                <Button.Text htmlTag="h2" font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
                  Aplicar
                </Button.Text>
              </Button.Root>
            </ContainerButton>
          </Container>
        </Modal>
        <ModalAlert
          ref={modalSuccessCodeRef}
          title="Cupom adicionado"
          message="Cupom adicionado com sucesso!"
          type="success"
        />
      </>
    );
  },
);
