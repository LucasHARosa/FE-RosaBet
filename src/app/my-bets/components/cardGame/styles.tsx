import { typography } from "@/assets/themes/typograph";
import { colorPicker } from "@/utils/colorPicker";
import Link from "next/link";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic["16"]};
`;

export const Top = styled(Link)`
  display: flex;
  align-items: center;
  padding: 13px 16px;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.border.whiteDynamic["16"]};
  border-radius: 16px 16px 0 0;
`;

export const InfoTeam = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic["4"]};
  border-radius: 0 0 16px 16px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Status = styled.div<{ bg: string }>`
  background-color: ${({ bg }) => colorPicker(bg)};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  
  ${() => typography["label/body/xs/semiBold"]}
`;

export const Line = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const GroupTeams = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  small {
    ${() => typography["label/body/xs/bold"]}
  }
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
