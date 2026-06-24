import styled from "styled-components";

export const SelectWrapper = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${({theme}) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 8px;
  padding: 18px;
  cursor: pointer;
  border: 1px solid ${({theme}) => theme.border.whiteDynamic[8]};
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
`;

export const IconWrapper = styled.div`
  color: ${({theme}) => theme.text.dynamic.whiteDynamic[40]};
`;
