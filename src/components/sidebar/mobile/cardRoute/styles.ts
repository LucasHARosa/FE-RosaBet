import styled from "styled-components";


interface CardProps {
  borderType?: string;
  borderRadius?: number;
  color?: string;
  isView?: boolean;
  select: boolean;
}
export const Card = styled.div<CardProps>`
  display: ${({ isView }) => (isView ? "flex" : "none")};
  height: 48px;
  width: 100%;
  padding: 0px 14px;
  gap: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-top-left-radius: ${({ borderType, borderRadius }) => borderType?.includes("1") ? borderRadius : '0'}px;
  border-top-right-radius: ${({ borderType , borderRadius}) => borderType?.includes("2")? borderRadius : '0'}px;
  border-bottom-right-radius: ${({ borderType, borderRadius }) => borderType?.includes("3") ? borderRadius : '0'}px;
  border-bottom-left-radius: ${({ borderType, borderRadius }) => borderType?.includes("4") ? borderRadius : '0'}px;
  background-color: ${({ select, theme }) =>  select ? theme.brand.primary[100] : theme.background.dynamic.whiteDynamic[8]};
  @media (max-width: 480px) {
    padding: 0px 8px;
  }
`;

export const Set = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 380px) {
    gap: 4px;
  }
`;


