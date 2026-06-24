import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 40px;
`;

export const GroupNotifications = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Notification = styled.div<{ unread: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ unread, theme }) => (unread ? theme.background.dynamic.whiteDynamic[8] : theme.background.dynamic.whiteDynamic[4])};
  padding: 12px;
  border-radius: 16px;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Badge = styled.div<{ unread: boolean }>`
  display: ${({ unread }) => (unread ? "block" : "none")};
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.brand.secondary[100]};
  margin: auto;
  margin-right: 6px;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  text-align: end;
`;
