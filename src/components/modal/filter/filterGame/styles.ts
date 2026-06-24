import styled from "styled-components";

export const ContainerModal = styled.div`
  height: 100%;
  // background:rgba(20, 20, 20, 0.9);
`;

export const HeaderModal = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  gap: 10px;
  width: 100%;
  cursor: pointer;
`;

export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  max-height: 450px;
  overflow-y: auto;
  margin-bottom: 10px;
`;

interface CardProps {
  selected?: boolean;
}
export const Card = styled.div`
  width: 100%;
  padding: 0 10px 8px 10px;
  border-bottom: 1px solid ${({theme}) => theme.border.whiteDynamic[8]};
`;

export const CardItem = styled.div<CardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  height: 48px;
  padding: 8px 8px 8px 10px;
  background-color: ${({selected, theme}) => (selected ? theme.brand.secondary[24] : "transparent")};
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({theme}) =>theme.brand.secondary[24]};
  }
`;

export const DataContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export const ContainerButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
`;

export const ButtonClear = styled.div`
  width: 30%;
`;

export const ContainerStatus = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  background-color: ${({ theme}) => theme.background.dynamic.whiteDynamic[4]};
  border-radius: 12px;
  padding: 4px;
`;

interface StatusProps {
  selected: boolean;
}

export const Status = styled.div<StatusProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 103px;
  height: 38px;
  padding: 4px;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${({selected, theme}) => selected ? theme.background.dynamic.whiteDynamic[4] : "transparent"};
  transition: background-color 0.3s ease;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;
