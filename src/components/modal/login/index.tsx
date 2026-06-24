"use client";
import React from "react";
import { forwardRef } from "react";

import { Button } from "@/components/common/button";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import MessageError from "@/components/messageError";
import Modal from "..";
import { Form, GroupInput, HeaderInfo, Register } from "./styles";
import useLogin from "./useLogin";
import ModalConfirm2FA from "./confirm2FA";
import Icon from "@/utils/icon";

const ModalLogin = forwardRef((props, ref) => {
  const {
    open,
    isLoading,
    onSubmit,
    dataLogin,
    setDataLogin,
    codeError,
    closeModal,
    handleRegister,
    handleRecoverPassword,
    isMobile,
    modal2FA,
  } = useLogin(ref);

  return (
    <>
      <Modal title="Entrar na Conta" onCancel={closeModal} visible={open} minHeight={630}>
        <Form onSubmit={onSubmit}>
          <HeaderInfo>
            <Text htmlTag="h1" font="heading/m/bold">
              Bem-vindo de Volta!
            </Text>

            <Text color="text.dynamic.whiteDynamic.80" font="paragraph/l/regular">
              Faça login agora e comece a apostar nos melhores eventos do mundo.
            </Text>
          </HeaderInfo>

          <GroupInput>
            {codeError && <MessageError code={codeError} />}

            <Input
              name="Usuário"
              placeholder="Usuário"
              value={dataLogin.username || ""}
              handleValue={(value) =>
                setDataLogin((prev: any) => ({
                  ...prev,
                  username: value,
                }))
              }
              disabled={isLoading}
              error={codeError === 1031}
            />

            <Input
              name="Senha"
              placeholder="Senha"
              value={dataLogin.password || ""}
              handleValue={(value) =>
                setDataLogin((prev: any) => ({
                  ...prev,
                  password: value,
                }))
              }
              disabled={isLoading}
              type="password"
              error={codeError === 1031}
            />
          </GroupInput>

          <Button.Root orientation="h" type="button" onClick={handleRecoverPassword}>
            <Icon name="key" size={18} color="brand.secondary.accent.textYellow" />
            <Button.Text htmlTag="small" color="brand.secondary.accent.textYellow" font="label/button/m/bold">
              Esqueci minha senha
            </Button.Text>
          </Button.Root>

          <Register isMobile={isMobile}>
            <Text htmlTag="small" color="text.dynamic.whiteDynamic.64" font="label/body/m/regular">
              Ainda não tem uma conta?
            </Text>
            <Button.Root orientation="h" w="fit" type="button" onClick={handleRegister}>
              <Button.Text htmlTag="small" color="brand.secondary.100" font="label/button/m/bold">
                Criar uma conta
              </Button.Text>
            </Button.Root>
          </Register>

          <Button.Root
            orientation="h"
            bg="brand.primary.100"
            w="full"
            justifycontent="center"
            isLoading={isLoading}
            disabled={
              isLoading || dataLogin.username === undefined || dataLogin.password === undefined
            }
            type="submit"
          >
            <Button.Text htmlTag="small" color="text.absolute.whiteAbsolute.100" font="label/button/m/bold">
              Entrar
            </Button.Text>
            <Icon name="arrowRight" size={18} color="text.absolute.whiteAbsolute.100" />
          </Button.Root>
        </Form>
      </Modal>

      <ModalConfirm2FA ref={modal2FA} onSubmit={onSubmit} />
    </>
  );
});

ModalLogin.displayName = "ModalLogin";

export default ModalLogin;
