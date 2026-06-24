import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Switch = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 16px;
  gap: 4px;
  padding: 4px;
`;

export const Item = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  ${({ active, theme }) => active && `background-color: ${theme.background.dynamic.whiteDynamic[8]};`}
  color: ${({ active, theme }) => (active ? theme.text.dynamic.whiteDynamic[100] : theme.text.dynamic.whiteDynamic[40])};
  padding: 12px;
  border-radius: 12px;
  ${({ active }) => active ? typography["label/body/m/bold"] : typography["label/body/m/regular"]}
`;
