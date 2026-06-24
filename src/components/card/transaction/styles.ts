"use client";
import { colorPicker } from "@/utils/colorPicker";
import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 16px;
  gap: 16px;
  padding: 8px 16px;
`;

export const BoxImage = styled.div<{ isWithdrawal: boolean }>`
  display: flex;
  border-radius: 8px;
  padding: 9px 7px;
  background-color: ${({ isWithdrawal, theme }) =>
    isWithdrawal ? theme.brand.secondary.accent.green[8] : theme.background.dynamic.whiteDynamic[8] };
`;

export const Pendent = styled.div<{ bg: string; color: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  padding: 4px 6px;
  background-color: ${({ bg }) => colorPicker(bg)};
  color: ${({ color }) => colorPicker(color)};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-right: auto;
`;

export const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
