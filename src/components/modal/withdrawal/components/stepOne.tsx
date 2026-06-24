import { Button } from "@/components/common/button";
import { Dispatch, FormEvent, SetStateAction, useContext, useMemo, useRef, useState } from "react";
import { Amount, BoxButton, Country, Field, Money, Prize, Section } from "../styles";
import Brazil from "@/assets/brazil.svg";
import Image from "next/image";
import Text from "@/components/common/text";
import { GoChevronRight } from "react-icons/go";
import Input from "@/components/common/input";
import { currencyConverter } from "@/utils/data-converter";
import { UserContext } from "@/contexts/UserContext";
import ModalAlert from "../../alert";
import { messagesErrors } from "@/components/messageError/messageErro";

export default function StepOne({ withdrawalValidation, handleValue }: StepProps) {
  const [valueDisplay, setValueDisplay] = useState<string>("0.00");
  const [error, setError] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { getUser } = useContext(UserContext);
  const modalRefAlert = useRef<any>();

  const changeValue = (value: string) => {
    const numericValue = Number(value.replace(/\D/g, ""));

    const centValue = numericValue / 100;

    const formattedValue = currencyConverter(centValue);

    setValueDisplay(formattedValue);

    handleValue(centValue);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      await withdrawalValidation();
    } catch (error: any) {
      console.log("aqui", error);
      setError(error.code);
      modalRefAlert.current.openModal();
    } finally {
      setLoading(false);
    }
  };

  const isDisabledDisplay = useMemo(
    () => valueDisplay === "0" || valueDisplay === "0.00" || valueDisplay === "0,00" || loading,
    [valueDisplay, loading],
  );

  return (
    <Section onSubmit={handleSubmit}>
      <Field>
        <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
          Saldo Total: R${currencyConverter(getUser.credits)}
        </Text>
        <Money>
          <Country>
            <Image src={Brazil} alt="country" width={24} height={24} />
          </Country>
          <Amount isValue={!isDisabledDisplay}>
            <Prize>
              <Input
                name="value"
                value={valueDisplay}
                handleValue={changeValue}
                height="auto"
                padding="0px"
                background="transparent"
                // disabled={loading}
              />
            </Prize>
            <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
              Quantia
            </Text>
          </Amount>
        </Money>
      </Field>

      <BoxButton>
        <Button.Root
          type="submit"
          bg="brand.primary.100"
          orientation="h"
          w="full"
          justifycontent="center"
          disabled={isDisabledDisplay}
        >
          <Button.Text font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
            {loading ? "Carregando..." : "Continuar"}
          </Button.Text>
          <Button.Icon icon={GoChevronRight} size={14} color="text.absolute.whiteAbsolute.100" />
        </Button.Root>
      </BoxButton>

      <ModalAlert ref={modalRefAlert} type={"info"} title="Ops" message={messagesErrors[error]} />
    </Section>
  );
}

interface StepProps {
  withdrawalValidation: () => Promise<any>;
  value: number;
  handleValue: Dispatch<SetStateAction<number>>;
}
