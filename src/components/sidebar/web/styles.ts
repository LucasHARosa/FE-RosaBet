import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const SideBarRoot = styled.div<{
  open: boolean;
  notView: boolean;
  isMobile: boolean;
}>`
  display: ${({ notView }) => (notView ? "none" : "flex")};
  width: ${({ open }) => (open ? "300px" : "84px")};
  flex-direction: column;
  height: calc(100vh - 80px);
  overflow-y: scroll;
  gap: 16px;
  background-color: ${({ theme }) => theme.background.dynamic.blackDynamic[100]};
  padding: 24px 12px;
  border-right: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  position: ${({ isMobile }) => (isMobile ? "absolute" : "relative")};

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? "flex" : "none")};
    width: ${({ open }) => (open ? "100%" : "0")};
    z-index: 999;
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  padding: 4px;
  border-radius: 12px;
`;


export const DefaultMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0px 4px;
`;

export const Details = styled.details`
  display: flex;
  flex-direction: column;
  gap: 8px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border-radius: 12px;
`;

export const Summary = styled.summary`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
  padding: 12px;
  cursor: pointer;
  justify-content: center;
`;

export const GroupCountry = styled.div<{ viewitem: boolean }>`
  display: ${({ viewitem }) => (viewitem ? "flex" : "none")};
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  width: 19px;
  height: 19px;

  ${() => typography["label/body/s/regular"]}
`;

export const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Submenu = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  cursor: pointer;
  transition: 0.6s;

  &:hover {
    opacity: 0.8;
  }
`;
