import Text from "@/components/common/text";
import { GuideCategory, Guide } from "@/interfaces/support";
import { Container, ContainerGuide, ListCardsGuides } from "./styles";
import CardGuide from "../cardGuide";

export default function ListGuides({
  guideCategory,
  handleSelectGuide,
  selectedGuide,
}: ListGuidesProps) {
  return (
    <Container>
      {guideCategory.map((category) => (
        <ContainerGuide key={category.id}>
          <Text htmlTag="h1" font="label/body/s/regular" color="text.dynamic.whiteDynamic.64">
            {category.name}
          </Text>
          <ListCardsGuides>
            {category.guides.map((guide) => (
              <CardGuide
                key={guide.id}
                guide={guide}
                handleSelectGuide={handleSelectGuide}
                selectedGuide={selectedGuide}
              />
            ))}
          </ListCardsGuides>
        </ContainerGuide>
      ))}
    </Container>
  );
}

interface ListGuidesProps {
  guideCategory: GuideCategory[];
  handleSelectGuide: (guide: Guide) => void;
  selectedGuide?: Guide;
}
