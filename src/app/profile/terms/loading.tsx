"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Content } from "./styles";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Content>
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
        <Skeleton width="100%" height={36} />
      </Content>
    </SkeletonTheme>
  );
}
