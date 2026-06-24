import React, { ButtonHTMLAttributes, ReactNode } from "react";
// import { useFormStatus } from "react-dom";
import { RootButton } from "./styles";

import { Tooltip } from "@mui/material";

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  orientation?: "v" | "h";
  bg?: string;
  w?: "full" | "fit";
  h?: number;
  border?: boolean;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  justifycontent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  disabled?: boolean;
  isLoading?: boolean;
  tooltip?: string;
  borderRadius?: number;
  gaph?: number;
  p?:number;
}

export default function ButtonRoot({
  children,
  orientation = "v",
  w = "fit",
  h,
  justifycontent = "flex-start",
  bg,
  border = false,
  selected = false,
  onClick,
  disabled = false,
  isLoading = false,
  tooltip,
  borderRadius = 12,
  gaph = 16,
  p=12,
  ...rest
}: ButtonRootProps) {
  return (
    <Tooltip title={tooltip} placement="top">
      <RootButton
        width={w}
        orientation={orientation}
        justifycontent={justifycontent}
        bgcolor={bg}
        border={border ? "true" : "false"}
        selected={selected}
        onClick={onClick}
        disabled={disabled}
        borderRadius={borderRadius}
        gaph={gaph}
        height={h}
        padding={p}
        {...rest}
      >
        {isLoading ? "Carregando..." : children}
      </RootButton>
    </Tooltip>
  );
}
