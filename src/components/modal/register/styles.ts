import styled from "styled-components";

export const Box = styled.form<{ gap: number }>`
  display: flex;
  flex-direction: column;

  gap: ${(props) => props.gap}px;
  height: 510px;

  .vi__container {
    margin: 0 auto;
  }
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TermsText = styled.div<{ margin?: boolean; center?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: ${({ margin }) => (margin ? "auto 0 16px" : "0")};
  justify-content: ${({ center }) => (center ? "center" : "flex-start")};
`;

export const BoxButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 8px;
  margin-top: auto;

  > button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;
