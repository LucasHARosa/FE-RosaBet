import styled from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  height: 40px;
  width: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
`;
