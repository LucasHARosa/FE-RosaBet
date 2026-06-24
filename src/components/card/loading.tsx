"use client";
import _ from "lodash";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { BoxSpace, Card, DetailGame, DetailInfo, DetailOdds } from "./line/styles";
import { useTheme } from "styled-components";

export default function Loading({ count = 6 }: LoadingProps) {
  const theme = useTheme()
  const skeletonThemes = _.times(count, (index) => (
    <SkeletonTheme key={index} baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Card isMobile>
        <DetailInfo href={""}>
          <BoxSpace>
            <DetailGame>
              <Skeleton count={1} width={90} />
            </DetailGame>
            <DetailGame>
              <Skeleton count={1} width={120} />
            </DetailGame>
          </BoxSpace>
          <Skeleton count={2} width={220} />
        </DetailInfo>
        <DetailOdds>
          <Skeleton count={3} height={65} inline borderRadius="8px" />
        </DetailOdds>
      </Card>
    </SkeletonTheme>
  ));

  return <>{skeletonThemes}</>;
}

interface LoadingProps {
  count?: number;
}
