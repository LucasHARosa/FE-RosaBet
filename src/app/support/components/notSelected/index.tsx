import Text from "@/components/common/text";
import { Container } from "./styles";
import Icon from "@/utils/icon";

export default function NotSelected() {
  return (
    <Container>
     <Icon name="question" size={120} color="text.dynamic.whiteDynamic.40"/>
      <Text htmlTag="h2" font="heading/m/bold">
        Selecione um tópico
      </Text>
      <Text htmlTag="small" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64">
        Escolha um tópico para visualizar suas informações completas
      </Text>
    </Container>
  );
}
