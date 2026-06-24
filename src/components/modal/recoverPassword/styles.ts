import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;

  justify-content: space-between;
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContainerFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const ContainerIcon = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const ContainerCenter = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ContainerTimeOut = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 8px 0;
`;
