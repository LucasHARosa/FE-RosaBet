import styled from "styled-components";

export const GroupInput = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectDrop = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  height: 40px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  width: max-content;
  border-radius: 16px;
  cursor: pointer;
  gap: 10px;
  
  &:disabled {
    opacity: 0.6;
  }
`;

export const Dropdown = styled.div<{ viewitem: boolean }>`
  display: ${({ viewitem }) => (viewitem ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 60px;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.misc.modal};
  border: 1px solid ${({ theme }) => theme.border.whiteDynamic[8]};
  border-radius: 16px;
  width: max-content;
  z-index: 2;
  max-height: 320px;
  overflow-y: auto;
`;

export const Item = styled.button`
  display: flex;
  align-items: center;
  padding: 17px 0;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  width: 100%;
  text-align: start;
  padding: 16px 24px;
  gap: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
  }
`;

export const SelectOption = styled.small`
  width: 100%;
  text-align: start;
  padding: 12px 24px 0;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[64]};
`;

export const Overlay = styled.div<{ viewitem: boolean }>`
  display: ${({ viewitem }) => (viewitem ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;
