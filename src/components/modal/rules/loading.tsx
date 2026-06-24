import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { SubRule, Detail, Container } from "./styles";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Container>
        <Skeleton width="100px" height={18} />
        <SubRule>
          <Detail>
            <Skeleton width="120px" height={18} />
            <Skeleton width="100%" count={8} />
          </Detail>
          <Detail>
            <Skeleton width="120px" height={18} />
            <Skeleton width="100%" count={8} />
          </Detail>
        </SubRule>
      </Container>
    </SkeletonTheme>
  );
}
