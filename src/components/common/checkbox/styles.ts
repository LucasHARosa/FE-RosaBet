import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  cursor: pointer;
  width: 100%;

  input[type="checkbox"] {
    appearance: none;
    -webkit-appearance: none;
    border-radius: 50%;
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
    cursor: pointer;
    display: inline-block;
    position: relative;
  }

  input[type="checkbox"]:checked {
    background-color: ${({ theme }) => theme.brand.secondary[100]};
  }

  input[type="checkbox"]:checked::before {
    content: "✓";
    display: flex;
    justify-content: center;
    border-radius: 50%;
    align-items: center;
    color: ${({ theme }) => theme.background.dynamic.blackDynamic[100]};
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    ${() => typography["label/body/s/regular"]}
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
