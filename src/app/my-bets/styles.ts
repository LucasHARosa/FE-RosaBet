import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Container = styled.div<{ isMobile: boolean }>`
  display: flex;
  height: 100%;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
`;

export const BoxLeft = styled.div<{ isViewMobile: boolean; isMobile: boolean }>`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  height: 100%;
  
  flex-direction: column;
  overflow-y: scroll;
  width: -webkit-fill-available;
  @media (max-width: 1070px) {
    display: ${({ isViewMobile }) => (isViewMobile ? "none" : "flex")};
  }
  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export const BoxRight = styled.div<{ isViewMobile: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: 1070px) {
    display: ${({ isViewMobile }) => (isViewMobile ? "flex" : "none")};
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  width: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 18px 24px;
  gap: 16px;
`;

export const GroupCard = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: ${({ isMobile }) => (isMobile ? "1fr" : "1fr 1fr")};
  gap: 4px;
`;

export const Card = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-radius: 16px;
  width: 100%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  justify-content: space-between;
  border: ${({ isSelected, theme }) => isSelected && `1px solid ${theme.border.whiteDynamic[40]}`};
`;

export const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CardRight = styled.div``;

export const LineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: 1312px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Anchor = styled.button<{ selected: boolean }>`
  display: flex;
  width: 100%;
  flex: 1;
  justify-content: center;
  padding: 8px;
  border-bottom: 1px solid ${({ selected, theme }) => (selected ? theme.brand.primary[100] : "transparent")};
  font-weight: ${({ selected }) => (selected ? "bold" : "normal")};
  color: ${({ selected, theme }) => (selected ? theme.text.dynamic.whiteDynamic[100] : theme.text.dynamic.whiteDynamic[64])};
`;

export const ReturnValue = styled.span`
  color: ${({ theme }) => theme.brand.secondary.accent.green[100]};
  margin-left: 4px;
`;

export const Badge = styled.div`
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  min-width: 18px;
  min-height: 18px;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  border-radius: 52px;
  place-content: center;
  margin-left: 4px;

  ${() => typography["label/body/s/semiBold"]}
`;

export const DetailBox = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InfoTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const NotSelected = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  gap: 8px;
`;

export const InfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const GroupButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Return = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  place-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  gap: 6px;
`;

export const GroupInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
`;

export const GroupInput = styled.div`
  display: flex;
  gap: 4px;
`;
