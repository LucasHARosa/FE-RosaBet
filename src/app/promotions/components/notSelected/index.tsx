import Text from "@/components/common/text";
import { Container } from "./styles";
import Icon from "@/utils/icon";

export default function NotSelected() {
  return (
    <Container>
      <Icon name="giftOutline" size={120} color="text.dynamic.whiteDynamic.40" />
      <Text htmlTag="h2" font="heading/m/bold">
        Selecione uma promoção
      </Text>
      <Text htmlTag="small" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
        Escolha uma promoção para visualizar suas informações completas
      </Text>
    </Container>
  );
}
