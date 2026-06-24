import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const Container = styled.div<{ isFull: boolean }>`
  display: flex;
  width: ${({ isFull }) => (isFull ? "100%" : "fit-content")};
  background-color: ${({theme}) => theme.background.dynamic.whiteDynamic[8]};
  position: relative;
  padding: ${({ isFull }) => (isFull ? "8px 12px;" : "8px 6px")};
  border-radius: 8px;
  gap: 8px;
  cursor: pointer;
`;

export const Search = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: ${({ isMobile }) => (isMobile ? "4px" : "4px 12px")};

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    color: ${({theme}) => theme.text.dynamic.whiteDynamic[100]};
    z-index: 999;
    ${() => typography["label/body/m/regular"]}
  }
`;

export const Overlay = styled.div<{ viewitem: boolean }>`
  display: ${({ viewitem }) => (viewitem ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9;
`;
