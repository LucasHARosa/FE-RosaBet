import styled, { keyframes } from "styled-components";
import Link from "next/link";

interface CardCupomProps {
  available: boolean;
}

interface HeaderProps {
  oddState: string;
}

interface OddChange {
  glowUp: boolean;
  glowDown: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const HeaderLink = styled(Link)`
  width: 100%;
`;

export const Header = styled.div<HeaderProps>`
  display: flex;
  height: 48px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 8px 0 12px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const Shields = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const Footer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 8px 16px;
`;

export const ContainerInfo = styled.div<CardCupomProps>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-decoration: ${({ available }) => (available ? "none" : "line-through")};
  width: 100%;
  overflow: hidden;
  border-right: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};
  margin-right: 4px;
`;

export const InfoOdd = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: nowrap;
`;

export const Small = styled.small<{ isMobile: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: ${({ isMobile }) => (isMobile ? "100px" : "170px")};
`;

const pulse = keyframes`
  0% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
`;


export const Odd = styled.div<OddChange>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, glowDown, glowUp }) => {
    if (glowDown) {
      return theme.brand.secondary[24];
    }
    if (glowUp) {
      return "#A7FF6624";
    }
    return theme.background.dynamic.whiteDynamic[8];
  }};
  animation: ${({ glowDown, glowUp }) => (glowDown || glowUp ? pulse : "none")} 1s alternate infinite ease-in-out;
  padding: 4px 6px;
  border-radius: 4px;
`;

export const Flag = styled.div<HeaderProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: 6px;
  background-color: ${({ oddState, theme }) =>
    oddState === "live" ? theme.brand.secondary[24] : theme.background.dynamic.whiteDynamic[8]};
`;
