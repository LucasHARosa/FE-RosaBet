import { forwardRef } from "react";
import useQRCode from "./useQRCode";
import Modal from "../..";
import Text from "@/components/common/text";
import { Button } from "@/components/common/button";
import { Box } from "../styles";

const ModalQRCode2FA = forwardRef((_, ref) => {
  const { open, closeModal, getUser } = useQRCode(ref);

  return (
    <Modal title={"2FA Ativado"} onCancel={closeModal} visible={open}>
      <Box>
        {/* <Text htmlTag="h1" font="label/body/m/regular" color="brand.secondary.accent.textYellow">
          2FA ativado via e-mail
        </Text> */}
        <Text htmlTag="h2" font="label/body/m/regular">
          Um código será enviado para o e-mail
        </Text>
        <Text htmlTag="h1" font="label/body/m/bold" color="brand.secondary.accent.textYellow">
          {getUser.email}
        </Text>
        <Text htmlTag="h2" font="label/body/m/regular">
          na próxima vez que você fizer login
        </Text>
        {/* <Image src={image} alt="qrCode" width={200} height={200} /> */}
        <Button.Root onClick={closeModal} w="full" bg="background.dynamic.blackDynamic.100">
          Fechar
        </Button.Root>
      </Box>
    </Modal>
  );
});

ModalQRCode2FA.displayName = "QRCode2FA";

export default ModalQRCode2FA;
