import styled from "styled-components";

export const Box = styled.details`
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 6px;
  padding: 16px 12px;

  &[open] {
    #open {
      display: flex;
    }
    #close {
      display: none;
    }
  }

  &:not([open]) {
    #open {
      display: none;
    }
    #close {
      display: flex;
    }
  }
`;

export const GroupOdd = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  margin-top: 16px;
  align-items: center;
  gap: 12px 8px;
  min-height: 32px;

  #odd {
    min-width: 30%;
  }

  @media (max-width: 900px) {
    /* grid-template-columns: repeat(2, 1fr); */
    button {
      flex-direction: column;
      gap: 4px;
      padding: 6px 4px;

      div {
        &:first-child {
          justify-content: center;
          width: 100% !important;

          small {
            max-width: 100%;
          }
        }
      }
    }
  }
`;

export const Summary = styled.summary`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  cursor: pointer;
`;