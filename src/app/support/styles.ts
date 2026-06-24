import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;

  @media (max-width: 1070px) {
    flex-direction: column;
  }
`;

export const BoxLeft = styled.div<{ isViewMobile: boolean }>`
  display: flex;
  flex: 1;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  height: 100%;
  flex-direction: column;
  overflow-y: scroll;

  @media (max-width: 1070px) {
    display: ${({ isViewMobile }) => (isViewMobile ? "none" : "flex")};
  }
`;

export const AddCode = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 20px 0px;
  cursor: pointer;
`;

export const ContainerGuides = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  padding: 16px 24px;
  overflow-y: auto;
`;

export const BoxRight = styled.div<{ isViewMobile: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;

  @media (max-width: 1070px) {
    display: ${({ isViewMobile }) => (isViewMobile ? "flex" : "none")};
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 18px 0px 40px;
  margin: 0px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
`;

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
