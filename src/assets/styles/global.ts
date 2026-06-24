import styled, { createGlobalStyle } from "styled-components";

export const GlobalContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  /* h1, h2, h3, h4, h5, h6 {
    font-family: 'Epilog', sans-serif;
  } */
  body {
    background-color: ${({ theme }) => theme.background.dynamic.blackDynamic["100"]};
    color: #fff;
  }
  /* body, input, textarea, select, button, p, span {
    font-family: 'Inter', sans-serif ;
  } */
  button {
    cursor: pointer;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  /* .Toastify__toast-body {
    font-family: 'Inter', sans-serif;
  } */
`;
