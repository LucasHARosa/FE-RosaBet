import { typography } from "@/assets/themes/typograph";
import Link from "next/link";
import styled from "styled-components";

export const MoreGames = styled.div<{ view: boolean }>`
  display: ${({ view }) => (view ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  width: -webkit-fill-available;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  padding: 8px 12px 8px 12px;
  height: 90px;
  margin-top: -90px;
  position: relative;
  background: ${({ theme }) => {
    return `linear-gradient(0deg, ${theme.background.dynamic.blackDynamic[100]} 0%, ${theme.misc.blackDynamic[40]}, transparent 100%)`;
  }};
  z-index: 9;
`;

export const Redirect = styled(Link)`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.brand.primary[100]};
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  text-transform: uppercase;
  ${() => typography["label/body/s/regular"]}
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 12px 24px 12px 24px;
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
`;

export const GroupFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: scroll;

  > a {
    width: fit-content;
    min-width: fit-content;
  }

  &::-webkit-scrollbar {
    display: none !important;
  }
`;

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
