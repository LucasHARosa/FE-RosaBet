import { Button } from "@/components/common/button";
import Input from "@/components/common/input";
import MessageError from "@/components/messageError";
import { handleEmailUser } from "@/service/auth";
import { FormEvent, useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { Box, BoxButton } from "../../styles";

export default function FourthStep({ previousStep, handleData }: any) {
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [error, setError] = useState<number | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError(undefined);
    setLoading(true);

    try {
      await handleEmailUser(email, confirmEmail);
      setError(undefined);
      previousStep();
      handleData((prev: any) => ({ ...prev, email }));
    } catch (err: any) {
      setError(err.code);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email !== confirmEmail) {
      setError(1016);
    } else {
      setError(undefined);
    }
  }, [email, confirmEmail]);

  return (
    <Box gap={8} onSubmit={onSubmit}>
      <Button.Root orientation="h" type="button" onClick={previousStep} disabled={loading}>
        <Button.Icon icon={IoIosArrowRoundBack} size={30} />
        <Button.Text htmlTag="small" font="label/body/m/regular" >
          Voltar
        </Button.Text>
      </Button.Root>

      <Input
        name="Novo e-mail"
        type="email"
        placeholder="E-mail"
        value={email}
        handleValue={setEmail}
        error={!!error}
        disabled={loading}
        required
      />
      <Input
        name="Confirmar e-mail"
        type="email"
        placeholder="Confirmar e-mail"
        value={confirmEmail}
        handleValue={setConfirmEmail}
        error={!!error}
        disabled={loading}
        required
      />
      <MessageError code={error} />

      <BoxButton>
        <Button.Root
          type="submit"
          border
          disabled={loading || !!error || email === "" || confirmEmail === ""}
          bg="brand.primary.100"
        >
          <Button.Text htmlTag="small" font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
            {loading ? "Carregando..." : "Alterar e-mail"}
          </Button.Text>
        </Button.Root>
      </BoxButton>
    </Box>
  );
}
