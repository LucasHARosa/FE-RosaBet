import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, ContainerInfo, Footer, Header, InfoOdd, Shields } from "./styles";
import { Button } from "@/components/common/button";
import useCardCupom from "./useCupomCard";
import { CardCupomProps } from "@/interfaces/cupons";
import Icon from "@/utils/icon";
import { useTheme } from "styled-components";

export default function Loading({ sport, disabled }: CardCupomProps) {
  const { handleRemove } = useCardCupom(sport);
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Container>
        <Header oddState="none">
          <Skeleton count={1} width={90} />
          <Shields>
            <Skeleton circle={true} height={32} width={32} />
            <Skeleton circle={true} height={32} width={32} />
          </Shields>
        </Header>
        <Footer>
          <ContainerInfo available={false}>
            <Skeleton count={1} width={90} />
            <InfoOdd>
              <Skeleton count={1} width={16} />
              <Skeleton count={1} width={120} />
              <Skeleton count={1} width={16} />
            </InfoOdd>
          </ContainerInfo>
          <Button.Root onClick={handleRemove} disabled={disabled}>
            <Icon name="trash" color="brand.secondary.100" size={20} />
          </Button.Root>
        </Footer>
      </Container>
    </SkeletonTheme>
  );
}
