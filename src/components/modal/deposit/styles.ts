import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
  justify-content: right;
`;

export const Section = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const Prize = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  gap: 4px;
`;

export const Money = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex: 3;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 12px 16px;
  border-radius: 8px;
  gap: 8px;
`;

export const Country = styled.div`
  display: flex;
  padding: 6px;
  border-radius: 8px;
  width: fit-content;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
`;

export const Amount = styled.div<{ isValue: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  margin: auto;

  input {
    color: ${({ isValue, theme }) => (isValue ? theme.text.dynamic.whiteDynamic[100] : theme.text.dynamic.whiteDynamic[40])};
    text-align: center;
    ${() => typography["heading/m/bold"]}
  }
`;

export const Option = styled.label<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;

  input[type="radio"] {
    display: none;
    accent-color: ${({ theme }) => theme.brand.secondary.accent.green[100]};
  }
`;

export const Copy = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
  width: 100%;
`;

export const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 4px;
  outline: none;
  border: none;
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const BoxButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 80px;
  width: 100%;
`;

export const Promo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const IconPix = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.brand.secondary.accent.green[8]};
`;