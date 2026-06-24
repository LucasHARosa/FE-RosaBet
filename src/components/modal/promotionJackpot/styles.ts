import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 400px;
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
