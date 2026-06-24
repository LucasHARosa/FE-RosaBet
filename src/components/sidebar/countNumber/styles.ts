import styled, { keyframes } from "styled-components";

interface CircleProps {
  live?: boolean;
  select?: boolean;
  count?: number;
}

export const ContainerNumber = styled.div<CircleProps>`
  display: ${({ count }) =>count && count > 0  ? 'flex' : 'none'};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${({ select, live, theme }) => 
    !select && live ?
      theme.brand.secondary[24]
    : select ?
      theme.text.dynamic.whiteDynamic[40] 
    :
      theme.text.dynamic.dynamicDisabled
  };
 
  padding: 3px 5px;
  gap: 4px;

  @media (max-width: 768px) {
    padding: 3px 4px;
    gap: 6px;
  }
  @media (max-width: 480px) {
    padding: 3px 4px;
    gap: 4px;
  }
`;

export const Circle = styled.div<CircleProps>`
  display: flex;
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background-color: ${({ select, live, theme }) => !select && live ? theme.brand.secondary[24] : theme.background.absolute.whiteAbsolute[24]};
  align-items: center;
  justify-content: center;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

export const CircleInternal = styled.div<CircleProps>`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: ${({ select, live, theme }) => !select && live ? theme.brand.secondary[100] : theme.background.absolute.whiteAbsolute[100]};
  animation: ${pulse} 1.5s infinite;
`;
