import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
`;

export const Left = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  width: 22vw;
  /* padding: 24px 16px; */
  padding: 8px;
  gap: 24px;
  /* overflow-y: scroll; */
`;

export const Right = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
  width: 22vw;

  #sr-widget-1 {
    width: 100%;
    height: 100%;
  }
`;

export const Switch = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 2px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 10px;
`;

export const Option = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ isActive, theme }) => (isActive ? theme.brand.primary[100] : "transparent")};
  color: ${({ isActive, theme }) => (isActive ? theme.text.absolute.whiteAbsolute[100] : theme.text.dynamic.whiteDynamic[64])};
  cursor: pointer;
  width: 100%;
  ${() => typography["label/body/m/bold"]}
`;

export const Details = styled.details`
  padding: 8px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};

  &[open] {
    #open {
      display: flex;
    }
    #close {
      display: none;
    }
  }

  &:not([open]) {
    #open {
      display: none;
    }
    #close {
      display: flex;
    }
  }
`;

export const Summary = styled.summary`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  ${() => typography["label/button/s/semiBold"]}
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[80]};
  cursor: pointer;
`;

export const GroupCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }
`;

export const Games = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 12px;
`;