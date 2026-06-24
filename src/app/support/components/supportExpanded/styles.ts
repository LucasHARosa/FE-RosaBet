import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const ContainerInfo = styled.div`
  flex: 1;
  display: flex;
  margin: 24px;
  padding: 20px;
  flex-direction: column;
  gap: 100px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Info = styled.div`
  flex: 1;
`;

export const FooterInfo = styled.div`
  display: flex;
  margin-top: 40px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
