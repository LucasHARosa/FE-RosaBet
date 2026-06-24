import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";


export const Box = styled.div`
  position: absolute;
  box-shadow: 0px 2px 24px 0px ${({ theme }) => theme.background.dynamic.blackDynamic[100]};
  background-color: ${({ theme }) => theme.misc.modal};
  padding: 16px;
  border-radius: 16px;
  gap: 16px;
  top: 48px;
  left: 0;
  width: 100%;
  z-index: 99;
`;

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  ${() => typography["label/body/s/regular"]}

  &:hover {
    opacity: 0.8;
  }
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
