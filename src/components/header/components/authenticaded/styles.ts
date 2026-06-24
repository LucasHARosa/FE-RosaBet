import Link from "next/link";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Box = styled.div`
  display: flex;
  gap: 4px;
`;

export const BalanceInfo = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Balance = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: ${({ isMobile }) => (isMobile ? "4px 8px" : "12px 16px")};
  inline-size: max-content;
`;

export const PixLink = styled(Link)<{ viewitem: string }>`
  display: ${({ viewitem }) => (viewitem === "true" ? "flex" : "none")};
  background-color: ${({ theme }) => theme.brand.primary[100]};
  border-radius: 0 8px 8px 0;
  padding: 10px;
`;

export const Refresh = styled.button<{ isMobile: boolean }>`
  margin-right: ${({ isMobile }) => (isMobile ? "4px" : "12px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;

  &:disabled {
    animation: ${rotate} 1s linear infinite;
  }
`;

export const BadgePhoto = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 8px;
  padding: 6px;
  min-width: 46px;
  width: 46px;
  height: 46px;
`;
