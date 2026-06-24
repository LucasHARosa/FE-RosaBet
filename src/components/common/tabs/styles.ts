import styled from "styled-components";

export const TabGroup = styled.div`
  margin-left: 20vh;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  transition: background 0.3s;
  color: white; /* Cor do texto */

  ${({ isActive }) =>
    isActive &&
    `
    border-bottom: 2px solid #0070f3;
    font-weight: bold;
  `}
`;
