import Link from "next/link";
import styled from "styled-components";

export const Card = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border: ${({ isSelected,theme}) => (isSelected ? `2px solid ${theme.brand.secondary.accent.textYellow}` : "none")};
  border-radius: 8px;
  padding: 8px 12px;
  gap: 8px;
`;

export const Header = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const InfoTeam = styled(Link)`
  display: flex;
  align-items: center;
`;

export const Team = styled.div`
  display: flex;
  min-height: 58px;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const DetailOdds = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 2px;
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Timestamp = styled.div`
  display: flex;
  align-items: center;
`;
