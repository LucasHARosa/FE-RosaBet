import { Button } from "@/components/common/button";
import Input from "@/components/common/input";
import MessageError from "@/components/messageError";
import { verifyCPF } from "@/service/auth";
import { FormEvent, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Box, BoxButton } from "../../styles";
import Text from "@/components/common/text";

export default function FirstStep({ nextStep, data, handleData }: any) {
  const [error, setError] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [valueCpf, setValueCpf] = useState(data.cpf || "");

  const checkCPF = async (event: FormEvent) => {
    event.preventDefault();

    setError(undefined);
    setLoading(true);
    try {
      const response = await verifyCPF(valueCpf.split(".").join("").split("-").join(""));
      handleData({
        ...data,
        cpf: response.cpf,
        name: response.nome,
        birthDate: response.data_nascimento,
      });
      // handleData({ ...data, cpf: response.cpf });
      setError(undefined);
      nextStep();
    } catch (err: any) {
      setError(err.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box gap={20} onSubmit={checkCPF}>
      <Text htmlTag="h1" color="text.dynamic.whiteDynamic.80" font="paragraph/l/regular">
        Informe seu CPF para continuar e começar a jogar e ganhar com a gente.
      </Text>

      <Input
        name="CPF"
        placeholder="CPF"
        value={valueCpf}
        handleValue={setValueCpf}
        maskType="CPF"
        error={!!error}
        disabled={loading}
      />
      <MessageError code={error} />

      <BoxButton>
        <Button.Root
          orientation="h"
          bg="brand.primary.100"
          w="full"
          justifycontent="center"
          disabled={!valueCpf || loading}
          isLoading={loading}
          type="submit"
        >
          <Button.Text htmlTag="small" color="text.absolute.whiteAbsolute.100" font="label/button/m/bold">
            Continuar
          </Button.Text>
          <Button.Icon icon={FiArrowRight} size={18} color="text.absolute.whiteAbsolute.100" />
        </Button.Root>
      </BoxButton>
    </Box>
  );
}
