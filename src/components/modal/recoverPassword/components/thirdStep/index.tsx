import { Button } from "@/components/common/button";
import {
  Container,
  ContainerCenter,
  ContainerFooter,
  ContainerMain,
  ContainerTimeOut,
  Header,
} from "../../styles";
import Text from "@/components/common/text";
import ReactCodeInput from "react-verification-input";
import Input from "@/components/common/input";
import useThirdStep, { ThirdStepProps } from "./useThirdStep";
import MessageError from "@/components/messageError";

export default function ThirdStep({
  recover,
  document,
  handleSubmitDocument,
  handleSucess,
}: ThirdStepProps) {
  const {
    sendCode,
    handleSubmitPassword,
    handleResendCode,
    codeErrorPassword,
    codeErrorCode,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    disableButton,
    loadingPassword,
    timerRunning,
    seconds,
  } = useThirdStep({ recover, document, handleSubmitDocument, handleSucess });
  return (
    <Container>
      <ContainerMain>
        <Header>
          <Text htmlTag="h1" font="heading/m/bold">
            Código de Verificação
          </Text>
          <Text htmlTag="h2" color="text.dynamic.whiteDynamic.80" font="paragraph/l/regular">
            Insira o código enviado para seu email logo abaixo:
          </Text>
        </Header>
        <ContainerCenter>
          <ReactCodeInput
            autoFocus
            length={6}
            placeholder=" "
            onComplete={(value) => sendCode(value)}
            inputProps={{
              autoComplete: "one-time-code",
              disabled: loadingPassword,
            }}
          />
        </ContainerCenter>
        <ContainerTimeOut>
          <Button.Root
            orientation="h"
            justifycontent="center"
            w="full"
            onClick={handleResendCode}
            disabled={timerRunning}
            gaph={6}
          >
            <Text
              font="label/body/m/regular"
              color={timerRunning ? "text.dynamic.whiteDynamic.80" : ""}
            >
              Reenviar código
            </Text>
            {timerRunning && (
              <Text htmlTag="h2" color="brand.secondary.100" font="paragraph/l/regular">
                em{" "}
                {seconds > 60
                  ? `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60}`
                  : seconds < 10
                    ? `00:0${seconds}`
                    : `00:${seconds}`}
              </Text>
            )}
          </Button.Root>
        </ContainerTimeOut>
        <Input
          name="Nova Senha"
          type="password"
          placeholder="Nova Senha"
          value={password}
          handleValue={setPassword}
          error={codeErrorPassword === 1502}
          disabled={loadingPassword}
          required
        />
        <Input
          name="Confirmar Senha"
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          handleValue={setConfirmPassword}
          error={codeErrorPassword === 1500}
          disabled={loadingPassword}
          required
        />
        <MessageError code={codeErrorPassword} />
        <MessageError code={codeErrorCode} />
      </ContainerMain>
      <ContainerFooter>
        <Button.Root
          orientation="h"
          bg="brand.primary.100"
          justifycontent="center"
          w="full"
          type="submit"
          onClick={handleSubmitPassword}
          disabled={loadingPassword || disableButton()}
          isLoading={loadingPassword}
        >
          <Button.Text htmlTag="small" color="text.absolute.whiteAbsolute.100" font="label/button/m/bold">
            Confirmar
          </Button.Text>
        </Button.Root>
      </ContainerFooter>
    </Container>
  );
}
