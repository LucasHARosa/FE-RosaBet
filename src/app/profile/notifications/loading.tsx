"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Content, GroupNotifications, Notification } from "./styles";
import { useTheme } from "styled-components";

export default function Loading() {
  const theme = useTheme()
  return (
    <SkeletonTheme baseColor={theme.border.whiteDynamic[8]} highlightColor={theme.border.whiteDynamic[16]}>
      <Content>
        <GroupNotifications>
          <Skeleton width="82px" height={18} />
          <Notification unread>
            <Skeleton width="100%" height={18} />
          </Notification>
          <Notification unread>
            <Skeleton width="100%" height={18} />
          </Notification>
          <Notification unread>
            <Skeleton width="100%" height={18} />
          </Notification>
          <Notification unread>
            <Skeleton width="100%" height={18} />
          </Notification>
          <Notification unread>
            <Skeleton width="100%" height={18} />
          </Notification>
          <Notification unread>
            <Skeleton width="100%" height={18} />
          </Notification>
        </GroupNotifications>
      </Content>
    </SkeletonTheme>
  );
}
