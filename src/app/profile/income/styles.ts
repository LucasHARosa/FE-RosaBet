import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 40px;
  
`;

export const PDF = styled.button`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px 12px;
  background-color: ${({ theme }) => theme.brand.secondary[24]};
  color: ${({ theme }) => theme.brand.secondary[100]};
  gap: 8px;
  ${() => typography["label/button/m/bold"]}
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`;

export const GroupDownload = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Year = styled.button<{ active: boolean }>`
  display: flex;
  background-color: ${({ active, theme }) => (active ? theme.background.dynamic.whiteDynamic[8] : "transparent")};
  color: ${({ active, theme }) => (active ?  theme.brand.secondary[100] : theme.text.dynamic.whiteDynamic[64])};
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  font-weight: ${({ active }) => (active ? "700" : "400")};
  ${() => typography["label/button/m/regular"]}
`;

export const Row = styled.div<{ isEven?: boolean }>`
  background-color: ${({ isEven, theme }) => (isEven ? theme.background.dynamic.whiteDynamic[8] : "transparent")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const GroupRow = styled.section`
  display: flex;
  flex-direction: column;
`;
