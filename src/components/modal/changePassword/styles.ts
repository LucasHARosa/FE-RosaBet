import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Line = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.border.whiteDynamic[16]};
  width: 100%;
  margin: 0 auto;
`;

export const GroupNewPassword = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
