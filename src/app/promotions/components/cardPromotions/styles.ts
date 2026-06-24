import styled from "styled-components";

interface CardPromotionsProps {
  selected: boolean;
}

export const Container = styled.div<CardPromotionsProps>`
  display: flex;
  width: 100%;
  min-height: 103px;
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.brand.secondary[24] : theme.background.dynamic.whiteDynamic[4]};
  cursor: pointer;
`;

export const ContainerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 10px;
  width: 40px;
  height: 40px;
`;

export const ContainerInfo = styled.div`
  max-width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
