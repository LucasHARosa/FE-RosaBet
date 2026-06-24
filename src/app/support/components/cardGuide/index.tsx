import { Guide } from "@/interfaces/support";
import { Container } from "./styles";
import Text from "@/components/common/text";
import Icon from "@/utils/icon";

export default function CardGuide({ guide, handleSelectGuide, selectedGuide }: CardGuideProps) {
  return (
    <Container onClick={() => handleSelectGuide(guide)} selected={selectedGuide === guide}>
      <Text htmlTag="h1" font="label/button/m/bold">
        {guide.title}
      </Text>
      <Icon name="arrowRightIos" size={24} color="text.dynamic.whiteDynamic.40" />
    </Container>
  );
}

interface CardGuideProps {
  guide: Guide;
  handleSelectGuide: (guide: Guide) => void;
  selectedGuide?: Guide;
}
