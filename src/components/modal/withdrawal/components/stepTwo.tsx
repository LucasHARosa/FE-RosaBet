import { Button } from "@/components/common/button";
import Image from "next/image";
import { FormEvent, useContext, useRef, useState } from "react";
import { Ball, BoxButton, Info, Section } from "../styles";
import Text from "@/components/common/text";
import { currencyConverter } from "@/utils/data-converter";
import TrayUp from "@/assets/tray-up.svg";
import { UserContext } from "@/contexts/UserContext";
import ModalConfirmPassword from "../../confirmPassword";

import ModalAlert from "../../alert";
import { messagesErrors } from "@/components/messageError/messageErro";

export default function StepTwo({ previous, value, onConfirm }: StepProps) {
  const [error, setError] = useState<number>(0);
  const { getUser } = useContext(UserContext);
  const modalRefPassword = useRef<any>();
  const modalErrorRef = useRef<any>();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // onConfirm("");
    modalRefPassword.current.openModal();
  };

  const cashout = async (password: string) => {
    try {
      await onConfirm(password);
    } catch (error: any) {
      modalErrorRef.current.openModal();
      setError(error.code);
    }
  };

  return (
    <Section onSubmit={onSubmit}>
      <Ball>
        <Image src={TrayUp} alt="TrayUp" width={62} height={62} />
      </Ball>

      <Info>
        <Text>Sacar</Text>
        <Text color="brand.secondary.accent.green.100">R${currencyConverter(value)}</Text>
        <Text>para o</Text>
        <Text color="brand.secondary.accent.green.100">PIX {getUser.pix_key}</Text>
      </Info>

      <BoxButton>
        <Button.Root
          type="button"
          onClick={previous}
          bg="background.dynamic.whiteDynamic.8"
          orientation="h"
          justifycontent="center"
        >
          <Button.Text font="label/body/m/regular">Voltar</Button.Text>
        </Button.Root>
        <Button.Root
          type="submit"
          bg="rgba(167, 255, 102, 0.16)"
          orientation="h"
          w="full"
          justifycontent="center"
        >
          <Button.Text font="label/body/m/regular" color="brand.secondary.accent.green.100">
            Confirmar Informações
          </Button.Text>
        </Button.Root>
      </BoxButton>

      <ModalConfirmPassword ref={modalRefPassword} onSubmit={cashout} />
      <ModalAlert ref={modalErrorRef} type="info" title="Atenção" message={messagesErrors[error]} />
    </Section>
  );
}

interface StepProps {
  previous: () => void;
  value: number;
  onConfirm: (password: string) => Promise<void>;
}
