"use client";
import { typography } from "@/assets/themes/typograph";
import { typeCard } from "@/interfaces/casino";
import styled from "styled-components";

export const Card = styled.div<{ image: string; type: typeCard }>`
  display: flex;
  flex-direction: column;
  background: linear-gradient(transparent, ${({ theme }) => theme.background.dynamic.blackDynamic[100]}), url("${({ image }) => image}");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 9px;
  justify-content: end;
  padding: 18px;
  cursor: pointer;
  transition: 0.2s;
  margin: 0 4px;

  ${() => typography["label/body/s/bold"]}

  &:hover {
    transform: scale(1.06);
  }

  ${({ type }) =>
    type === "p" &&
    `
    height: 192px;
  `}

  ${({ type }) =>
    type === "m" &&
    `
    height: 130px;
  `}

  ${({ type }) =>
    type === "g" &&
    `
    height: 260px;
  `}
`;
