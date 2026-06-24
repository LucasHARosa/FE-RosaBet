import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Left = styled.div<{ isMobile: boolean }>`
  display: ${({ isMobile }) => (isMobile ? "none" : "flex")};
  flex: 1;
  height: calc(100vh - 80px);
  max-width: 430px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 24px;
  flex-direction: column;
  gap: 24px;
  border-right: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Right = styled.div`
  flex: 1;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const GroupCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Card = styled.button<{ $isactive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px;
  display: flex;
  color: ${({ $isactive, theme }) => ($isactive ? theme.brand.secondary[100] : theme.text.dynamic.whiteDynamic[100])};
  background-color: ${({theme})=>theme.background.dynamic.whiteDynamic[8]};
  border-radius: 12px;
  &:hover {
    opacity: 0.8;
  }  
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Tabs = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Tab = styled.li<{ isSelected: boolean }>`
  
  background-color: ${({ isSelected,theme }) => (isSelected ? theme.background.dynamic.whiteDynamic[8] : "transparent")};
  color: ${({ isSelected, theme }) => (isSelected ? theme.brand.secondary[100] : theme.text.dynamic.whiteDynamic[100])};
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "400")};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    opacity: 0.8;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 40px;
`;

export const InfoPerson = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ThemeGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Profile = styled.div`
  display: flex;
  /* align-items: center; */
  gap: 8px;
`;

export const Row = styled.div`
  display: flex;
  gap: 8px;
`;

export const Detail = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 12px 16px;
  border-radius: 12px;
  width: 100%;

  small {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 160px;
  }
`;

export const BadgePhoto = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 50%;
  padding: 6px;
  min-width: 42px;
  width: 42px;
  height: 42px;
`;

export const Pix = styled.span`
  display: inline;
  color: ${({ theme }) => theme.brand.secondary[100]};
  margin-left: 4px;
`;

export const GroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
