/* eslint-disable react/display-name */
"use client";
import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import { forwardRef } from "react";
import Modal from "..";
import { GroupButton } from "./styles";
import useAlert from "./useConfirm";

const ModalConfirm = forwardRef(({ title, message, onSubmit }: ModalConfirmProps, ref) => {
  const { closeModal, open, handleSubmit, loading } = useAlert(ref, onSubmit);

  return (
    <Modal title={title} onCancel={closeModal} visible={open}>
      <Text font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
        {message}
      </Text>

      <GroupButton>
        <Button.Root bg="background.dynamic.whiteDynamic.4" onClick={closeModal} disabled={loading}>
          <Button.Text font="label/body/m/regular">Cancelar</Button.Text>
          {/* <Button.Icon /> */}
        </Button.Root>
        <Button.Root bg="brand.primary.100" onClick={handleSubmit} disabled={loading}>
          <Button.Text font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">{loading ? "Carregando..." : "Confirmar"}</Button.Text>
          {/* <Button.Icon /> */}
        </Button.Root>
      </GroupButton>
    </Modal>
  );
});

export default ModalConfirm;

interface ModalConfirmProps {
  title: string;
  message: string;
  onSubmit: () => void;
}
