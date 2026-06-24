import styled from "styled-components";

export const GroupFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: scroll;

  > a {
    width: fit-content;
    min-width: fit-content;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
`;



