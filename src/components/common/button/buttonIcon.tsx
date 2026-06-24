import React, { ElementType } from "react";
import { IconButton } from "./styles";

interface ButtonIconProps {
  icon: ElementType;
  color?: string;
  size: number;
  [key: string]: any;
}

export default function ButtonIcon({ icon: Icon, color, size, ...rest }: ButtonIconProps) {
  return (
    <IconButton color={color}>
      <Icon size={size} {...rest} />
    </IconButton>
  );
}
