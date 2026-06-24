import { Button } from "@/components/common/button";
import { Container, ContainerFooter, ContainerIcon, ContainerMain, Header } from "../../styles";
import Text from "@/components/common/text";
import { FiArrowRight } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import Icon from "@/utils/icon";

interface SecondStepProps {
  recover: string;
  nextStep: () => void;
  handleOpenRecover: () => void;
}

export default function SecondStep({ recover, nextStep, handleOpenRecover }: SecondStepProps) {
  return (
    <Container>
      <ContainerMain>
        <Header>
          <Text htmlTag="h1" font="label/body/m/regular">
            Verifique seu email
          </Text>
          <Text htmlTag="h2" font="label/body/m/regular" color="text.dynamic.whiteDynamic.80">
            Nós enviamos um email com um link de acesso para {recover}.
          </Text>
        </Header>
        <ContainerIcon>
          <Icon name="emailRead" size={200} color="text.dynamic.whiteDynamic.40" />
        </ContainerIcon>
      </ContainerMain>
      <ContainerFooter>
        <Button.Root
          orientation="h"
          bg="background.dynamic.whiteDynamic.8"
          justifycontent="center"
          w="full"
          type="submit"
          onClick={handleOpenRecover}
        >
          <Button.Text htmlTag="small" font="label/body/m/regular">
            Abrir Email
          </Button.Text>
          <Button.Icon icon={MdOutlineEmail} size={18}  />
        </Button.Root>
        <Button.Root
          orientation="h"
          bg="brand.primary.100"
          justifycontent="center"
          w="full"
          type="submit"
          onClick={nextStep}
        >
          <Button.Text htmlTag="small" font="label/body/m/regular" color="text.absolute.whiteAbsolute.100">
            Continuar
          </Button.Text>
          <Button.Icon icon={FiArrowRight} size={18} color="text.absolute.whiteAbsolute.100" />
        </Button.Root>
      </ContainerFooter>
    </Container>
  );
}
