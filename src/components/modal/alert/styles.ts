import styled from "styled-components";

export const Ball = styled.div<{ bg: string }>`
  display: flex;
  background-color: ${({theme, bg}) => {
    switch (bg) {
      case 'success':
        return theme.brand.secondary.accent.green[8];
      case 'alert':
        return theme.brand.secondary.accent.bgYellow;
      case 'info':
        return theme.background.dynamic.whiteDynamic[8];
      case 'error':
        return theme.brand.secondary[24];
      default:
        return theme.background.dynamic.whiteDynamic[8];
    }
  }};
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 50%;
`;

export const Container= styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
`;
