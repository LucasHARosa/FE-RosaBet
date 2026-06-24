import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  position: relative;
  height: calc(100vh - 80px);
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

export const Games = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 12px;
`;

export const Center = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  position: sticky;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  overflow-y: scroll;
  overflow-x: hidden;
  max-width: ${({ isMobile }) => (isMobile ? "100%" : "56vw")};
  width: 100%;
`;

export const Right = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
  width: 22vw;

  #sr-widget-1 {
    width: 100%;
    height: 100%;
  }
`;

export const InfoTeam = styled.div<{ bg: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 16px;
  padding: 24px;
  background-image: ${({ bg }) => `url(${bg})`};
  background-position: 100%;
  background-size: cover;
  background-position-x: center;
`;

export const GroupCoast = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 9;
  gap: 24px;
`;

export const CoatOfArms = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
`;

export const Scoreboard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  flex: 2;
  gap: 18px;
`;

export const Timer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: ${({ theme }) => theme.misc.blackDynamic[24]};
  text-align: center;
  
  ${() => typography["label/body/l/regular"]}
`;

export const Score = styled.div`
  ${() => typography["display/s/bold"]}
`;

export const GroupMatch = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 12px 12px 0 0;
  backdrop-filter: blur(40px);
`;

export const InfoMatch = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  backdrop-filter: blur(40px);
  border-radius: 12px 12px 0 0;
  z-index: 9;
  gap: 12px;
`;

export const GroupFilter = styled.div<{ isFixed: boolean; isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 0 12px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  position: ${({ isFixed }) => isFixed && "fixed"};
  background-color: ${({ isFixed, theme }) => isFixed && theme.background.dynamic.blackDynamic[100]};
  width: 100%;
  top: 80px;
  z-index: 9;
  max-height: 80px;
  /* position: ${({ isFixed }) => (isFixed ? "fixed" : "relative")}; */

  > a {
    width: fit-content;
    min-width: fit-content;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BoxHighlight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;

  @media (min-width: 768px) {
    .alice-carousel__stage-item {
      min-width: 410px !important;
    }
  }
`;

export const GroupMarkets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 20px;
`;

export const Paper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SelectType = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 2px;
  border-radius: 10px;
`;

export const LoadingSelect = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > span {
    display: flex;
    align-items: center;
    width: 100%;
  }
`;

export const LoadingGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
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
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ isActive, theme }) => (isActive ? theme.brand.primary[100] : "transparent")};
  color: ${({ isActive, theme }) => (isActive ? theme.text.absolute.whiteAbsolute[100] : theme.text.dynamic.whiteDynamic[64])};
  cursor: pointer;
  width: 100%;
  ${({ isActive }) => (isActive ? typography['label/body/m/bold'] : typography['label/body/m/regular'])};
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
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[80]};
  cursor: pointer;

  ${() => typography["label/body/s/semiBold"]}
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

export const HomeCoast = styled.div<{ image: string }>`
  position: absolute;
  left: -90px;
  top: 0;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
  filter: grayscale(100%);
  opacity: 0.5;
  z-index: 1;
`;

export const OutCoast = styled.div<{ image: string }>`
  position: absolute;
  right: -90px;
  top: 0;
  background-image: ${({ image }) => `url(${image})`};
  background-size: cover;
  background-position: center;
  width: 200px;
  height: 200px;
  filter: grayscale(100%);
  opacity: 0.5;
  z-index: 1;
`;
