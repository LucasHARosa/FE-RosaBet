import Modal from "../..";
import ReactCodeInput from "react-verification-input";
import useConfirm2FA from "./useConfirm2FA";
import { forwardRef } from "react";
import Text from "@/components/common/text";
import { Box } from "../styles";

const ModalConfirm2FA = forwardRef(({ onSubmit }: any, ref) => {
  const { open, closeModal, sendCode } = useConfirm2FA(ref, onSubmit);

  return (
    <Modal title="Entrar na Conta" onCancel={closeModal} visible={open}>
      <Box>
        <Text htmlTag="h1" color="brand.secondary.100">
          Código 2FA
        </Text>

        <Text htmlTag="small" font="label/body/m/regular">
          Entre no seu aplicativo de autenticação e insira o código de 6 dígitos
        </Text>

        <ReactCodeInput
          autoFocus
          length={6}
          placeholder=" "
          onComplete={(value) => sendCode(value)}
          inputProps={{
            autoComplete: "one-time-code",
          }}
        />

        <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
          Caso tenha problemas com o código, entre em contato com o nosso suporte
        </Text>
      </Box>
    </Modal>
  );
});

ModalConfirm2FA.displayName = "ModalConfirm2FA";

export default ModalConfirm2FA;
