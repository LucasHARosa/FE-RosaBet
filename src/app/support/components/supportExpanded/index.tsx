import { Guide } from "@/interfaces/support";
import { Container, ContainerInfo, Footer, FooterInfo, Header, Info } from "./styles";
import Text from "@/components/common/text";
import { Button } from "@/components/common/button";
import { HiMiniHandThumbDown, HiMiniHandThumbUp } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

export default function SupportExpanded({ guide, handleCloseGuide }: SupportExpandedProps) {
  return (
    <Container>
      <Header>
        <Text htmlTag="h1" font="heading/m/bold">
          {guide.title}
        </Text>
        <Button.Root
          onClick={handleCloseGuide}
          orientation="h"
          bg="background.dynamic.whiteDynamic.8"
          borderRadius={16}
          justifycontent="center"
        >
          <Button.Icon icon={IoClose} size={18} />
        </Button.Root>
      </Header>
      <ContainerInfo>
        <Info>
          {guide.text.map((item, key) => {
            return (
              <>
                <Text
                  htmlTag="h2"
                  font="label/body/m/bold"
                  style={{ margin: "12px 0px" }}
                  key={key}
                >
                  {item.title}
                </Text>

                {item.description.map((description, key) => {
                  return (
                    <Text htmlTag="h3" font="label/body/m/regular" color="text.dynamic.whiteDynamic.64" key={key}>
                      {description}
                    </Text>
                  );
                })}
              </>
            );
          })}
          <FooterInfo>
            <Text htmlTag="h3" font="label/body/s/regular" color="brand.secondary.accent.textYellow">
              {guide.footer}
            </Text>
          </FooterInfo>
        </Info>

        <Footer>
          <Button.Root
            orientation="h"
            bg="brand.secondary.accent.bgYellow"
            borderRadius={16}
            justifycontent="center"
          >
            <Button.Icon icon={HiMiniHandThumbDown} size={18} color="brand.secondary.accent.textYellow" />
          </Button.Root>
          <Button.Root
            orientation="h"
            bg="brand.secondary.accent.bgYellow"
            borderRadius={16}
            justifycontent="center"
          >
            <Button.Icon icon={HiMiniHandThumbUp} size={18} color="brand.secondary.accent.textYellow" />
            <Button.Text font="label/button/m/bold" color="brand.secondary.accent.textYellow">
              Ajudou
            </Button.Text>
          </Button.Root>
        </Footer>
      </ContainerInfo>
    </Container>
  );
}

interface SupportExpandedProps {
  guide: Guide;
  handleCloseGuide: () => void;
}
