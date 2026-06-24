import { colorPicker } from "@/utils/colorPicker";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { 
    opacity: 0; 
  }
  to { 
    opacity: 1; 
  }
`;

const fadeOut = keyframes`
  from { 
    opacity: 1; 
  }
  to { 
    opacity: 0; 
  }
`;

const scaleIn = keyframes`
  from { 
    transform: scale(0); 
  }
  to { 
    transform: scale(1); 
  }
`;

const scaleOut = keyframes`
  from { 
    transform: scale(1); 
  }
  to { 
    transform: scale(0); 
  }
`;

export const ContainerModal = styled.div<{
  visible: boolean;
  minHeight?: number;
  minWidth?: string;
  bg?: string;
}>`
  display: flex;
  flex-direction: column;
  height: fit-content;
  min-height: ${({ minHeight }) => (minHeight ? `${minHeight}px` : "auto")};
  margin-block: auto;
  /* max-height: 90vh;
  overflow-y: scroll; */
  width: 100%;
  min-width: ${({ minWidth }) => (minWidth ? `${minWidth}` : "auto")};
  max-width: 470px;
  background:${({ theme, bg }) => bg ? colorPicker(bg): theme.misc.modal};
  animation: ${scaleIn} 0.3s;
  border: 1px solid ${({theme}) => theme.border.whiteDynamic[16]};
  border-radius: 24px;

  &.isLeaving {
    animation: ${(props) => (props.visible ? scaleOut : scaleIn)} 0.2s forwards;
  }

  @media (max-height: 600px) {
    max-height: 100%;
    overflow-y: scroll;
  }
`;

export const ModalBody = styled.div`
  padding: 16px 24px 24px;
  height: 100%;
`;

export const CancelButton = styled.button`
  display: flex;
  background: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  border: none;
  margin-right: 24px;
  width: 32px;
  height: 32px;
  border-radius: 16px;

  &:disabled {
    cursor: default;
  }
`;

export const OverlayModal = styled.div<{ visible: boolean }>`
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  position: fixed;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  place-items: center;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.3s;
  z-index: 9999;

  &.isLeaving {
    animation: ${(props) => (props.visible ? fadeOut : fadeIn)} 0.3s forwards;
  }
`;

export const HeaderModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid ${({theme}) => theme.border.whiteDynamic[8]};
`;

