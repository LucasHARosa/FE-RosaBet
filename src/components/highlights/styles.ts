import styled from "styled-components";

export const BoxHighlight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;

  @media (min-width: 768px) {
    .alice-carousel__stage-item {
      min-width: 410px !important;
    }
  }
`;
