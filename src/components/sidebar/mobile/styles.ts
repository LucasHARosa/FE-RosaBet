import styled from "styled-components";

export const SideBarRoot = styled.div<{
  open: boolean;
}>`
  display: ${({ open }) => (open ? "flex" : "none")};
  width: ${({ open }) => (open ? "100%" : "0")};
  flex-direction: column;
  height: calc(100vh - 60px);
  overflow-y: scroll;
  gap: 16px;
  background-color: ${({ theme }) => theme.background.dynamic.blackDynamic[100]};
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  padding: 20px 12px 100px;
  border-right: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  position: absolute;
  z-index: 2000;

  &::-webkit-scrollbar {
    display: none;
  }

`;


export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 4px;
  gap: 4px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;


interface RouteProps {
  borderType?: string;
}

export const Route = styled.div<RouteProps>`
  display: flex;
  height: 48px;
  width: 100%;
  padding: 0px 14px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: ${({ borderType }) => borderType?.includes("1") ? '8' : '0'}px;
  border-top-right-radius: ${({ borderType }) => borderType?.includes("2") ? '8' : '0'}px;
  border-bottom-right-radius: ${({ borderType }) => borderType?.includes("3") ? '8' : '0'}px;
  border-bottom-left-radius: ${({ borderType }) => borderType?.includes("4") ? '8' : '0'}px;
  @media (max-width: 480px) {
    padding: 0px 8px;
  }
`;

export const Set = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  
  @media (max-width: 380px) {
    gap: 4px;
  }
`;


export const Details = styled.details`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  
`;

export const Summary = styled.summary`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const Submenu = styled.div`
  display: flex;
  gap: 16px;
  padding: 12px;
  cursor: pointer;
  transition: 0.6s;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  &:hover {
    opacity: 0.8;
  }
`;

export const GroupCountry = styled.div`
  display:flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

