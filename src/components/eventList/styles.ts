import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

interface EventListProps {
  marginBottom?: boolean;
}

export const MoreGames = styled.div<{ view: boolean }>`
  display: ${({ view }) => (view ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
  padding: 8px 12px 8px 12px;
  height: 90px;
  margin-top: -90px;
  position: relative;
  background: ${({ theme }) => {
    return `linear-gradient(0deg, ${theme.background.dynamic.blackDynamic[100]} 0%, ${theme.misc.blackDynamic[40]}, transparent 100%)`;
  }};
  z-index: 9;
`;

export const Container = styled.div<EventListProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? "100px" : "0")};
`;


export const RootLoading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

export const Group = styled.div<{ viewitem: boolean }>`
  display: ${({ viewitem }) => (viewitem ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding: 6px;
  gap: 4px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  border-radius: 8px;
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;


export const Detail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    
  }
`;

export const ViewCard = styled.div<{
  mode: "grid" | "column";
  isMobile: boolean;
}>`
  display: ${({ mode }) => (mode === "grid" ? "grid" : "flex")};
  flex-direction: column;
  grid-template-columns: ${({ isMobile }) => (isMobile ? "1fr" : "1fr 1fr 1fr")};
  gap: 4px;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const IconTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 8px;
`;

export const CardTitle = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 8px;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  ${() => typography["label/button/s/bold"]}
`;