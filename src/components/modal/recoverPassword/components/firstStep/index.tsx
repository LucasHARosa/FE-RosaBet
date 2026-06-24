import { Button } from "@/components/common/button";
import { Container, ContainerFooter, ContainerMain, Header, Row } from "../../styles";
import Text from "@/components/common/text";
import { FiArrowRight } from "react-icons/fi";
import Input from "@/components/common/input";
import MessageError from "@/components/messageError";

interface FirstStepProps {
  document: string;
  setDocument: (value: string) => void;
  handleHasCode: () => void;
  handleSubmitDocument: () => void;
  loadingDocument: boolean;
  codeErrorDocument: number | null;
}

export default function FirstStep({
  document,
  setDocument,
  handleHasCode,
  handleSubmitDocument,
  loadingDocument,
  codeErrorDocument,
}: FirstStepProps) {
  return (
    <Container>
      <ContainerMain>
        <Header>
          <Text htmlTag="h1" font="label/body/m/regular">
            Recuperar Senha
          </Text>
          <Text htmlTag="h2" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
            Informe o CPF da conta. Nós iremos te enviar um código de confirmação
          </Text>
        </Header>
        {codeErrorDocument && <MessageError code={codeErrorDocument} />}
        <Input
          name="CPF"
          placeholder="CPF"
          value={document}
          handleValue={(value) => setDocument(value)}
          maskType="CPF"
          error={codeErrorDocument ? true : false}
          disabled={loadingDocument}
        />
        <Row>
          <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
            Já recebeu o código?
          </Text>
          <Button.Root orientation="h" type="button" onClick={handleHasCode}>
            <Button.Text htmlTag="h2" font="label/body/m/regular" color="brand.secondary.100">
              Tenho o código
            </Button.Text>
          </Button.Root>
        </Row>
      </ContainerMain>
      <ContainerFooter>
        <Button.Root
          orientation="h"
          bg="brand.primary.100"
          justifycontent="center"
          w="full"
          type="submit"
          onClick={handleSubmitDocument}
          disabled={false}
          isLoading={loadingDocument}
        >
          <Button.Text htmlTag="small" font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
            Recuperar
          </Button.Text>
          <Button.Icon icon={FiArrowRight} size={18} color="text.absolute.whiteAbsolute.100" />
        </Button.Root>
      </ContainerFooter>
    </Container>
  );
}
