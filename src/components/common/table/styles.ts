"use client";

import { typography } from "@/assets/themes/typograph";
import styled from "styled-components";

export const TableBox = styled.table`
  width: 100%;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr<{ isClick: boolean }>`
  cursor: ${(props) => (props.isClick ? "pointer" : "default")};
  transition: 0.8s;

  &:hover {
    opacity: ${(props) => (props.isClick ? "0.6" : "1")};
  }

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
  }
`;

export const Th = styled.th`
  padding: 12px;
  text-align: left;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[64]};
  ${() => typography["label/body/s/regular"]}

  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

export const Td = styled.td`
  padding: 12px;
  color: ${({ theme }) => theme.text.dynamic.whiteDynamic[100]};
  ${() => typography["label/body/s/bold"]}

  @media (max-width: 768px) {
    padding: 12px 0;
  }
`;

export const Empty = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`;
