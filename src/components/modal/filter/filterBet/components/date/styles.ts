import styled from "styled-components";

export const DateLabel = styled.button`
  display: flex;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 12px;
  padding: 16px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const GroupDate = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
`;
