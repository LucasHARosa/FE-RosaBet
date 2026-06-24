import React, { AnchorHTMLAttributes, ReactNode } from "react";
import { RootLink } from "./styles";
import { Tooltip } from "@mui/material";

interface ButtonRootProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  orientation?: "v" | "h";
  bg?: string;
  w?: "full" | "fit";
  border?: boolean;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  justifycontent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around";
  disabled?: boolean;
  p?: number;
  tooltip?: string;
}

export default function ButtonRoot({
  children,
  orientation = "v",
  w = "fit",
  p,
  justifycontent = "flex-start",
  bg,
  border = false,
  href,
  selected = false,
  onClick,
  disabled = false,
  tooltip,
  ...rest
}: ButtonRootProps) {
  return (
    <Tooltip title={tooltip} placement="top">
      <>
        <RootLink
          width={w}
          orientation={orientation}
          justifycontent={justifycontent}
          bgcolor={bg}
          border={border ? "true" : "false"}
          padding={p}
          selected={selected}
          href={href || ""}
          onClick={onClick}
          aria-disabled={disabled}
          {...rest}
        >
          {children}
        </RootLink>
      </>
    </Tooltip>
  );
}
