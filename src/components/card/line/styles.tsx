import Link from "next/link";
import styled from "styled-components";

export const Card = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  gap: ${({ isMobile }) => (isMobile ? "8px" : "0")};
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 8px;
  padding: 8px 12px;
`;

export const DetailInfo = styled(Link)`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const GroupOdd = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

export const SeeMore = styled.a`
  display: flex;
  align-items: center;
  gap: 2px;
  color: ${({ theme }) => theme.brand.secondary[100]};

  &:hover {
    opacity: 0.8;
  }
`;

export const DetailOdds = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  gap: 2px;

  > span {
    display: flex;
    width: 100%;
    gap: 4px;
    margin-left: 10px;
    padding: 6px;
  }
`;

export const BoxSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Team = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const DetailGame = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Line = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? "none" : "block")};
  width: 1px;
  height: 80px;
  background-color: ${({ theme }) => theme.border.whiteDynamic[16]};
  margin: 0 16px;
`;
