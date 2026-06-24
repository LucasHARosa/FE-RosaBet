import styled, { keyframes } from "styled-components";

const pulseUp = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(2px);
  }
`;

const pulseDown = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
`;



export const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;

  small {
    max-width: 16vw;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  > button {
    height: 100%;
  }
`;

export const GlowEffect = styled.div<{ type: "down" | "up"; fixed?: boolean}>`
  position: absolute;
  border-left: 6px solid transparent;
  border-right: 6px solid ${({ type, theme }) => (type === "down" ? theme.brand.secondary[100] : theme.brand.secondary.accent.green[100])};
  border-bottom: 6px solid ${({ type, theme }) => (type === "down" ? theme.brand.secondary[100] : "transparent")};
  border-top: 6px solid ${({ type, theme }) => (type === "down" ? "transparent" : theme.brand.secondary.accent.green[100])};
  right: 0;
  ${({ type }) => type === "down" && "bottom: 0;"}
  ${({ type }) => type === "up" && "top: 0;"}
    animation: ${({ type, fixed }) =>
    !fixed ? (type === "up" ? pulseUp : pulseDown) : "none"} 1s alternate infinite ease-in-out;

`;

export const GlowEffectFixed = styled.div<{ type: "down" | "up" }>`
  position: absolute;
  border-left: 10px solid transparent;
  border-right: 10px solid ${({ type, theme }) => (type === "down" ? theme.brand.secondary[100] : theme.brand.secondary.accent.green[100])};
  border-bottom: 10px solid ${({ type, theme }) => (type === "down" ? theme.brand.secondary[100]  : "transparent")};
  border-top: 10px solid ${({ type, theme }) => (type === "down" ? "transparent" : theme.brand.secondary.accent.green[100])};
  right: 0;
  ${({ type }) => type === "down" && "bottom: 0;"}
  ${({ type }) => type === "up" && "top: 0;"}
`;
