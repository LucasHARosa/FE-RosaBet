/* eslint-disable react/display-name */
"use client";
import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import { forwardRef } from "react";
import Modal from "..";
import { Form, GroupButton } from "./styles";
import useConfirmPassword from "./useConfirmPassword";
import Input from "@/components/common/input";

const ModalConfirmPassword = forwardRef(({ onSubmit }: ModalConfirmPasswordProps, ref) => {
  const { closeModal, open, handleSubmit, loading, password, setPassword } = useConfirmPassword(
    ref,
    onSubmit,
  );

  return (
    <Modal title={"Confirme sua senha"} onCancel={closeModal} visible={open}>
      <Form onSubmit={handleSubmit}>
        <Text font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
          Para prosseguir, confirme sua senha
        </Text>

        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          handleValue={setPassword}
        />

        <GroupButton>
          <Button.Root bg="background.dynamic.whiteDynamic.4" onClick={closeModal} disabled={loading} type="button">
            <Button.Text font="label/body/m/regular">Cancelar</Button.Text>
          </Button.Root>
          <Button.Root
            bg="brand.primary.100"
            onClick={() => handleSubmit}
            disabled={loading || !password}
            type="submit"
          >
            <Button.Text font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
              {loading ? "Carregando..." : "Confirmar"}
            </Button.Text>
          </Button.Root>
        </GroupButton>
      </Form>
    </Modal>
  );
});

export default ModalConfirmPassword;

interface ModalConfirmPasswordProps {
  onSubmit: (password: string) => void;
}
