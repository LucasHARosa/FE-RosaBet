import Text from "@/components/common/text";
import { Container, ContainerInfo, ContainerText, ContainerIcon } from "./styles";
import { Promotion } from "@/interfaces/promotion";
import Icon from "@/utils/icon";

interface CardPromotionsProps {
  promotion: Promotion;
  select: boolean;
  handleSelectPromotion: (type: string) => void;
  loading?: boolean;
}

export default function CardPromotions({
  promotion,
  select,
  handleSelectPromotion,
}: CardPromotionsProps) {
  return (
    <Container selected={select} onClick={() => handleSelectPromotion(promotion.type)}>
      <ContainerIcon>
        <Icon name={promotion.type_icon} size={24} color="text.dynamic.whiteDynamic.100" />
      </ContainerIcon>
      <ContainerInfo>
        <ContainerText>
          <Text htmlTag="h1" font="paragraph/m/bold">
            {promotion.name}
          </Text>
          <Text htmlTag="h3" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
            {promotion.brief_description}
          </Text>
        </ContainerText>
        {promotion.amount !== 0 && (
          <Text htmlTag="h2" font="label/body/s/regular" color="brand.secondary.accent.textYellow">
            {promotion.amount > 1 ? `${promotion.amount} Disponíveis` : "Um Disponível"}
          </Text>
        )}
      </ContainerInfo>
    </Container>
  );
}
