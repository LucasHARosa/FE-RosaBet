"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { LoadingGroup, LoadingSelect } from "./styles";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Skeleton width="100%" height={180} />
      <LoadingSelect>
        <Skeleton
          width="100%"
          height={42}
          borderRadius={12}
          count={8}
          inline
          style={{ margin: "10px" }}
        />
      </LoadingSelect>
      <LoadingGroup>
        <Skeleton width={200} height={16} borderRadius={12} style={{ marginTop: "10px" }} />
        <LoadingSelect>
          <Skeleton
            width="100%"
            height={40}
            borderRadius={12}
            count={3}
            inline
            style={{ marginRight: "10px" }}
          />
        </LoadingSelect>
      </LoadingGroup>
      <LoadingGroup>
        <Skeleton width={200} height={16} borderRadius={12} style={{ marginTop: "10px" }} />
        <LoadingSelect>
          <Skeleton
            width="100%"
            height={40}
            borderRadius={12}
            count={3}
            inline
            style={{ marginRight: "10px" }}
          />
        </LoadingSelect>
        <LoadingSelect>
          <Skeleton
            width="100%"
            height={40}
            borderRadius={12}
            count={3}
            inline
            style={{ marginRight: "10px" }}
          />
        </LoadingSelect>
      </LoadingGroup>
      <LoadingGroup>
        <Skeleton width={200} height={16} borderRadius={12} style={{ marginTop: "10px" }} />
        <LoadingSelect>
          <Skeleton
            width="100%"
            height={40}
            borderRadius={12}
            count={3}
            inline
            style={{ marginRight: "10px" }}
          />
        </LoadingSelect>
      </LoadingGroup>
    </SkeletonTheme>
  );
}
