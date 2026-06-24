"use client";
import styled from "styled-components";

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  gap: 4px;
`;

export const Item = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.background.dynamic.whiteDynamic[4]};
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
