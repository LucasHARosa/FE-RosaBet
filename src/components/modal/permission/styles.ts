import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 40vh;
`;

export const Box = styled.button`
  display: flex;
  align-items: center;
  padding: 0px 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  border-radius: 12px;
`;
