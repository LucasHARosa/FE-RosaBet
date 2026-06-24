import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Skeleton count={10} height={131} borderRadius={"16px"} style={{ marginBottom: "16px" }} />
    </SkeletonTheme>
  );
}
