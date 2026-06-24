import styled, { keyframes } from "styled-components";

interface CuponsProps {
  isOpen: boolean;
}
export const Position = styled.div<{ isMobile: boolean, isOpen:boolean }>`
  position: fixed;
  bottom: 0px;
  width: ${({ isMobile }) => (isMobile ? "100%" : "360px")};
  right: ${({ isMobile }) => (isMobile ? "0px" : "25px")};
  padding: ${({ isMobile }) => (isMobile ? "0 22px" : "0")};
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  z-index: ${({isOpen}) => (isOpen ? 9999999 : 1000)};

  @media (max-width: 768px) {
    right: 0px;
    bottom:0px;
    width: 100%;
  }
  @media (max-width: 425px) {
    right: 0px;
    padding: 0 22px;
    width: 100%;
  }
`;

export const CuponModal = styled.div`
  background-color: ${({ theme }) => theme.background.dynamic.blackDynamic[100]};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  display: flex;
  flex-direction: column;
`;

export const HeaderCupons = styled.div<CuponsProps>`
  height: 50px;
  gap: 8px;
  padding: 0 16px;
  background-color: ${({ theme }) => theme.brand.primary[100]};

  display: flex;
  flex-direction: row;
  align-items: center;

  justify-content: space-between;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  // border-bottom-left-radius: ${({ isOpen }) => (isOpen ? "0" : "8px")};
  // border-bottom-right-radius: ${({ isOpen }) => (isOpen ? "0" : "8px")};

  cursor: pointer;
`;


export const Indicator = styled.div<CuponsProps>`
  background-color: ${({ theme }) => theme.background.absolute.whiteAbsolute[24]};
  display: flex;
  align-items: center;
  padding: 2px;
  border-radius: 16px;
`;

export const ResumeNumber = styled.div<CuponsProps>`
  height: 24px;
  min-width: 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.absolute.whiteAbsolute[24]};
  align-items: center;
  display: flex;
  justify-content: center;
`;

export const AnimatedContent = styled.div<CuponsProps>`
  max-height: ${({ isOpen }) => (isOpen ? "1000px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  border-left: 2px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  border-right: 2px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  overflow: hidden;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0px;
  gap: 8px;
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


export const ContainerSelectOption = styled.div<CuponsProps>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: ${fadeInUp} 0.1s ease-in-out;
`;

export const ContainerOdds = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 16px 20px;
  max-height: 45vh;
  overflow-y: auto;
  
`;

export const ContainerFooter = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  padding: 16px 16px;

  border-top: 0.5px solid ${({ theme }) => theme.border.whiteDynamic[8]};
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ValueBet = styled.div`
  height: 43px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};
  border-radius: 8px;
  padding: 0px 16px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const CircleCurrency = styled.div`
  background-color: ${({ theme }) => theme.brand.secondary.accent.green[100]};
  border-radius: 50%;
  min-width: 20px;
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

export const ContainerBet = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  @media (max-width: 425px) {
    flex-direction: column;
    gap:4px;
    align-items: stretch;
  }
`;

export const ValuePrefix = styled.button`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[16]};

  border-radius: 8px;
  cursor: pointer;
`;

interface GapProps {
  size: number;
}

export const Gap = styled.div<GapProps>`
  width: ${({ size }: GapProps) => size}px;
  height: ${({ size }: GapProps) => size}px;
`;
