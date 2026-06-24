import { Button } from "@/components/common/button";
import { DepositI } from "@/interfaces/deposit";
import Image from "next/image";
import { useState } from "react";
import { Copy, IconPix, Info, Left, Section } from "../styles";
import Text from "@/components/common/text";
import { currencyConverter } from "@/utils/data-converter";
import notifyPopup from "@/utils/toast";
import Icon from "@/utils/icon";

export default function StepThree({ closeModal, infoQRCode }: StepProps) {
  const [isCopy, setIsCopy] = useState(false);

  const copyURL = async (copy: string) => {
    try {
      await navigator.clipboard.writeText(copy);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 3000);
    } catch (error) {
      console.error("Error copying text: ", error);
      notifyPopup("Erro ao copiar o link para a área de transferência", "error");
    }
  };

  return (
    <Section>
      <Image src={infoQRCode.qr_code_image} alt="QRCode" width={200} height={200} />
      {infoQRCode.value && (
        <Text style={{ gap: "6px" }} font="heading/m/bold">
          Depositar <Text color="brand.secondary.accent.green.100" font="heading/m/bold">R$ {currencyConverter(infoQRCode.value)}</Text> por{" "}
          <Text color="brand.secondary.accent.green.100" font="heading/m/bold">PIX</Text>
        </Text>
      )}
      <Copy onClick={() => copyURL(infoQRCode.qr_code)} type="button">
        <Left>
          <IconPix>
            <Icon name="pix" size={16} color="brand.secondary.accent.green.100" />
          </IconPix>
          <Info>
            <Text htmlTag="strong" font="paragraph/l/regular">
              PIX Copia e Cola
            </Text>
            <Text htmlTag="small" font="paragraph/l/regular"color="text.dynamic.whiteDynamic.64">
              Instantâneo
            </Text>
          </Info>
        </Left>
        {isCopy ? (
          <Icon name="check" color="brand.secondary.accent.green.100" size={24} />
        ) : (
          <Icon name="copy" color="text.dynamic.whiteDynamic.64" size={24} />
        )}
      </Copy>

      <Button.Root onClick={closeModal} bg="background.dynamic.whiteDynamic.8" w="full">
        Fechar
      </Button.Root>
    </Section>
  );
}

interface StepProps {
  closeModal: () => void;
  infoQRCode: DepositI;
}
