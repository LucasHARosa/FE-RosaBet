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
`;

export const Banner = styled.img`
  display: flex;
  width: 100%;
`;

export const ContainerInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

export const ContainerPromotion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
`;

export const Info = styled.div`
  height: 76px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 12px;
`;

export const ContainerDescription = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Footer = styled.div`
  padding: 24px;
  margin-bottom: 100px;
`;
