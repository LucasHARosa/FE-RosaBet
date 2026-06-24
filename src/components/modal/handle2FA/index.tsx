/* eslint-disable react/display-name */

import { forwardRef } from "react";
import useHandle2FA from "./useHandle2FA";
import Modal from "..";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import { Form } from "./styles";
import { Button } from "@/components/common/button";
import MessageError from "@/components/messageError";
import ModalQRCode2FA from "./qrCode";

const ModalHandle2FA = forwardRef((_, ref) => {
  const {
    closeModal,
    open,
    is2FAEnabled,
    password,
    setPassword,
    handle2FA,
    loading,
    codeError,
    modal2FA,
  } = useHandle2FA(ref);

  return (
    <>
      <Modal
        title={is2FAEnabled ? "Habilitar 2FA" : "Desabilitar 2FA"}
        onCancel={closeModal}
        visible={open}
      >
        <Form onSubmit={handle2FA}>
          <Text font="paragraph/l/regular" color="text.dynamic.whiteDynamic.64">
            A autenticação de dois fatores (2FA) adiciona segurança extra ao login. Requer um código
            enviado para seu email.
          </Text>
          <MessageError code={codeError} />
          <Input
            type="password"
            name="Senha"
            placeholder="Senha"
            value={password}
            handleValue={setPassword}
            error={codeError === 1031}
          />

          <Button.Root
            type="submit"
            orientation="h"
            bg="background.dynamic.blackDynamic.100"
            w="full"
            justifycontent="center"
            disabled={!password.length || loading}
          >
            <Button.Text color="brand.secondary.accent.textYellow" font="label/button/m/bold">
              {loading ? "Carregando..." : is2FAEnabled ? "Habilitar 2FA" : "Desabilitar 2FA"}
            </Button.Text>
          </Button.Root>
        </Form>
      </Modal>

      <ModalQRCode2FA ref={modal2FA} />
    </>
  );
});

export default ModalHandle2FA;
