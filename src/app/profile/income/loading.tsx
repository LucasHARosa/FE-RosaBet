"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Content } from "./styles";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Content>
        <Skeleton width="60px" height={18} />
        <Skeleton width="100%" height={42} />
        <Skeleton width="100%" height={42} />
      </Content>
    </SkeletonTheme>
  );
}
