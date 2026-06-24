"use client";
import React, { HTMLAttributes } from "react";
import { Container } from "./styles";
import { typography } from "@/assets/themes/typograph";

interface TextProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  htmlTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small" | "strong";
  color?: string;
  bg?: string;
  font?: keyof typeof typography;
}

const Text: React.FC<TextProps> = ({
  htmlTag = "h2",
  children,
  font,
  color,
  bg,
  ...rest
}: TextProps) => {
  const Comp = htmlTag;

  return (
    <Container color={color} hidden={rest.hidden} bg={bg} font={typography[font || "display/s/regular"]}>
      <Comp {...rest}>{children}</Comp>
    </Container>
  );
};

export default Text;
