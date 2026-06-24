"use client";

import { colorPicker } from "@/utils/colorPicker";
import Link from "next/link";
import styled from "styled-components";

export const RootButton = styled.button<{
  width: string;
  orientation: string;
  bgcolor?: string;
  border: string;
  selected: boolean;
  justifycontent: string;
  borderRadius: number;
  gaph: number;
  height?: number;
  padding?: number;
}>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
  justify-content: ${({ justifycontent }) => justifycontent};
  flex-direction: ${({ orientation }) => (orientation === "v" ? "column" : "row")};
  gap: ${({ orientation, gaph }) => (orientation === "v" ? "4px" : gaph + "px")};
  border: ${({ border, theme }) => (border === "true" ? `1px solid  ${theme.border.whiteDynamic[16]}` : "none")};
  padding: ${({ padding }) => padding}px;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  cursor: pointer;
  transition: 0.2s;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  height: ${({ height }) => (height ? height + "px" : "auto")};

  background-color: ${({ selected, bgcolor, theme }) => {
    if(selected) return theme.brand.primary[100];
    else{
      return bgcolor ? colorPicker(bgcolor) : "transparent";
    }
  }};
  
  h2 { 
    inline-size: max-content;
  }
  
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const RootLink = styled(Link)<{
  width: string;
  orientation: string;
  bgcolor?: string;
  border: string;
  selected: boolean;
  justifycontent: string;
  padding?: number;
}>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width === "full" ? "100%" : "fit-content")};
  justify-content: ${({ justifycontent }) => justifycontent};
  flex-direction: ${({ orientation }) => (orientation === "v" ? "column" : "row")};
  gap: ${({ orientation }) => (orientation === "v" ? "4px" : "16px")};
  border: ${({ border, theme }) => (border === "true" ? `1px solid  ${theme.border.whiteDynamic[16]}` : "none")};
  padding: ${({ padding }) => padding || 12}px;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  background-color: ${({ selected, bgcolor, theme }) => {
    if(selected) return theme.brand.primary[100];
    else{
      return bgcolor ? colorPicker(bgcolor) : "transparent";
    }
  }};

  &:hover {
    opacity: 0.8;
  }

  &[aria-disabled="true"] {
    background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[8]};
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const IconButton = styled.div<{ color?: string }>`
  display: flex;

  svg {
    color: ${({color}) => color ? 
      colorPicker(color) : 
      colorPicker("text.dynamic.whiteDynamic.100")
    };
  }
`;
