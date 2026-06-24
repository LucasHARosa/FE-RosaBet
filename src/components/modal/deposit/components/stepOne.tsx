import { Button } from "@/components/common/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BoxButton, Field, Fieldset, Info, Left, Option, Section } from "../styles";
import { MdKeyboardArrowRight } from "react-icons/md";
import Text from "@/components/common/text";
import { UserI } from "@/interfaces/user";
import { FaPix } from "react-icons/fa6";
import { GoChevronRight } from "react-icons/go";
import { DepositProps } from "@/interfaces/deposit";

export default function StepOne({ handlePage, handleData }: StepProps) {
  const [optionSelected, setOptionSelected] = useState<string>("");

  const handleOptionChange = (value: string) => {
    console.log("salvar isso ", { type: value });
    handleData((prev) => ({ ...prev, type: value }));
    setOptionSelected(value);
  };

  const methods = [
    {
      name: "PIX",
      icon: <FaPix color="rgba(126, 255, 255, 0.8)" />,
    },
  ];

  useEffect(() => {
    if (methods.length === 1) handleOptionChange(methods[0].name);
  }, []);

  return (
    <Section>
      <Field>
        <Text htmlTag="small" font="paragraph/l/regular" color="text.dynamic.whiteDynamic.80">
          {methods.length > 1 ? "Selecione um método" : "Método de pagamento"}
        </Text>
        <Fieldset>
          {methods.map((method, index) => (
            <Option
              key={`method-${index}`}
              htmlFor={method.name}
              isSelected={optionSelected === method.name}
              onClick={() => handlePage(1)}
            >
              <Left>
                <Button.Root type="button" bg="brand.secondary.accent.green.8">
                  <Button.Icon icon={FaPix} size={16} color="brand.secondary.accent.green.100" />
                </Button.Root>
                <Info>
                  <Text htmlTag="strong" font="paragraph/m/bold">
                    {method.name}
                  </Text>
                  <Text htmlTag="small" font="label/body/xs/regular" color="text.dynamic.whiteDynamic.64">
                    Instantâneo
                  </Text>
                </Info>
              </Left>
              <input
                type="radio"
                id={method.name}
                value={method.name}
                onChange={({ target }) => handleOptionChange(target.value)}
                checked={optionSelected === method.name}
              />
              <MdKeyboardArrowRight size={22} color="text.dynamic.whiteDynamic.64" />
            </Option>
          ))}
        </Fieldset>
      </Field>

      <BoxButton>
        <Button.Root
          onClick={() => handlePage(1)}
          bg="brand.primary.100"
          orientation="h"
          w="full"
          justifycontent="center"
          disabled={optionSelected === ""}
        >
          <Button.Text font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
            Continuar
          </Button.Text>
          <Button.Icon icon={GoChevronRight} size={14} color="text.absolute.whiteAbsolute.100"/>
        </Button.Root>
      </BoxButton>
    </Section>
  );
}

interface StepProps {
  user: UserI;
  handlePage: Dispatch<SetStateAction<number>>;
  handleData: Dispatch<SetStateAction<DepositProps>>;
}
