import styled, { keyframes } from "styled-components";

const stretchDelay = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
  } 20% { 
    transform: scaleY(1.0);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  -webkit-box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
  margin: 16px;
  border-radius: 4px;
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: ${({ theme }) => theme.brand.primary[100]};
  margin: 0;
  width: 28px;
  height: 14px;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
`;

export const Bars = styled.div`
  background-color: currentColor;
  height: 100%;
  width: 4px;
  display: inline-block;
  border-radius: 2px;
  -webkit-animation: ${stretchDelay} 1.2s ease-in-out infinite;
  animation: ${stretchDelay} 1.2s ease-in-out infinite;

  &:nth-child(2) {
    animation-delay: -1.1s;
  }
  &:nth-child(3) {
    animation-delay: -1s;
  }
`;
