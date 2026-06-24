import { Promotion } from "@/interfaces/promotion";
import {
  Banner,
  Container,
  ContainerDescription,
  ContainerInfo,
  ContainerPromotion,
  Footer,
  Header,
  Info,
} from "./styles";
import Text from "@/components/common/text";
import { Button } from "@/components/common/button";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

export default function PromotionsExpanded({
  promotion,
  handleUsePromotion,
  handleParticipatePromotion,
  handleCloseDetails,
}: PromotionsExpadedProps) {
  return (
    <Container>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          {promotion.name}
        </Text>
        <Button.Root
          onClick={handleCloseDetails}
          orientation="h"
          bg="background.dynamic.whiteDynamic.8"
          borderRadius={16}
        >
          <Button.Icon icon={IoMdClose} size={20} />
        </Button.Root>
      </Header>
      <Banner src={promotion.banner} />
      {promotion.amount !== 0 && (
        <ContainerPromotion>
          <ContainerInfo>
            <Info>
              <Text htmlTag="h2" font="label/body/s/regular" color="text.dynamic.whiteDynamic.80">
                {promotion.amount_type}
              </Text>
              <Text htmlTag="h3" font="heading/m/bold">
                {promotion.amount > 1 ? `${promotion.amount} Disponíveis` : "1 Disponível"}
              </Text>
            </Info>
            <Info>
              <Text htmlTag="h2" font="label/body/s/regular" color="text.dynamic.whiteDynamic.80">
                Expiração
              </Text>
              <Text
                htmlTag="h3"
                font="heading/m/bold"
                style={{ textAlign: "center" }}
              >
                {promotion.end_date_string
                  ? promotion.end_date_string
                  : promotion.end_date.toLocaleDateString() +
                    " " +
                    promotion.end_date.toLocaleTimeString()}
              </Text>
            </Info>
          </ContainerInfo>
          <Button.Root
            onClick={() => handleUsePromotion(promotion)}
            orientation="v"
            bg="brand.primary.100"
            w="full"
            borderRadius={8}
            h={48}
          >
            <Button.Text font="label/button/m/bold" color="text.absolute.whiteAbsolute.100">
              Usar Cupom
            </Button.Text>
          </Button.Root>
        </ContainerPromotion>
      )}
      <ContainerDescription>
        {promotion.description.split("\n").map((item, key) => {
          return (
            <Text htmlTag="h2" font="paragraph/l/regular"  key={key}>
              {item}
              <br />
            </Text>
          );
        })}
      </ContainerDescription>
      <Footer>
        <Button.Root
          onClick={() => handleParticipatePromotion()}
          justifycontent="center"
          orientation="h"
          bg="brand.secondary.accent.textYellow"
          borderRadius={8}
          h={48}
          w="full"
        >
          <Button.Text color="background.dynamic.blackDynamic.100" font="label/button/m/bold">
            Participar
          </Button.Text>
          <Button.Icon color="background.dynamic.blackDynamic.100" icon={FaArrowRightLong} size={20} />
        </Button.Root>
      </Footer>
    </Container>
  );
}

interface PromotionsExpadedProps {
  promotion: Promotion;
  handleUsePromotion: (promotion: Promotion) => void;
  handleParticipatePromotion: () => void;
  handleCloseDetails: () => void;
}
