import React from "react";
import { Button, Link } from "@/components/common/button";
import Input from "@/components/common/input";
import Text from "@/components/common/text";
import MessageError from "@/components/messageError";
import { UserContext } from "@/contexts/UserContext";
import { RegisterProps } from "@/interfaces/user";
import { registerUser } from "@/service/auth";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Box, GroupButton, TermsText } from "../../styles";

export default function SecondStep({ nextStep, previousStep, data, handleData }: SecondStepProps) {
  const { handleToken } = useContext(UserContext);
  const [error, setError] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);
  const submitRegister = async (event: FormEvent) => {
    event.preventDefault();

    setError(undefined);
    setLoading(true);

    try {
      const response = await registerUser(data);
      handleToken(response);
      nextStep();
    } catch (err: any) {
      setError(err.code || 20);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      setError(undefined);
    }
  }, [data]);

  return (
    <Box gap={8} onSubmit={submitRegister}>
      <Text htmlTag="h1" color="text.dynamic.whiteDynamic.100" font="heading/m/bold">
        Bem vindo a RosaBet
      </Text>
      <Text htmlTag="small" color="text.dynamic.whiteDynamic.40" font="paragraph/l/regular">
        Crie sua conta agora e comece a apostar nos melhores eventos do mundo.
      </Text>

      <MessageError code={error} />

      <Input name="Nome" placeholder="Nome" value={data.name} disabled />
      <Input
        name="Username"
        placeholder="Username"
        value={data.username}
        error={[1001, 7003].includes(error || 0)}
        handleValue={(value: string) => handleData({ ...data, username: value })}
        required
      />
      <Input
        name="Email"
        placeholder="Email"
        type="email"
        value={data.email}
        error={error === 1012}
        handleValue={(value: string) => handleData({ ...data, email: value })}
        required
      />
      <Input
        name="Senha"
        placeholder="Senha"
        type="password"
        error={error === 1029}
        value={data.password}
        handleValue={(value: string) => handleData({ ...data, password: value })}
        required
      />

      <TermsText margin center>
        <Text htmlTag="small" color="text.dynamic.whiteDynamic.40" font="paragraph/m/regular">
          Ao continuar, você concorda com os
        </Text>
        <Link.Root p={1}>
          <Link.Text htmlTag="h4" color="brand.secondary.100" font="paragraph/m/regular">
            Termos & Condições,{" "}
          </Link.Text>
        </Link.Root>
        <Link.Root p={1}>
          <Link.Text htmlTag="h4" color="brand.secondary.100" font="paragraph/m/regular">
            Políticas de Prêmios,
          </Link.Text>
        </Link.Root>
        <Link.Root p={1}>
          <Link.Text htmlTag="h4" color="brand.secondary.100" font="paragraph/m/regular">
            Política de Privacidade.
          </Link.Text>
        </Link.Root>
      </TermsText>

      <GroupButton>
        <Button.Root
          orientation="h"
          bg="background.dynamic.whiteDynamic.8"
          w="fit"
          justifycontent="center"
          onClick={previousStep}
          type="button"
          // isLoading={isLoading}
        >
          <Button.Icon icon={FiArrowLeft} size={18}  />
        </Button.Root>
        <Button.Root
          orientation="h"
          bg="brand.primary.100"
          w="full"
          justifycontent="center"
          disabled={!data.username || !data.email || !data.password || loading}
          isLoading={loading}
          type="submit"
        >
          <Button.Text htmlTag="small" color="text.absolute.whiteAbsolute.100" font="label/button/m/bold">
            Continuar
          </Button.Text>
          <Button.Icon icon={FiArrowRight} size={18} color="text.absolute.whiteAbsolute.100" />
        </Button.Root>
      </GroupButton>
    </Box>
  );
}

interface SecondStepProps {
  nextStep: () => void;
  previousStep: () => void;
  data: RegisterProps;
  handleData: (data: RegisterProps) => void;
}
