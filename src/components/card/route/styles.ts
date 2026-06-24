import styled from "styled-components";

export const Card = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
  display: flex;
  background-color: ${({theme})=>theme.background.dynamic.whiteDynamic[8]};
  border-radius: 12px;
  &:hover {
    opacity: 0.8;
  }  
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
