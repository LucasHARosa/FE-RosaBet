/* eslint-disable react/display-name */
"use client";
import Text from "@/components/common/text";
import { forwardRef } from "react";
import Modal from "..";
import Input from "@/components/common/input";
import usePermission from "./usePermission";
import { Box, Container } from "./styles";

const ModalPermission = forwardRef((_, ref) => {
  const { closeModal, open, notification, handleSettings } = usePermission(ref);

  return (
    <Modal title={"Permissão"} onCancel={closeModal} visible={open}>
      <Container>
        <Box
          onClick={() =>
            handleSettings({
              email: notification.email,
              sms: !notification.sms,
            })
          }
        >
          <Input type="checkbox" name="sms" value={12} checked={notification.sms} />
          <Text font="label/body/m/regular">Autorizo receber atualizações da ROSABET via SMS</Text>
        </Box>
        <Box
          onClick={() =>
            handleSettings({
              email: !notification.email,
              sms: notification.sms,
            })
          }
        >
          <Input type="checkbox" name="sms" value={12} checked={notification.email} />
          <Text font="label/body/m/regular">Autorizo receber atualizações da ROSABET via Email</Text>
        </Box>
      </Container>
    </Modal>
  );
});

export default ModalPermission;
