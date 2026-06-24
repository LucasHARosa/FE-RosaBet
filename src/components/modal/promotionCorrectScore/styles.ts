import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 416px;
  overflow-y: auto;
  padding: 0 16px;
  margin-bottom: 16px;
`;

export const ContainerError = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
