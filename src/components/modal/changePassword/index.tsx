/* eslint-disable react/display-name */

import { forwardRef } from "react";
import useHandle2FA from "./useChangePassword";
import Modal from "..";
import { Form, GroupNewPassword, Line } from "./styles";
import Text from "@/components/common/text";
import Input from "@/components/common/input";
import { Button } from "@/components/common/button";
import PasswordStrengthBar from "react-password-strength-bar";
import MessageError from "@/components/messageError";

const ModalChangePassword = forwardRef((_, ref) => {
  const {
    closeModal,
    open,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    messageError,
    onSubmit,
    codeError,
    loading,
    theme
  } = useHandle2FA(ref);

  return (
    <Modal title={"Alterar Senha"} onCancel={closeModal} visible={open}>
      <Form onSubmit={onSubmit}>
        <Text color="text.dynamic.whiteDynamic.64" font="paragraph/l/regular">
          Não compartilhe sua senha de acesso. Ela é sua chave de segurança para entrada no sistema
          da ROSABET.
        </Text>

        {codeError && <MessageError code={codeError} />}

        <Input
          name="password"
          placeholder="Senha Atual"
          type="password"
          value={currentPassword}
          handleValue={setCurrentPassword}
          error={codeError === 1031}
        />
        <Line />
        <GroupNewPassword>
          {!!messageError && <MessageError message={messageError} type="ALERT" />}
          <Input
            name="new-password"
            placeholder="Nova Senha"
            type="password"
            value={newPassword}
            handleValue={setNewPassword}
          />
          <Input
            name="repeat-new-password"
            placeholder="Repetir Nova Senha"
            type="password"
            value={confirmPassword}
            handleValue={setConfirmPassword}
          />
        </GroupNewPassword>

        <PasswordStrengthBar
          password={newPassword}
          scoreWords={["Muito Fraca", "Fraca", "Ok", "Forte", "Muito Forte"]}
          barColors={[
            theme.background.dynamic.whiteDynamic[8],
            theme.brand.primary[100],
            theme.brand.secondary.accent.textYellow,
            theme.brand.secondary.accent.green[100],
            theme.brand.secondary.accent.green[100],
          ]}
        />

        <Text color="text.dynamic.whiteDynamic.64" font="paragraph/m/regular">
          A sua senha deve ter pelo menos 8 caracteres. Incluindo uma letra, um número e um símbolo
        </Text>

        <Button.Root
          orientation="h"
          bg="brand.primary.100"
          w="full"
          justifycontent="center"
          disabled={!!messageError || !currentPassword || loading}
          type="submit"
        >
          <Button.Text font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
            {loading ? "Carregando..." : "Alterar Senha"}
          </Button.Text>
        </Button.Root>
      </Form>
    </Modal>
  );
});

export default ModalChangePassword;
