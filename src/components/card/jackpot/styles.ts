import styled, { keyframes } from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 8px;
  padding: 8px 12px;
  gap: 8px;
`;

export const DetailEvent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 30px;
`;

export const InfoTeam = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;
export const Team = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;

export const DetailOdds = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

interface ContainerMessageProps {
  type: "main" | "reserve1" | "reserve2";
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ContainerMessage = styled.div<ContainerMessageProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ type, theme }) =>
    type === "main" ? theme.brand.secondary[24] : theme.brand.secondary.accent.bgYellow};
  animation: ${fadeIn} 0.25s;
`;
