import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const AlertMessage = styled.span<{ bg: string; color: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.bg};
  padding: 8px 12px;
  border-radius: 4px;
  color: ${(props) => props.color};
  ${() => typography["label/body/s/semiBold"]}
`;

export const ErrorMessage = styled.small`
  color: ${({ theme }) => theme.brand.secondary[100]};
  ${() => typography["label/body/xs/regular"]}
`;
