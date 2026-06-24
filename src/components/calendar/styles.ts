import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const ContainerLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  height: 56px;
  background-color: ${({theme}) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.border.whiteDynamic[8]};
  padding: 10px 20px;
  gap: 4px;
  cursor: pointer;

  label {
    ${() => typography["paragraph/l/semiBold"]}
    color: ${({theme}) => theme.text.dynamic.whiteDynamic[80]};
  }
`;
