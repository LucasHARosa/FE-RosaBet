import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Skeleton count={4} height={103} borderRadius={"16px"} style={{ marginBottom: "4px" }} />
    </SkeletonTheme>
  );
}
