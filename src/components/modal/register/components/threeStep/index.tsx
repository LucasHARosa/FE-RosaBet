import { Button } from "@/components/common/button";
import Text from "@/components/common/text";
import MessageError from "@/components/messageError";
import { resendCode, validCode } from "@/service/auth";
import { useContext, useEffect, useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import ReactCodeInput from "react-verification-input";
import { Box, BoxButton, TermsText } from "../../styles";
import { UserContext } from "@/contexts/UserContext";

export default function ThreeStep({ nextStep, data, closeModal }: any) {
  const [code, setCode] = useState<number | undefined>();
  const [loadingRequest, setLoadingRequest] = useState<boolean>(false);
  const [loadingSend, setLoadingSend] = useState<boolean>(false);
  const [count, setCount] = useState(59);
  const { getUser, refreshUser } = useContext(UserContext);

  useEffect(() => {
    if (!getUser.cpf) {
      // router.push('/');
      // closeModal();
    }
  }, [getUser.cpf]);

  const requestCode = async () => {
    setLoadingRequest(true);
    setCode(undefined);

    try {
      await resendCode();
      setCount(59);
    } catch (err: any) {
      console.error(err);
      setCode(1);
    } finally {
      setLoadingRequest(false);
    }
  };

  const sendCode = async (code: string) => {
    if (loadingRequest) return;
    setLoadingSend(true);
    setCode(undefined);

    try {
      await validCode(code);
      refreshUser();
      closeModal();
    } catch (err: any) {
      console.error(err);
      setCode(2);
    } finally {
      setLoadingSend(false);
    }
  };

  useEffect(() => {
    if (count === 0) return;

    const timeout = setTimeout(() => {
      if (count !== 0) {
        setCount(count - 1);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <Box gap={21}>
      <Text htmlTag="h1" color="text.dynamic.whiteDynamic.100" font="heading/m/bold">
        Código de Verificação
      </Text>

      <TermsText>
        <Text htmlTag="small" color="text.dynamic.whiteDynamic.40" font="paragraph/l/regular">
          Enviamos um código para
        </Text>
        <Text htmlTag="small" color="brand.secondary.accent.textYellow" font="paragraph/l/regular">
          {data.email || getUser.email}
        </Text>
        <Text htmlTag="small" color="text.dynamic.whiteDynamic.40" font="paragraph/l/regular">
          insira o código logo abaixo
        </Text>
      </TermsText>

      <ReactCodeInput
        autoFocus
        length={6}
        placeholder=" "
        onComplete={(value) => sendCode(value)}
        inputProps={{
          autoComplete: "one-time-code",
          disabled: loadingRequest || loadingSend,
        }}
      />

      <MessageError code={code} />

      <BoxButton>
        <Button.Root orientation="h" border disabled={loadingRequest || loadingSend}>
          {count !== 0 ? (
            <Button.Text htmlTag="small" color="text.dynamic.whiteDynamic.64" font="paragraph/l/regular">
              Reenviar código em 00:{count < 10 ? `0${count}` : count}
            </Button.Text>
          ) : (
            <>
              <Button.Icon icon={RiMailSendLine} size={18} color="brand.secondary.100" />
              <Button.Text
                htmlTag="small"
                color="brand.secondary.100"
                onClick={requestCode}
                font="paragraph/l/regular"
              >
                {loadingSend && "Verificando, aguarde..."}
                {loadingRequest && "Reenviando código, aguarde..."}
                {!loadingRequest && !loadingSend && "Reenviar código"}
              </Button.Text>
            </>
          )}
        </Button.Root>

        <Button.Root orientation="h" onClick={nextStep} bg="brand.primary.100">
          <Button.Text htmlTag="small" color="text.absolute.whiteAbsolute.100" font="label/button/m/bold">
            Alterar o e-mail
          </Button.Text>
        </Button.Root>
      </BoxButton>
    </Box>
  );
}
