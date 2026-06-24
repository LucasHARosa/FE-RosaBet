import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Box = styled.div`
  position: absolute;
  box-shadow: 0px 2px 24px 0px rgba(0, 0, 0, 1);
  background-color: ${({ theme }) => theme.misc.modal};
  padding: 16px;
  border-radius: 16px;
  gap: 16px;
  top: 48px;
  left: 0;
  width: 100%;
  max-height: 80vh;
  overflow-y: scroll;
  z-index: 99;
  
`;

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  cursor: pointer;
  width: 100%;

  &:hover {
    opacity: 0.8;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    object-fit: cover;
  }
`;

export const Detail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const GroupFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
`;

export const Filter = styled.button<{ isSelected: boolean }>`
  background-color: ${({ isSelected, theme }) => (isSelected ? theme.brand.primary[100]: theme.background.dynamic.whiteDynamic[4])};
  color: ${({ isSelected, theme }) => (isSelected ? theme.text.dynamic.whiteDynamic[100] : theme.text.dynamic.whiteDynamic[80])};
  text-transform: capitalize;
  border-radius: 8px;
  padding: 11px 12px;
  ${() => typography["label/button/s/bold"]}
`;

export const NotFound = styled.span`
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[64]};
  text-align: center;
  display: block;
  padding: 16px 0;
  ${() => typography["label/body/m/semiBold"]}
`;
